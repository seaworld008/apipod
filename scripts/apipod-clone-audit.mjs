#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer-core";

function parseArgs(argv) {
  const args = {
    limit: 0,
    out: "",
    pagesJson: "",
    chromePath: "",
    port: 3100,
    mode: "start", // start|dev
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") args.limit = Number(argv[++i] ?? "0");
    else if (a === "--out") args.out = argv[++i] ?? "";
    else if (a === "--pages") args.pagesJson = argv[++i] ?? "";
    else if (a === "--chrome") args.chromePath = argv[++i] ?? "";
    else if (a === "--port") args.port = Number(argv[++i] ?? "3100");
    else if (a === "--mode") args.mode = argv[++i] ?? "start";
    else if (a === "--help") args.help = true;
  }
  return args;
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function normalizeText(s) {
  return String(s ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyPath(p) {
  const norm = p.replace(/\/+$/, "") || "/";
  if (norm === "/") return "home";
  return norm
    .replace(/^\//, "")
    .replace(/\//g, "__")
    .replace(/[^a-zA-Z0-9_.-]/g, "_");
}

function guessChromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      fs.accessSync(p, fs.constants.X_OK);
      return p;
    } catch {
      // ignore
    }
  }
  return "";
}

async function waitForStableDom(page, timeoutMs = 12000) {
  const startedAt = Date.now();
  let stable = 0;
  let last = null;
  while (Date.now() - startedAt < timeoutMs) {
    // Next.js / RSC 在 networkidle2 之后仍可能继续渲染；这里通过交互节点数量与文本长度稳定性做兜底。
    const cur = await page.evaluate(() => {
      const selector =
        "a,button,input[type=button],input[type=submit],[role=button],[role=link]";
      return {
        ready: document.readyState,
        hasH1: !!document.querySelector("h1"),
        interactions: document.querySelectorAll(selector).length,
        textLen: (document.body?.innerText || "").length,
      };
    });

    const same =
      last &&
      cur.interactions === last.interactions &&
      cur.textLen === last.textLen;

    if (cur.ready === "complete" && cur.hasH1 && same) stable += 1;
    else stable = 0;

    last = cur;
    if (stable >= 2) return;
    await new Promise((r) => setTimeout(r, 250));
  }
}

async function waitForHttpOk(url, timeoutMs) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status >= 200 && res.status < 500) return res.status;
    } catch {
      // ignore
    }
    if (Date.now() - start > timeoutMs) throw new Error(`Timeout waiting for ${url}`);
    await new Promise((r) => setTimeout(r, 250));
  }
}

async function runNextBuild({ nextCli, cwd }) {
  return await new Promise((resolve, reject) => {
    const p = spawn(process.execPath, [nextCli, "build"], {
      stdio: "inherit",
      cwd,
      env: { ...process.env, NODE_ENV: "production" },
    });
    p.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`next build failed with code ${code}`));
    });
    p.on("error", reject);
  });
}

const args = parseArgs(process.argv);
if (args.help) {
  console.log(
    [
      "Usage: node scripts/apipod-clone-audit.mjs [--limit N] [--out DIR] [--pages FILE] [--chrome PATH] [--port 3100] [--mode start|dev]",
      "",
      "Notes:",
      "- 启动本地 Next.js（start/dev），批量访问 sitemap 路由并输出截图 + 交互元素元数据。",
      "- 本地页面文本也只保存长度/哈希，便于做结构对齐对比。",
    ].join("\n"),
  );
  process.exit(0);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..", "..");
const projectDir = path.resolve(repoRoot, "code", "apipod-clone");

const pagesJson = args.pagesJson
  ? path.resolve(args.pagesJson)
  : path.resolve(repoRoot, "reference", "apipod.ai", "pages.json");

const outBase =
  args.out?.trim() ||
  path.resolve(
    repoRoot,
    "reference",
    "apipod.ai",
    "clone-audit",
    new Date().toISOString().replace(/[:.]/g, "-"),
  );

const chromePath = args.chromePath || guessChromePath();
if (!chromePath) {
  console.error(
    "无法找到 Chrome 可执行文件。请通过 --chrome 或 CHROME_PATH 指定，例如：\n" +
      '  node scripts/apipod-clone-audit.mjs --chrome "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"',
  );
  process.exit(1);
}

const pages = JSON.parse(await fsp.readFile(pagesJson, "utf8"));
const host = "https://www.apipod.ai";
const paths = (Array.isArray(pages.urls) ? pages.urls : []).map((u) => u.replace(host, "") || "/");
const targetPaths = args.limit && args.limit > 0 ? paths.slice(0, args.limit) : paths;

await fsp.mkdir(path.join(outBase, "screenshots"), { recursive: true });
await fsp.mkdir(path.join(outBase, "pages"), { recursive: true });

const baseUrl = `http://127.0.0.1:${args.port}`;

let serverProc = null;
try {
  const nextCli = path.join(projectDir, "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextCli)) {
    console.error(`未找到 next CLI：${nextCli}\n请先在 ${projectDir} 执行 pnpm i`);
    process.exit(1);
  }

  const nextMode = args.mode === "dev" ? "dev" : "start";
  if (nextMode === "start") {
    await runNextBuild({ nextCli, cwd: projectDir });
  }
  serverProc = spawn(process.execPath, [nextCli, nextMode, "-p", String(args.port)], {
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: args.mode === "dev" ? "development" : "production" },
    cwd: projectDir,
  });
  serverProc.stdout.on("data", (d) => process.stdout.write(String(d)));
  serverProc.stderr.on("data", (d) => process.stderr.write(String(d)));

  await waitForHttpOk(`${baseUrl}/`, 120000);

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const report = {
    generatedAt: new Date().toISOString(),
    chromePath,
    pagesJson,
    outBase,
    baseUrl,
    port: args.port,
    count: targetPaths.length,
    results: [],
  };

  try {
    for (const p of targetPaths) {
      const id = slugifyPath(p);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

      const url = `${baseUrl}${p.startsWith("/") ? p : `/${p}`}`;
      const startedAt = Date.now();
      let status = 0;
      let title = "";
      let lang = "";
      let finalUrl = url;

      try {
        const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        status = res?.status?.() ?? 0;
        finalUrl = page.url();
        title = await page.title();
        lang = await page.evaluate(() => document.documentElement.lang || "");
        await waitForStableDom(page);

        const interactions = await page.evaluate(() => {
          const nodes = [];
          const pick = (el) => {
            const tag = el.tagName?.toLowerCase?.() || "";
            const role = el.getAttribute?.("role") || "";
            const href = el instanceof HTMLAnchorElement ? el.href : "";
            const aria = el.getAttribute?.("aria-label") || "";
            const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
            nodes.push({ tag, role, href, text: txt, ariaLabel: aria, disabled: !!el.disabled });
          };
          document
            .querySelectorAll(
              "a,button,input[type=button],input[type=submit],[role=button],[role=link]",
            )
            .forEach(pick);
          return nodes;
        });

        const sanitizedInteractions = interactions.map((x) => {
          const text = normalizeText(x.text);
          const aria = normalizeText(x.ariaLabel);
          return {
            tag: x.tag,
            role: x.role,
            href: x.href,
            disabled: !!x.disabled,
            textLen: text.length,
            textHash: text ? sha256(text) : "",
            ariaLabelLen: aria.length,
            ariaLabelHash: aria ? sha256(aria) : "",
          };
        });

        const screenshotPath = path.join(outBase, "screenshots", `${id}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const pageJson = {
          path: p,
          url,
          finalUrl,
          status,
          title,
          titleLen: title.length,
          titleHash: title ? sha256(normalizeText(title)) : "",
          lang,
          loadedAt: new Date().toISOString(),
          durationMs: Date.now() - startedAt,
          interactions: sanitizedInteractions,
        };
        await fsp.writeFile(
          path.join(outBase, "pages", `${id}.json`),
          JSON.stringify(pageJson, null, 2) + "\n",
        );

        report.results.push({
          id,
          path: p,
          url,
          finalUrl,
          status,
          titleLen: pageJson.titleLen,
          titleHash: pageJson.titleHash,
          lang,
          durationMs: pageJson.durationMs,
          screenshot: path.relative(outBase, screenshotPath),
          interactions: sanitizedInteractions.length,
        });
      } catch (e) {
        report.results.push({
          id,
          path: p,
          url,
          finalUrl,
          status,
          titleLen: 0,
          titleHash: "",
          lang,
          durationMs: Date.now() - startedAt,
          error: String(e?.message ?? e),
          interactions: 0,
        });
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  await fsp.writeFile(path.join(outBase, "report.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(`OK: wrote ${report.results.length} pages to ${outBase}`);
} finally {
  if (serverProc) {
    serverProc.kill("SIGTERM");
  }
}
