import type { Locale } from "@/lib/i18n";

export type DocEntry = {
  slug: string[];
  title: string;
  body: string;
};

const enDocs: DocEntry[] = [
  {
    slug: [],
    title: "Overview",
    body: "This is a mock docs landing page. Replace this content with your real documentation source (MDX/CMS/API).",
  },
  {
    slug: ["getting-started"],
    title: "Getting Started",
    body: "Mock quick start guide.",
  },
  {
    slug: ["features", "models"],
    title: "Multi-Modal Aggregation",
    body: "Mock: model aggregation feature page.",
  },
  {
    slug: ["features", "reliability"],
    title: "Enterprise-Grade SLA",
    body: "Mock: reliability and fallback mechanisms.",
  },
  {
    slug: ["features", "routing"],
    title: "Intelligent Cost Control",
    body: "Mock: routing strategies and cost control.",
  },
  {
    slug: ["features", "architecture"],
    title: "Cloud Native Architecture",
    body: "Mock: architecture overview.",
  },
  {
    slug: ["features", "analytics"],
    title: "Full-Link Observability",
    body: "Mock: analytics and observability overview.",
  },
  {
    slug: ["api-reference"],
    title: "API Reference",
    body: "Mock API reference index. Use the left sidebar to navigate to an endpoint page.",
  },
  { slug: ["faq"], title: "FAQ", body: "Mock FAQ page." },
  {
    slug: ["api-reference", "llm", "openai"],
    title: "LLM / OpenAI Compatible",
    body: "Mock endpoint description for OpenAI-compatible LLM APIs.",
  },
  {
    slug: ["api-reference", "seedream", "seedream-v4.5"],
    title: "Seedream V4.5",
    body: "Mock endpoint description for Seedream V4.5 generation.",
  },
  {
    slug: ["api-reference", "seedream", "seedream-v4.5-edit"],
    title: "Seedream V4.5 Edit",
    body: "Mock endpoint description for Seedream V4.5 edit.",
  },
  {
    slug: ["api-reference", "nano-banana", "nano-banana"],
    title: "Nano Banana",
    body: "Mock endpoint description for Nano Banana generation.",
  },
  {
    slug: ["api-reference", "nano-banana", "nano-banana-pro"],
    title: "Nano Banana Pro",
    body: "Mock endpoint description for Nano Banana Pro generation/edit.",
  },
];

const zhDocs: DocEntry[] = [
  { slug: [], title: "概览", body: "这是文档首页（Mock）。后续可替换为真实文档来源（MDX/CMS/API）。" },
  { slug: ["getting-started"], title: "快速开始", body: "快速接入指引（Mock）。" },
  { slug: ["features", "models"], title: "多模态聚合", body: "模型聚合能力说明（Mock）。" },
  { slug: ["features", "reliability"], title: "企业级 SLA", body: "可靠性与降级机制（Mock）。" },
  { slug: ["features", "routing"], title: "智能成本控制", body: "路由策略与成本控制（Mock）。" },
  { slug: ["features", "architecture"], title: "云原生架构", body: "架构概览（Mock）。" },
  { slug: ["features", "analytics"], title: "全链路可观测性", body: "分析与可观测性概览（Mock）。" },
  { slug: ["api-reference"], title: "API 参考", body: "API 参考索引页（Mock）。" },
  { slug: ["faq"], title: "常见问题", body: "FAQ 页面（Mock）。" },
  {
    slug: ["api-reference", "llm", "openai"],
    title: "LLM / OpenAI 兼容接口",
    body: "OpenAI 风格 LLM 接口说明（Mock）。",
  },
  {
    slug: ["api-reference", "seedream", "seedream-v4.5"],
    title: "Seedream V4.5",
    body: "Seedream V4.5 生成接口说明（Mock）。",
  },
  {
    slug: ["api-reference", "seedream", "seedream-v4.5-edit"],
    title: "Seedream V4.5 编辑",
    body: "Seedream V4.5 编辑接口说明（Mock）。",
  },
  {
    slug: ["api-reference", "nano-banana", "nano-banana"],
    title: "Nano Banana",
    body: "Nano Banana 接口说明（Mock）。",
  },
  {
    slug: ["api-reference", "nano-banana", "nano-banana-pro"],
    title: "Nano Banana Pro",
    body: "Nano Banana Pro 接口说明（Mock）。",
  },
];

function key(slug: string[]) {
  return slug.join("/");
}

const byLocale = {
  en: new Map(enDocs.map((d) => [key(d.slug), d])),
  "zh-CN": new Map(zhDocs.map((d) => [key(d.slug), d])),
} as const;

export async function getDoc(locale: Locale, slug: string[]) {
  const doc = byLocale[locale].get(key(slug));
  return doc ?? null;
}

export async function getDocsNav(locale: Locale) {
  const base = locale === "zh-CN" ? "/zh-CN/docs" : "/docs";
  const overviewHref = locale === "en" ? "/en/docs" : `${base}`;
  return [
    { title: locale === "zh-CN" ? "概览" : "Overview", href: overviewHref },
    { title: locale === "zh-CN" ? "快速开始" : "Getting Started", href: `${base}/getting-started` },
    {
      title: locale === "zh-CN" ? "Features" : "Features",
      href: `${base}/features/models`,
      children: [
        { title: locale === "zh-CN" ? "多模态聚合" : "Models", href: `${base}/features/models` },
        { title: locale === "zh-CN" ? "可靠性" : "Reliability", href: `${base}/features/reliability` },
        { title: locale === "zh-CN" ? "路由" : "Routing", href: `${base}/features/routing` },
        { title: locale === "zh-CN" ? "架构" : "Architecture", href: `${base}/features/architecture` },
        { title: locale === "zh-CN" ? "分析" : "Analytics", href: `${base}/features/analytics` },
      ],
    },
    {
      title: locale === "zh-CN" ? "API 参考" : "API Reference",
      href: `${base}/api-reference`,
      children: [
        { title: "LLM / OpenAI", href: `${base}/api-reference/llm/openai` },
        {
          title: "Seedream V4.5",
          href: `${base}/api-reference/seedream/seedream-v4.5`,
        },
        {
          title: "Seedream V4.5 Edit",
          href: `${base}/api-reference/seedream/seedream-v4.5-edit`,
        },
        {
          title: "Nano Banana",
          href: `${base}/api-reference/nano-banana/nano-banana`,
        },
        {
          title: "Nano Banana Pro",
          href: `${base}/api-reference/nano-banana/nano-banana-pro`,
        },
      ],
    },
    { title: locale === "zh-CN" ? "常见问题" : "FAQ", href: `${base}/faq` },
  ];
}
