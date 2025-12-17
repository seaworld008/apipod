#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

function parseArgs(argv) {
  const args = { limit: 0, out: "", pagesJson: "", chromePath: "" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") args.limit = Number(argv[++i] ?? "0");
    else if (a === "--out") args.out = argv[++i] ?? "";
    else if (a === "--pages") args.pagesJson = argv[++i] ?? "";
    else if (a === "--chrome") args.chromePath = argv[++i] ?? "";
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

function slugifyUrl(u) {
  const url = new URL(u);
  const p = url.pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  return p
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

const args = parseArgs(process.argv);
if (args.help) {
  console.log(
    [
      "Usage: node scripts/apipod-site-audit.mjs [--limit N] [--out DIR] [--pages FILE] [--chrome PATH]",
      "",
      "Notes:",
      "- 该脚本用于“对照采集”：保存截图、结构化交互信息（不保存原文案），便于做 UI/路由/交互复刻。",
      "- 不会保存原站 HTML/图片原文件或正文文案；仅保存截图 + 文本哈希/长度等元数据。",
    ].join("\n"),
  );
  process.exit(0);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..", "..");
const pagesJson = args.pagesJson
  ? path.resolve(args.pagesJson)
  : path.resolve(repoRoot, "reference", "apipod.ai", "pages.json");

const outBase =
  args.out?.trim() ||
  path.resolve(
    repoRoot,
    "reference",
    "apipod.ai",
    "audit",
    new Date().toISOString().replace(/[:.]/g, "-"),
  );

const chromePath = args.chromePath || guessChromePath();
if (!chromePath) {
  console.error(
    "无法找到 Chrome 可执行文件。请通过 --chrome 或 CHROME_PATH 指定，例如：\n" +
      "  node scripts/apipod-site-audit.mjs --chrome \"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome\"",
  );
  process.exit(1);
}

const pages = JSON.parse(await fsp.readFile(pagesJson, "utf8"));
const urls = Array.isArray(pages.urls) ? pages.urls : [];
const targetUrls = args.limit && args.limit > 0 ? urls.slice(0, args.limit) : urls;

await fsp.mkdir(path.join(outBase, "screenshots"), { recursive: true });
await fsp.mkdir(path.join(outBase, "pages"), { recursive: true });

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
  count: targetUrls.length,
  results: [],
};

try {
  for (const url of targetUrls) {
    const id = slugifyUrl(url);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

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
          const txt = (el.textContent || "").replace(/\\s+/g, " ").trim();
          nodes.push({
            tag,
            role,
            href,
            text: txt,
            ariaLabel: aria,
            disabled: !!el.disabled,
          });
        };

        document.querySelectorAll("a,button,input[type=button],input[type=submit],[role=button],[role=link]").forEach(pick);
        return nodes;
      });

      const sanitizedInteractions = interactions.map((x) => {
        const text = String(x.text ?? "");
        const aria = String(x.ariaLabel ?? "");
        const normText = text.replace(/\\s+/g, " ").trim();
        const normAria = aria.replace(/\\s+/g, " ").trim();
        return {
          tag: x.tag,
          role: x.role,
          href: x.href,
          disabled: !!x.disabled,
          textLen: normText.length,
          textHash: normText ? sha256(normText) : "",
          ariaLabelLen: normAria.length,
          ariaLabelHash: normAria ? sha256(normAria) : "",
        };
      });

      const screenshotPath = path.join(outBase, "screenshots", `${id}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const pageJson = {
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
