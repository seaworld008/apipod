import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/copy-button";
import { CodeTabs } from "@/features/docs/code-tabs";
import type { Locale } from "@/lib/i18n";
import { HandlingCodeTabs } from "@/features/docs/handling-code-tabs";

function titleFromSlug(slug: string[]) {
  const last = slug[slug.length - 1] || "api";
  return last.replaceAll("-", " ").replaceAll(".", " ").toUpperCase();
}

function SectionAnchor({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <a
      id={id}
      href={`#${id}`}
      className="inline-flex items-center gap-2 text-xl font-semibold text-foreground no-underline hover:underline"
    >
      {children}
    </a>
  );
}

function ApiToc({
  locale,
  items,
}: {
  locale: Locale;
  items: { href: string; label: string }[];
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
        <div className="font-medium">{locale === "zh-CN" ? "本页目录" : "On this page"}</div>
        <div className="mt-3 flex flex-col gap-2 text-foreground/70">
          {items.map((x) => (
            <a key={x.href} href={x.href} className="hover:text-foreground">
              {x.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function InterfaceDefinition({
  locale,
  method,
  host,
  path,
}: {
  locale: Locale;
  method: string;
  host: string;
  path: string;
}) {
  const isZh = locale === "zh-CN";
  const url = `${host}${path}`;
  return (
    <div className="not-prose mt-4 rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-md bg-black/5 px-2 py-1 text-xs font-medium dark:bg-white/10">
            {method}
          </span>
          <span className="text-foreground/70">{host}</span>
          <span className="font-mono text-foreground">{path}</span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton value={url} label={isZh ? "复制 URL" : "Copy URL"} />
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-md border border-black/10 bg-transparent px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {isZh ? "试一试" : "Try it"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ApiReferenceIndex({ locale }: { locale: Locale }) {
  const isZh = locale === "zh-CN";
  const base = locale === "zh-CN" ? "/zh-CN/docs" : "/docs";
  const toc = [
    { href: "#base-url", label: isZh ? "Base URL" : "Base URL" },
    { href: "#authentication", label: isZh ? "鉴权" : "Authentication" },
    { href: "#quick-start", label: isZh ? "Quick Start" : "Quick Start" },
    { href: "#available-apis", label: isZh ? "可用 API" : "Available APIs" },
    { href: "#common-response-format", label: isZh ? "响应格式" : "Common Response Format" },
    { href: "#error-handling", label: isZh ? "错误处理" : "Error Handling" },
    { href: "#handling-errors-in-code", label: isZh ? "代码中处理错误" : "Handling Errors in Code" },
    { href: "#streaming", label: isZh ? "Streaming" : "Streaming" },
    { href: "#sdk-support", label: isZh ? "SDK 支持" : "SDK Support" },
    { href: "#next-steps", label: isZh ? "下一步" : "Next Steps" },
  ];

  return (
    <article className="max-w-none">
      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h1>{isZh ? "Quick Start" : "Quick Start"}</h1>
          <p>
            {isZh
              ? "本页用于对齐 API Reference 首页的结构与交互（Mock），不包含原站正文。"
              : "This page aligns the API reference landing structure and interactions (Mock), without original content."}
          </p>

          <div className="not-prose">
            <SectionAnchor id="base-url">Base URL</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-foreground/70">
                  {isZh ? "所有 API 请求的 Base URL：" : "All API requests should be made to:"}
                </div>
                <div className="flex items-center gap-2">
                  <CopyButton value={"https://api.example.com/v1"} label={isZh ? "复制" : "Copy Text"} />
                  <CopyButton
                    value={'base_url="https://api.example.com/v1"'}
                    label={isZh ? "复制 base_url" : "Copy base_url"}
                  />
                </div>
              </div>
              <div className="mt-2 font-mono text-sm text-foreground">https://api.example.com/v1</div>
              <div className="mt-3 text-foreground/70">
                {isZh ? "兼容接口：" : "Compatible interfaces:"}{" "}
                <span className="font-medium text-foreground/80">{isZh ? "OpenAI / Anthropic" : "OpenAI / Anthropic"}</span>
              </div>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="authentication">{isZh ? "鉴权" : "Authentication"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="font-medium">{isZh ? "Bearer Token" : "Bearer Token"}</div>
              <div className="mt-2 text-foreground/70">
                {isZh ? "Mock：在 Header 中携带 Token。" : "Mock: include token in request headers."}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-xs text-foreground/80">Authorization: Bearer sk-your-api-key</div>
                <CopyButton value={"Authorization: Bearer sk-your-api-key"} label={isZh ? "复制" : "Copy Text"} />
              </div>
            </div>
            <ol className="mt-4 list-decimal pl-6 text-sm text-foreground/80">
              <li>
                <Link
                  className="underline underline-offset-4"
                  href={locale === "zh-CN" ? "/zh-CN/console" : "/console"}
                >
                  {isZh ? "控制台" : "APIPod Console"}
                </Link>{" "}
                {isZh ? "中创建 Key，并在" : "to create a key, then manage it in"}{" "}
                <Link
                  className="underline underline-offset-4"
                  href={locale === "zh-CN" ? "/zh-CN/console/api-keys" : "/console/api-keys"}
                >
                  API Keys
                </Link>
                .
              </li>
              <li>{isZh ? "不要在前端直接暴露 Key（Mock）。" : "Never expose keys in client-side code (Mock)."}</li>
            </ol>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-medium">{isZh ? "环境变量" : "Environment Variable"}</div>
                <CopyButton value={'export APIPOD_API_KEY="sk-your-api-key"'} label={isZh ? "复制" : "Copy Text"} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs dark:bg-white/10">
                {'# Set as environment variable\nexport APIPOD_API_KEY="sk-your-api-key"\n'}
              </pre>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="quick-start">Quick Start</SectionAnchor>
            <div className="mt-2 text-sm text-foreground/70">
              {isZh ? "60 秒内完成首次调用（Mock）。" : "Make your first call in under 60 seconds (Mock)."}
            </div>
            <div className="mt-4">
              <CodeTabs locale={locale} variant="overview" endpointPath="/v1/chat/completions" />
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="available-apis">{isZh ? "可用 API" : "Available APIs"}</SectionAnchor>
            <div className="mt-2 text-sm text-foreground/70">
              {isZh ? "多模态统一接口（Mock）。" : "Unified APIs for multiple modalities (Mock)."}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                { title: isZh ? "Chat Completions" : "Chat Completions", href: `${base}/api-reference/llm/openai` },
                { title: isZh ? "Image Generation" : "Image Generation", href: `${base}/api-reference/image` },
                { title: isZh ? "Video Generation" : "Video Generation", href: `${base}/api-reference/video` },
                { title: isZh ? "Audio Generation" : "Audio Generation", href: `${base}/api-reference/audio` },
              ].map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="font-medium text-foreground">{x.title}</div>
                  <div className="mt-2 text-sm text-foreground/70">Endpoint details (Mock)</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="common-response-format">{isZh ? "响应格式" : "Common Response Format"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">JSON</div>
                <CopyButton
                  value={'{"id":"chatcmpl-abc123","object":"chat.completion","created":1699876543,"model":"gpt-4o","choices":[{"index":0,"message":{"role":"assistant","content":"..."},"finish_reason":"stop"}],"usage":{"prompt_tokens":20,"completion_tokens":10,"total_tokens":30}}'}
                  label={isZh ? "复制" : "Copy Text"}
                />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs dark:bg-white/10">
                {'{\n  "id": "chatcmpl-abc123",\n  "object": "chat.completion",\n  "created": 1699876543,\n  "model": "gpt-4o",\n  "choices": [\n    {\n      "index": 0,\n      "message": { "role": "assistant", "content": "..." },\n      "finish_reason": "stop"\n    }\n  ],\n  "usage": { "prompt_tokens": 20, "completion_tokens": 10, "total_tokens": 30 }\n}\n'}
              </pre>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="error-handling">{isZh ? "错误处理" : "Error Handling"}</SectionAnchor>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                className="w-full rounded-2xl border border-black/10 px-5 py-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                {isZh ? "错误响应格式（Mock）" : "Error Response Format"}
              </button>
              <button
                type="button"
                className="w-full rounded-2xl border border-black/10 px-5 py-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                {isZh ? "常见错误码（Mock）" : "Common Error Codes"}
              </button>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="handling-errors-in-code">{isZh ? "代码中处理错误" : "Handling Errors in Code"}</SectionAnchor>
            <HandlingCodeTabs locale={locale} />
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="streaming">{isZh ? "Streaming" : "Streaming"}</SectionAnchor>
            <div className="mt-2 text-sm text-foreground/70">
              {isZh ? "启用 stream 以获得实时响应（Mock）。" : "Enable stream for real-time responses (Mock)."}
            </div>
            <div className="mt-4">
              <CodeTabs locale={locale} variant="overview" endpointPath="/v1/chat/completions" />
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="sdk-support">{isZh ? "SDK 支持" : "SDK Support"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="text-foreground/70">{isZh ? "兼容官方 SDK（Mock）：" : "Compatible with official SDKs (Mock):"}</div>
              <div className="mt-3 grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">Python</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs text-foreground/80">pip install openai</div>
                    <CopyButton value={"pip install openai"} label={isZh ? "复制" : "Copy Text"} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">Node.js</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs text-foreground/80">npm install openai</div>
                    <CopyButton value={"npm install openai"} label={isZh ? "复制" : "Copy Text"} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">Go</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs text-foreground/80">
                      go get github.com/sashabaranov/go-openai
                    </div>
                    <CopyButton
                      value={"go get github.com/sashabaranov/go-openai"}
                      label={isZh ? "复制" : "Copy Text"}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                {isZh ? (
                  <button
                    type="button"
                    className="h-9 rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    查看更多
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="next-steps">{isZh ? "下一步" : "Next Steps"}</SectionAnchor>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Link
                href={`${base}/api-reference/llm/openai`}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "Chat Completions API" : "Chat Completions API"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "文本生成接口（Mock）。" : "Text generation endpoint docs (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/models" : "/models"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "Supported Models" : "Supported Models"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "浏览模型与能力（Mock）。" : "Browse models & capabilities (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/console/playground" : "/console/playground"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "Playground" : "Playground"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "浏览器内测试（Mock）。" : "Test APIs in browser (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/console/usage" : "/console/usage"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "Usage Dashboard" : "Usage Dashboard"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "用量与成本监控（Mock）。" : "Monitor usage and costs (Mock)."}</div>
              </Link>
            </div>
          </div>
        </div>

        <ApiToc locale={locale} items={toc} />
      </div>
    </article>
  );
}

function ApiReferenceNanoBanana({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const isZh = locale === "zh-CN";
  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>{title}</h1>
      <p>{isZh ? "Nano Banana 接口文档（Mock）。" : "Nano Banana API documentation (Mock)."}</p>
    </article>
  );
}

function ApiReferenceOpenAI({ locale }: { locale: Locale }) {
  const isZh = locale === "zh-CN";
  const toc = [
    { href: "#interface-definition", label: isZh ? "接口定义" : "Interface Definition" },
    { href: "#authentication", label: isZh ? "鉴权" : "Authentication" },
    { href: "#request-parameters", label: isZh ? "请求参数" : "Request Parameters" },
    { href: "#core-parameters", label: isZh ? "核心参数" : "Core Parameters" },
    { href: "#advanced-control", label: isZh ? "高级控制" : "Advanced Control" },
    { href: "#messages-structure", label: isZh ? "Messages 结构" : "Messages Structure Detail" },
    { href: "#response-structure", label: isZh ? "响应结构" : "Response Structure" },
    { href: "#supported-models", label: isZh ? "支持的模型" : "Supported Models" },
    { href: "#related-links", label: isZh ? "相关链接" : "Related Links" },
  ];

  const coreParams = [
    ["model", "string", "✅", "gpt-5", "Model ID"],
    ["messages", "array", "✅", "-", "Conversation messages"],
    ["stream", "boolean", "-", "false", "Enable streaming (SSE)"],
    ["temperature", "number", "-", "1.0", "Sampling temperature"],
    ["max_tokens", "integer", "-", "-", "Max output tokens"],
    ["top_p", "number", "-", "1.0", "Nucleus sampling"],
    ["presence_penalty", "number", "-", "0", "Penalize new tokens"],
    ["frequency_penalty", "number", "-", "0", "Penalize repeated tokens"],
  ];
  const messageFields = [
    "role",
    "content",
    "name",
    "tool_calls",
    "tool_call_id",
    "audio",
    "refusal",
    "metadata",
    "modalities",
    "reasoning",
    "seed",
    "stop",
    "n",
    "logprobs",
    "top_logprobs",
    "response_format",
    "tools",
    "tool_choice",
    "parallel_tool_calls",
    "user",
    "store",
  ];
  const supportedCount = isZh ? 101 : 21;

  return (
    <article className="max-w-none">
      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h1>{isZh ? "通用对话接口（Mock）" : "Universal Chat Interface (Mock)"}</h1>
          <p>
            {isZh
              ? "用于对齐 OpenAI 兼容接口文档页面结构与交互（Mock）。"
              : "Aligns OpenAI-compatible endpoint docs structure and interactions (Mock)."}
          </p>

          <div className="not-prose mt-4">
            <a href="#interface-definition" className="text-sm font-medium text-foreground/70">
              {isZh ? "Interface Definition" : "Interface Definition"}
            </a>
            <div className="mt-2" />
            <div id="interface-definition" />
            <InterfaceDefinition locale={locale} method="POST" host="https://api.example.com" path="/v1/chat/completions" />
            <div className="mt-4">
              <CodeTabs locale={locale} variant="api" endpointPath="/v1/chat/completions" />
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="authentication">{isZh ? "鉴权" : "Authentication"}</SectionAnchor>
            <div className="mt-4 text-sm text-foreground/70">
              {isZh ? "Mock：所有请求需要 Bearer Token。" : "Mock: all requests require a Bearer token."}
            </div>
            <div className="mt-3 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-foreground/80">Authorization: Bearer sk-xxxxxxxx</div>
                <CopyButton value={"Authorization: Bearer <token>"} label={isZh ? "复制" : "Copy Text"} />
              </div>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="request-parameters">{isZh ? "请求参数" : "Request Parameters"}</SectionAnchor>
            <div className="mt-4 text-sm text-foreground/70">
              {isZh ? "Mock：参数表用于对齐排版。" : "Mock: parameter table for layout parity."}
            </div>
          </div>

          <div className="not-prose mt-6">
            <SectionAnchor id="core-parameters">{isZh ? "核心参数" : "Core Parameters"}</SectionAnchor>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-black/[0.02] text-xs text-foreground/70 dark:bg-white/[0.06]">
                  <tr>
                    <th className="px-4 py-3">{isZh ? "参数" : "Parameter"}</th>
                    <th className="px-4 py-3">{isZh ? "类型" : "Type"}</th>
                    <th className="px-4 py-3">{isZh ? "必填" : "Required"}</th>
                    <th className="px-4 py-3">{isZh ? "默认值" : "Default"}</th>
                    <th className="px-4 py-3">{isZh ? "说明" : "Description"}</th>
                  </tr>
                </thead>
                <tbody>
                  {coreParams.map((row) => (
                    <tr key={row[0]} className="border-t border-black/10 dark:border-white/10">
                      <td className="px-4 py-3 font-mono">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                      <td className="px-4 py-3">{row[2]}</td>
                      <td className="px-4 py-3">{row[3]}</td>
                      <td className="px-4 py-3 text-foreground/70">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="advanced-control">{isZh ? "高级控制" : "Advanced Control"}</SectionAnchor>
            <div className="mt-4">
              <button
                type="button"
                className="w-full rounded-2xl border border-black/10 p-5 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                {isZh ? "展开查看高级参数（Mock）" : "Expand to view advanced parameters (Mock)"}
              </button>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="messages-structure">{isZh ? "Messages 结构" : "Messages Structure Detail"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="text-foreground/70">
                {isZh
                  ? "Mock：列表结构用于对齐层级。"
                  : "Mock: list structure aligns content hierarchy."}
              </div>
              <ul className="mt-3 space-y-2 text-foreground/80">
                {messageFields.map((x) => (
                  <li key={x} className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs">{x}</span>
                    <button
                      type="button"
                      className="h-8 rounded-md border border-black/10 px-3 text-xs hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      {isZh ? "查看" : "View"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="response-structure">{isZh ? "响应结构" : "Response Structure"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">JSON</div>
                <CopyButton value={'{"id":"mock","choices":[{"message":{"content":"..."}}] }'} label={isZh ? "复制" : "Copy Text"} />
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-black/10 px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                {isZh ? "Response Example (JSON)" : "Response Example (JSON)"}
              </button>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="supported-models">{isZh ? "支持的模型" : "Supported Models"}</SectionAnchor>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: supportedCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-xl border border-black/10 px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  {isZh ? "提供方" : "Provider"} {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="related-links">{isZh ? "相关链接" : "Related Links"}</SectionAnchor>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Link
                href={locale === "zh-CN" ? "/zh-CN/models" : "/models"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "模型列表" : "Model List"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "浏览可用模型（Mock）。" : "Browse available models (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/docs/api-reference" : "/docs/api-reference"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "返回索引" : "Back to Index"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "API Reference 首页（Mock）。" : "API reference landing (Mock)."}</div>
              </Link>
            </div>
          </div>
        </div>

        <ApiToc locale={locale} items={toc} />
      </div>
    </article>
  );
}

function ApiReferenceSeedream({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string[];
}) {
  const isZh = locale === "zh-CN";
  const leaf = slug[slug.length - 1] || "";
  const isEdit = leaf.includes("edit");
  const toc = [
    { href: "#interface-definition", label: isZh ? "接口定义" : "Interface Definition" },
    { href: "#authentication", label: isZh ? "鉴权" : "Authentication" },
    { href: "#request-parameters", label: isZh ? "请求参数" : "Request Parameters" },
    { href: "#core-parameters", label: isZh ? "核心参数" : "Core Parameters" },
    { href: "#prompt-tips", label: isZh ? "提示词技巧" : "Prompt Writing Tips" },
    { href: "#aspect-ratio", label: isZh ? "比例选项" : "Aspect Ratio Options" },
    { href: "#resolution", label: isZh ? "分辨率选项" : "Resolution Options" },
    { href: "#response-structure", label: isZh ? "响应结构" : "Response Structure" },
    { href: "#task-submission-response", label: isZh ? "任务提交响应" : "Task Submission Response" },
    { href: "#status-query", label: isZh ? "状态查询接口" : "Status Query Interface" },
    { href: "#status-fields", label: isZh ? "状态字段" : "Status Response Fields" },
    { href: "#task-status", label: isZh ? "任务状态说明" : "Task Status Description" },
    { href: "#error-handling", label: isZh ? "错误处理" : "Error Handling" },
    { href: "#best-practices", label: isZh ? "最佳实践" : "Best Practices" },
    { href: "#related-links", label: isZh ? "相关链接" : "Related Links" },
  ];

  const endpoint = isEdit ? "/v1/images/edits" : "/v1/images/generations";
  const title = isEdit
    ? isZh
      ? "Seedream V4.5 图生图（Mock）"
      : "Seedream v4.5 Image to Image (Mock)"
    : isZh
      ? "Seedream V4.5 文生图（Mock）"
      : "Seedream v4.5 Text to Image (Mock)";
  const editExtra = isEdit ? 0 : 0;
  const coreParamCount = (isZh ? 64 : 60) + editExtra;
  const promptTipsCount = isZh ? 10 : 10;
  const statusFieldsCount = isZh ? 18 : 20;
  const bestPracticesCount = isZh ? 24 : 25;
  const editExtraLinks = isEdit
    ? [
        "https://client.scalar.com/?url=https%3A%2F%2Fwww.apipod.ai%2Fseedream-4-5-edit-openai.yaml&integration=react&utm_source=api-reference&utm_medium=button&utm_campaign=modal",
        "https://client.scalar.com/?url=https%3A%2F%2Fwww.apipod.ai%2Fseedream-4-5-edit-openai.yaml&integration=react&utm_source=api-reference&utm_medium=button&utm_campaign=sidebar",
        "https://client.scalar.com/?url=https%3A%2F%2Fwww.apipod.ai%2Fseedream-4-5-edit-openai.yaml&utm_source=api-reference&utm_medium=button&utm_campaign=modal",
        "https://www.apipod.ai/workspace/default/request/P5VGhAWX8GDHLRTPO6Jdf",
        "https://www.apipod.ai/workspace/default/request/esIwWhU0wl3UugKnZo3We",
      ]
    : [];

  return (
    <article className="max-w-none">
      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h1>{title}</h1>
          <p>
            {isZh
              ? "用于对齐图像模型 API 文档的页面结构与交互（Mock）。"
              : "Aligns image model API docs page structure and interactions (Mock)."}
          </p>

          <div className="not-prose mt-4">
            <a href="#interface-definition" className="text-sm font-medium text-foreground/70">
              {isZh ? "Interface Definition" : "Interface Definition"}
            </a>
            <div className="mt-2" />
            <div id="interface-definition" />
            <InterfaceDefinition locale={locale} method="POST" host="https://api.example.com" path={endpoint} />
            <div className="mt-4">
              <CodeTabs locale={locale} variant="api" endpointPath={endpoint} />
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="authentication">{isZh ? "鉴权" : "Authentication"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-foreground/80">Authorization: Bearer sk-xxxxxxxx</div>
                <CopyButton value={"Authorization: Bearer <token>"} label={isZh ? "复制" : "Copy Text"} />
              </div>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="request-parameters">{isZh ? "请求参数" : "Request Parameters"}</SectionAnchor>
            <div className="mt-4 text-sm text-foreground/70">
              {isZh ? "Mock：参数与选项说明。" : "Mock: parameters and options."}
            </div>
          </div>

          <div className="not-prose mt-6">
            <SectionAnchor id="core-parameters">{isZh ? "核心参数" : "Core Parameters"}</SectionAnchor>
            <div className="mt-4 grid gap-3">
              {Array.from({ length: coreParamCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs">param_{i + 1}</span>
                    <span className="text-foreground/60">{isZh ? "查看" : "View"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="prompt-tips">{isZh ? "提示词技巧" : "Prompt Writing Tips"}</SectionAnchor>
            <div className="mt-4 grid gap-3">
              {Array.from({ length: promptTipsCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  {isZh ? "建议" : "Tip"} {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="aspect-ratio">{isZh ? "比例选项" : "Aspect Ratio Options"}</SectionAnchor>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {["1:1", "2:3", "3:2", "3:4", "4:3", "16:9", "9:16", "21:9"].map((x) => (
                <button
                  key={x}
                  type="button"
                  className="rounded-md border border-black/10 px-3 py-2 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="resolution">{isZh ? "分辨率选项" : "Resolution Options"}</SectionAnchor>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {["HD", "2K", "4K"].map((x) => (
                <button
                  key={x}
                  type="button"
                  className="rounded-md border border-black/10 px-3 py-2 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="response-structure">{isZh ? "响应结构" : "Response Structure"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">JSON</div>
                <CopyButton value={'{"code":0,"message":"success","data":{"task_id":"task_xxx"}}'} label={isZh ? "复制" : "Copy Text"} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs dark:bg-white/10">
                {'{\n  "code": 0,\n  "message": "success",\n  "data": { "task_id": "task_xxx" }\n}\n'}
              </pre>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="task-submission-response">
              {isZh ? "任务提交响应" : "Task Submission Response"}
            </SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">JSON</div>
                <CopyButton value={'{"code":0,"message":"success","data":{"task_id":"task_xxx"}}'} label={isZh ? "复制" : "Copy Text"} />
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-black/10 px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                {isZh ? "Response Example (JSON)" : "Response Example (JSON)"}
              </button>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="status-query">{isZh ? "状态查询接口" : "Status Query Interface"}</SectionAnchor>
            <InterfaceDefinition locale={locale} method="GET" host="https://api.example.com" path="/v1/tasks/{task_id}" />
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="status-fields">{isZh ? "状态字段" : "Status Response Fields"}</SectionAnchor>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: statusFieldsCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-xl border border-black/10 px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  field_{i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="task-status">{isZh ? "任务状态说明" : "Task Status Description"}</SectionAnchor>
            <div className="mt-4 grid gap-3">
              {["queued", "running", "succeeded", "failed", "canceled"].map((x) => (
                <button
                  key={x}
                  type="button"
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs">{x}</span>
                    <span className="text-foreground/60">{isZh ? "查看" : "View"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="error-handling">{isZh ? "错误处理" : "Error Handling"}</SectionAnchor>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-black/[0.02] text-xs text-foreground/70 dark:bg-white/[0.06]">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-t border-black/10 dark:border-white/10">
                      <td className="px-4 py-3 font-mono">IMG_{i + 1}</td>
                      <td className="px-4 py-3 text-foreground/70">Mock error description</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="best-practices">{isZh ? "最佳实践" : "Best Practices"}</SectionAnchor>
            <div className="mt-4 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
              <ul className="space-y-2 text-foreground/70">
                {Array.from({ length: bestPracticesCount }).map((_, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <span>{isZh ? "建议" : "Tip"} {i + 1}</span>
                    <button
                      type="button"
                      className="h-8 rounded-md border border-black/10 px-3 text-xs hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      {isZh ? "详情" : "Details"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="not-prose mt-8">
            <SectionAnchor id="related-links">{isZh ? "相关链接" : "Related Links"}</SectionAnchor>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Link
                href={
                  locale === "zh-CN"
                    ? isEdit
                      ? "/zh-CN/docs/api-reference/seedream/seedream-v4.5"
                      : "/zh-CN/docs/api-reference/seedream/seedream-v4.5-edit"
                    : isEdit
                      ? "/docs/api-reference/seedream/seedream-v4.5"
                      : "/docs/api-reference/seedream/seedream-v4.5-edit"
                }
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">
                  {isEdit ? (isZh ? "Seedream 文生图" : "Seedream Text to Image") : isZh ? "Seedream 图生图" : "Seedream Image to Image"}
                </div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "相关接口（Mock）。" : "Related endpoint (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/models" : "/models"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "模型列表" : "Model List"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "浏览模型（Mock）。" : "Browse models (Mock)."}</div>
              </Link>
              <Link
                href={locale === "zh-CN" ? "/zh-CN/console" : "/console"}
                className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="font-medium text-foreground">{isZh ? "在线控制台" : "Online Console"}</div>
                <div className="mt-2 text-sm text-foreground/70">{isZh ? "在浏览器中测试（Mock）。" : "Test in browser (Mock)."}</div>
              </Link>
              {editExtraLinks.map((href) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-black/10 p-5 no-underline hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="font-medium text-foreground">
                    {isZh ? "外部工具链接" : "External Tool Link"}
                  </div>
                  <div className="mt-2 text-sm text-foreground/70">
                    {isZh ? "仅用于对齐交互与跳转结构。" : "For interaction and navigation parity only."}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <ApiToc locale={locale} items={toc} />
      </div>
    </article>
  );
}

function ApiReferenceModalityPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "image" | "video" | "audio";
}) {
  const isZh = locale === "zh-CN";
  const title =
    kind === "image"
      ? isZh
        ? "Image Generation（Mock）"
        : "Image Generation (Mock)"
      : kind === "video"
        ? isZh
          ? "Video Generation（Mock）"
          : "Video Generation (Mock)"
        : isZh
          ? "Audio Generation（Mock）"
          : "Audio Generation (Mock)";
  const base = locale === "zh-CN" ? "/zh-CN/docs" : "/docs";

  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>{title}</h1>
      <p>{isZh ? "占位页：用于补齐 API Reference 的导航结构（Mock）。" : "Placeholder page for API reference navigation parity (Mock)."}</p>
      <p>
        <Link href={`${base}/api-reference`}>{isZh ? "返回 Quick Start" : "Back to Quick Start"}</Link>
      </p>
    </article>
  );
}

export function ApiReferenceMock({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string[];
}) {
  const isZh = locale === "zh-CN";
  const sub = slug.slice(1);
  if (sub.length === 0) return <ApiReferenceIndex locale={locale} />;

  const key = sub.join("/");
  if (key === "llm/openai") return <ApiReferenceOpenAI locale={locale} />;
  if (key === "image") return <ApiReferenceModalityPage locale={locale} kind="image" />;
  if (key === "video") return <ApiReferenceModalityPage locale={locale} kind="video" />;
  if (key === "audio") return <ApiReferenceModalityPage locale={locale} kind="audio" />;
  if (key === "nano-banana/nano-banana") return <ApiReferenceNanoBanana locale={locale} title={isZh ? "Nano Banana（Mock）" : "Nano Banana"} />;
  if (key === "nano-banana/nano-banana-pro") return <ApiReferenceNanoBanana locale={locale} title={isZh ? "Nano Banana Pro（Mock）" : "Nano Banana Pro"} />;
  if (key.startsWith("seedream/")) return <ApiReferenceSeedream locale={locale} slug={slug} />;

  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>{isZh ? "API Reference（Mock）" : "API Reference (Mock)"}</h1>
      <p>{titleFromSlug(slug)}</p>
    </article>
  );
}
