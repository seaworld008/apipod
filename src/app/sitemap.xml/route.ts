import type { NextRequest } from "next/server";

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const now = new Date().toISOString();

  const routes = new Set<string>([
    "/",
    "/models",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/changelog",
    "/docs",
    "/docs/api-reference",
    "/docs/api",
    "/docs/faq",
    "/docs/getting-started",
    "/docs/features/models",
    "/docs/features/reliability",
    "/docs/features/routing",
    "/docs/features/architecture",
    "/docs/features/analytics",
    "/en/docs",
    "/zh-CN",
    "/zh-CN/models",
    "/zh-CN/pricing",
    "/zh-CN/about",
    "/zh-CN/contact",
    "/zh-CN/privacy",
    "/zh-CN/terms",
    "/zh-CN/changelog",
    "/zh-CN/docs",
    "/zh-CN/docs/api-reference",
    "/zh-CN/docs/api",
    "/zh-CN/docs/faq",
    "/zh-CN/docs/getting-started",
    "/zh-CN/docs/features/models",
    "/zh-CN/docs/features/reliability",
    "/zh-CN/docs/features/routing",
    "/zh-CN/docs/features/architecture",
    "/zh-CN/docs/features/analytics",
  ]);

  // minimal model routes (mock list)
  const modelSeries = [
    "nano-banana",
    "veo3-1",
    "seedream-v4.5",
    "sora-2",
    "claude-opus-4-5",
    "gpt-5.2-codex",
    "gpt-5.2",
    "gpt-5.1",
    "gemini-3",
    "gpt-5",
    "gpt-4o",
  ];
  const modelVariants = [
    ["nano-banana", "nano-banana-pro"],
    ["veo3-1", "veo3-1-fast-ref"],
    ["veo3-1", "veo3-1-quality"],
    ["veo3-1", "veo3-1-fast"],
    ["seedream-v4.5", "seedream-v4.5"],
    ["seedream-v4.5", "seedream-v4.5-edit"],
    ["sora-2", "sora-2"],
  ];

  for (const s of modelSeries) {
    routes.add(`/models/${s}`);
    routes.add(`/zh-CN/models/${s}`);
  }
  for (const [s, v] of modelVariants) {
    routes.add(`/models/${s}/${v}`);
    routes.add(`/zh-CN/models/${s}/${v}`);
  }

  const items = [...routes].sort().map((p) => {
    const loc = `${origin}${p}`;
    return [
      "  <url>",
      `    <loc>${xmlEscape(loc)}</loc>`,
      `    <lastmod>${xmlEscape(now)}</lastmod>`,
      "  </url>",
    ].join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...items,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

