import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { CodeTabs } from "@/features/docs/code-tabs";
import { ApiReferenceMock } from "@/features/docs/api-reference-mock";
import { getDoc } from "@/mock/docs";

export async function DocPage({ locale, slug }: { locale: Locale; slug: string[] }) {
  const doc = await getDoc(locale, slug);
  const base = locale === "zh-CN" ? "/zh-CN" : "";
  const docsBase = `${base}/docs`;

  if (slug[0] === "api-reference") {
    return <ApiReferenceMock locale={locale} slug={slug} />;
  }

  if (slug[0] === "faq") {
    const isZh = locale === "zh-CN";
    const items = [
      {
        q: isZh ? "如何开始使用？（Mock）" : "How do I get started? (Mock)",
        a: isZh
          ? "此仓库默认不包含原站正文；用于对齐布局与交互。"
          : "This repo does not ship original content; it aligns layout and interactions.",
      },
      {
        q: isZh ? "如何获取 API Key？（Mock）" : "How do I get an API key? (Mock)",
        a: isZh
          ? "后续可对接 Console 与鉴权系统；当前使用 mock。"
          : "Wire Console/auth later; current pages use mock data.",
      },
    ];
    return (
      <article className="max-w-none">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h1>{isZh ? "常见问题" : "FAQ"}</h1>
          <p>{isZh ? "FAQ 页面（Mock）。" : "Mock FAQ page."}</p>
        </div>
        <div className="mt-8 divide-y divide-black/10 rounded-2xl border border-black/10 dark:divide-white/10 dark:border-white/10">
          {items.map((x) => (
            <div key={x.q} className="p-4">
              <button type="button" className="w-full text-left font-medium">
                {x.q}
              </button>
              <div className="mt-2 text-sm text-foreground/70">{x.a}</div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (slug.length === 0) {
    return (
      <article className="max-w-none">
        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <h1>{locale === "zh-CN" ? "概览" : "Overview"}</h1>
            <p>
              {locale === "zh-CN"
                ? "此页面用于对齐文档站的布局与交互（Mock），不包含原站正文内容。"
                : "This page aligns docs layout and interactions (Mock). It does not ship original docs content."}
            </p>

            <h2 id="welcome">{locale === "zh-CN" ? "欢迎" : "Welcome to APIPod"}</h2>
            <p>
              {locale === "zh-CN"
                ? "Mock：这里展示概览文案区块，用于复刻页面结构与排版。"
                : "Mock: overview copy blocks used for layout parity."}
            </p>

            <h2 id="why">{locale === "zh-CN" ? "为什么选择" : "Why Choose APIPod?"}</h2>
            <p>
              {locale === "zh-CN"
                ? "Mock：卡片区用于对齐信息层级、栅格与交互密度。"
                : "Mock: cards align the information hierarchy and interaction density."}
            </p>

            <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  href: `${docsBase}/features/models`,
                  title: locale === "zh-CN" ? "多模态聚合" : "Multi-Modal Aggregation",
                  desc: locale === "zh-CN" ? "模型聚合与调度能力（Mock）。" : "Models aggregation & scheduling (Mock).",
                },
                {
                  href: `${docsBase}/getting-started`,
                  title: locale === "zh-CN" ? "工业标准 API" : "Industrial Standard API",
                  desc: locale === "zh-CN" ? "兼容性与快速接入（Mock）。" : "Compatibility & quick start (Mock).",
                },
                {
                  href: `${docsBase}/features/reliability`,
                  title: locale === "zh-CN" ? "企业级 SLA" : "Enterprise-Grade SLA",
                  desc: locale === "zh-CN" ? "可靠性与降级（Mock）。" : "Reliability & fallback (Mock).",
                },
                {
                  href: `${docsBase}/features/routing`,
                  title: locale === "zh-CN" ? "智能成本控制" : "Intelligent Cost Control",
                  desc: locale === "zh-CN" ? "路由策略与成本优化（Mock）。" : "Routing strategies (Mock).",
                },
                {
                  href: `${docsBase}/features/architecture`,
                  title: locale === "zh-CN" ? "云原生架构" : "Cloud Native Architecture",
                  desc: locale === "zh-CN" ? "弹性与可扩展（Mock）。" : "Elastic and scalable (Mock).",
                },
                {
                  href: `${docsBase}/features/analytics`,
                  title: locale === "zh-CN" ? "全链路可观测性" : "Full-Link Observability",
                  desc: locale === "zh-CN" ? "分析与可观测性（Mock）。" : "Analytics & observability (Mock).",
                },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="font-medium text-foreground">{c.title}</div>
                  <div className="mt-2 text-sm text-foreground/70">{c.desc}</div>
                </Link>
              ))}
            </div>

            <h2 id="quick">{locale === "zh-CN" ? "3 分钟快速接入" : "3-Minute Quick Integration"}</h2>
            <p>
              {locale === "zh-CN"
                ? "Mock：步骤列表与代码块用于对齐交互（Tab、复制按钮）。"
                : "Mock: steps and code blocks align key interactions (tabs, copy button)."}
            </p>
            <ol>
              <li>
                {locale === "zh-CN" ? "前往" : "Go to"}{" "}
                <Link href={`${base}/console`}>APIPod Console</Link>{" "}
                {locale === "zh-CN" ? "注册并生成 API Key；可在" : "to sign up and generate an API key; manage it in"}{" "}
                <Link href={`${base}/console/api-keys`}>Key Management</Link>.
              </li>
              <li>
                {locale === "zh-CN"
                  ? "根据模型类型选择合适的 SDK / HTTP 调用方式（Mock）。"
                  : "Pick SDK/HTTP calling style based on your use case (Mock)."}
              </li>
            </ol>

            <div className="not-prose mt-6 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="font-medium">{locale === "zh-CN" ? "多模态模型使用" : "Multi-Modal Model Usage"}</div>
              <div className="mt-2 text-foreground/70">
                {locale === "zh-CN"
                  ? "当参数更复杂时，请参考 API Reference（Mock）。"
                  : "For more complex parameters, consult the API Reference (Mock)."}
              </div>
              <div className="mt-3">
                <Link
                  href={`${docsBase}/api-reference`}
                  className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  {locale === "zh-CN" ? "API Reference" : "API Reference"}
                </Link>
              </div>
            </div>

            <div className="not-prose mt-6">
              <CodeTabs locale={locale} />
            </div>

            <h2 id="faq">FAQ</h2>
            <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
              <Link
                href={`${base}/pricing`}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">
                  {locale === "zh-CN" ? "查看定价" : "View Pricing"}
                </div>
                <div className="mt-2 text-sm text-foreground/70">
                  {locale === "zh-CN" ? "套餐与对比（Mock）。" : "Plans & compare (Mock)."}
                </div>
              </Link>
              <Link
                href={`${docsBase}/api-reference`}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">
                  {locale === "zh-CN" ? "阅读 API 参考" : "Read API Reference"}
                </div>
                <div className="mt-2 text-sm text-foreground/70">
                  {locale === "zh-CN" ? "接口形态与示例（Mock）。" : "Endpoint shapes & examples (Mock)."}
                </div>
              </Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="font-medium">{locale === "zh-CN" ? "本页目录" : "On this page"}</div>
              <div className="mt-3 flex flex-col gap-2 text-foreground/70">
                <a href="#welcome" className="hover:text-foreground">
                  {locale === "zh-CN" ? "欢迎" : "Welcome to APIPod"}
                </a>
                <a href="#why" className="hover:text-foreground">
                  {locale === "zh-CN" ? "为什么选择" : "Why Choose APIPod?"}
                </a>
                <a href="#quick" className="hover:text-foreground">
                  {locale === "zh-CN" ? "3 分钟快速接入" : "3-Minute Quick Integration"}
                </a>
                <a href="#faq" className="hover:text-foreground">
                  FAQ
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
    );
  }

  if (!doc) {
    const path = slug.length ? slug.join("/") : "(index)";
    return (
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <h1>{locale === "zh-CN" ? "文档页面（Mock）" : "Docs Page (Mock)"}</h1>
        <p>
          {locale === "zh-CN"
            ? "该路由存在于原站文档系统中，但当前仓库未内置对应正文。"
            : "This route exists in the docs system, but this repo does not ship the original content."}
        </p>
        <p>
          <strong>slug：</strong> {path}
        </p>
        <p>
          <strong>提示：</strong>
          {locale === "zh-CN"
            ? "如需与原站内容一致，请在获得授权后接入真实文档来源（MDX/CMS/API）。"
            : "To match the original content, wire a real docs source (MDX/CMS/API) with proper authorization."}
        </p>
      </article>
    );
  }

  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>{doc.title}</h1>
      <p>{doc.body}</p>
      <p>
        <strong>提示：</strong>此仓库默认不包含原站文档正文；需要对齐真实内容时，请在获得授权后接入实际文档来源。
      </p>
    </article>
  );
}
