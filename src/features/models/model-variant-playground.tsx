"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import type { Locale } from "@/lib/i18n";
import type { ModelSeries, ModelVariant } from "@/mock/models";

function isVideoModel(variant: ModelVariant) {
  return variant.outputTypes.includes("video");
}

function isImageModel(variant: ModelVariant) {
  return variant.outputTypes.includes("image");
}

export function ModelVariantPlayground({
  locale,
  series,
  variant,
}: {
  locale: Locale;
  series: ModelSeries;
  variant: ModelVariant;
}) {
  const router = useRouter();
  const base = locale === "zh-CN" ? "/zh-CN" : "";
  const [inputMode, setInputMode] = useState<"form" | "json">("form");
  const [activeTab, setActiveTab] = useState<"playground" | "docs">("playground");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const showRichLinks = variant.slug === "nano-banana-pro";
  const isVeo = series.slug === "veo3-1";
  const isVeoFastRef = isVeo && variant.slug === "veo3-1-fast-ref";
  const isSeedreamEdit = series.slug === "seedream-v4.5" && variant.slug.endsWith("-edit");
  const isSora = series.slug === "sora-2";
  const hideLongSections = isSeedreamEdit || isSora;

  const docsHref = useMemo(() => {
    if (series.slug === "nano-banana") return `${base}/docs/api-reference/nano-banana/nano-banana-pro`;
    if (series.slug === "seedream-v4.5") return `${base}/docs/api-reference/seedream/seedream-v4.5`;
    return `${base}/docs/api-reference`;
  }, [base, series.slug]);

  const extraOptionButtons = useMemo(() => {
    // 用于对齐不同模型的交互密度（不内置原站正文/素材）。
    const list: Array<{ group: string; options: string[] }> = [];

    if (isSeedreamEdit) {
      return [
        {
          group: locale === "zh-CN" ? "画幅" : "Aspect ratio",
          options: ["1:1", "2:3", "3:2", "3:4", "4:3", "16:9", "9:16"],
        },
        {
          group: locale === "zh-CN" ? "质量" : "Quality",
          options: ["2K", "4K"],
        },
      ];
    }

    if (isSora) {
      return [
        { group: locale === "zh-CN" ? "时长" : "Duration", options: ["10", "15"] },
        { group: locale === "zh-CN" ? "画幅" : "Aspect ratio", options: ["16:9", "9:16"] },
      ];
    }

    if (isImageModel(variant)) {
      list.push({
        group: locale === "zh-CN" ? "尺寸" : "Size",
        options: ["1:1", "4:3", "16:9"],
      });
      list.push({
        group: locale === "zh-CN" ? "风格" : "Style",
        options: locale === "zh-CN" ? ["写实", "插画", "动漫"] : ["Realistic", "Illustration", "Anime"],
      });
    }

    if (isVideoModel(variant)) {
      list.push({
        group: locale === "zh-CN" ? "时长" : "Duration",
        options: ["5", "10", "15"],
      });
      list.push({
        group: locale === "zh-CN" ? "画幅" : "Aspect",
        options: ["16:9", "9:16", "1:1"],
      });
      list.push({
        group: locale === "zh-CN" ? "质量" : "Quality",
        options:
          variant.slug.endsWith("-quality")
            ? locale === "zh-CN"
              ? ["均衡", "高质量"]
              : ["Balanced", "Quality"]
            : locale === "zh-CN"
              ? ["快速", "均衡", "高质量"]
              : ["Fast", "Balanced", "Quality"],
      });
    }

    // nano-banana-pro 对齐更高的按钮密度
    if (variant.slug === "nano-banana-pro") {
      list.push({
        group: locale === "zh-CN" ? "编辑" : "Edit",
        options: locale === "zh-CN" ? ["抠图", "替换", "扩图", "去噪"] : ["Mask", "Replace", "Outpaint", "Denoise"],
      });
    }

    return list;
  }, [isSeedreamEdit, isSora, locale, variant]);

  const faqItems = useMemo(() => {
    const zh = locale === "zh-CN";
    return [
      {
        q: zh ? "如何开始？（Mock）" : "How do I get started? (Mock)",
        a: zh
          ? "此页面用于复刻布局与交互；真实调用请接入后端与鉴权。"
          : "This page aligns layout & interactions; wire backend/auth for real calls.",
      },
      {
        q: zh ? "支持哪些输入？（Mock）" : "What inputs are supported? (Mock)",
        a: zh ? "根据模型类型展示不同输入控件（Mock）。" : "Controls vary by model type (Mock).",
      },
      {
        q: zh ? "费用如何计算？（Mock）" : "How is pricing calculated? (Mock)",
        a: zh ? "示例价格仅用于 UI 对齐。" : "Mock pricing for UI parity only.",
      },
      {
        q: zh ? "如何查看 API 文档？（Mock）" : "Where are the API docs? (Mock)",
        a: zh ? "点击上方 API Docs 或下方快速接入区块。" : "Use the API Docs tab or the integration section.",
      },
    ];
  }, [locale]);

  const heroTitle = locale === "zh-CN" ? `${series.name} ${variant.name}` : `${variant.name}`;
  const priceText = `$${variant.pricePerRequestUsd.toFixed(3)} / request`;

  return (
    <div>
      <div className="flex flex-col gap-3 text-sm text-foreground/70 sm:flex-row sm:items-center sm:gap-2">
        <Link className="hover:text-foreground hover:underline" href={`${base}/`}>
          {locale === "zh-CN" ? "首页" : "Home"}
        </Link>
        <span>/</span>
        <Link className="hover:text-foreground hover:underline" href={`${base}/models`}>
          {locale === "zh-CN" ? "模型" : "Models"}
        </Link>
        <span>/</span>
        <Link
          className="hover:text-foreground hover:underline"
          href={`${base}/models/${series.slug}`}
        >
          {series.name}
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-black/[0.02] ring-1 ring-black/10 dark:to-white/[0.06] dark:ring-white/10" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{heroTitle}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
                  {variant.modelId}
                </span>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
                  {priceText}
                </span>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
                  {series.provider}
                </span>
              </div>
              <div className="mt-3 max-w-prose text-sm text-foreground/70">
                {locale === "zh-CN"
                  ? "此页面为 UI 复刻（Mock）。参数与输出仅用于对齐交互密度与信息结构。"
                  : "UI clone (Mock). Inputs/outputs are placeholders for interaction parity."}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <CopyButton value={variant.modelId} label={locale === "zh-CN" ? "复制 Model ID" : "Copy Model ID"} />
                {isSeedreamEdit || isSora ? null : (
                  <>
                    <button
                      type="button"
                      aria-label="Share"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                    >
                      <span className="text-sm">↗</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Favorite"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                    >
                      <span className="text-sm">★</span>
                    </button>
                    {showRichLinks ? (
                      <button
                        type="button"
                        aria-label="Compare"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                      >
                        <span className="text-sm">≋</span>
                      </button>
                    ) : isVeo || series.slug === "seedream-v4.5" ? null : (
                      <>
                        <button
                          type="button"
                          aria-label="History"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                        >
                          <span className="text-sm">⟲</span>
                        </button>
                        <button
                          type="button"
                          aria-label="Download"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                        >
                          <span className="text-sm">⇩</span>
                        </button>
                      </>
                    )}
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label="More"
                      className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                      onKeyDown={() => {}}
                      onClick={() => {}}
                    >
                      {locale === "zh-CN" ? "更多" : "More"}
                    </span>
                  </>
                )}
              </div>

              {((isVeo || series.slug === "seedream-v4.5") && series.variants.length > 0) ? (
                <div className="mt-4">
                  <div className="text-xs font-medium text-foreground/70">
                    {locale === "zh-CN" ? "Model Type" : "Model Type"}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {series.variants.slice(0, 4).map((v) => {
                      const active = v.slug === variant.slug;
                      return (
                        <button
                          key={v.slug}
                          type="button"
                          className={[
                            "inline-flex h-8 items-center rounded-full border px-3 text-xs",
                            active
                              ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                              : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
                          ].join(" ")}
                          onClick={() => router.push(`${base}/models/${series.slug}/${v.slug}`)}
                        >
                          {v.name.replace(/\s*\(Mock\)\s*$/i, "").trim()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              role="radio"
              aria-checked={activeTab === "playground"}
              className={[
                "inline-flex h-9 items-center rounded-full border px-3 text-sm",
                activeTab === "playground"
                  ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                  : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
              ].join(" ")}
              onClick={() => setActiveTab("playground")}
            >
              {locale === "zh-CN" ? "Playground" : "Playground"}
            </button>
            <a
              className={[
                "inline-flex h-9 items-center rounded-full border px-3 text-sm",
                activeTab === "docs"
                  ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                  : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
              ].join(" ")}
              href={docsHref}
              onClick={() => setActiveTab("docs")}
            >
              {locale === "zh-CN" ? "API Docs" : "API Docs"}
            </a>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5 dark:border-white/10 dark:from-white/[0.06]">
          <div className="text-xs font-medium text-foreground/70">
            {locale === "zh-CN" ? "预览（Mock）" : "Preview (Mock)"}
          </div>
          <div className="mt-3 aspect-video rounded-xl bg-black/5 dark:bg-white/10" />
          <div className="mt-4 flex items-center justify-between text-xs text-foreground/70">
            <div>{locale === "zh-CN" ? "点击下方运行以生成输出" : "Run the model to generate output"}</div>
            {showRichLinks || isSeedreamEdit ? (
              <a className="hover:text-foreground hover:underline" href={docsHref}>
                {locale === "zh-CN" ? "查看文档" : "View docs"}
              </a>
            ) : (
              <span className="text-foreground/60">{locale === "zh-CN" ? "文档入口见上方" : "Docs link above"}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div className="font-medium">{locale === "zh-CN" ? "Input" : "Input"}</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={[
                  "h-8 rounded-md border px-2 text-xs",
                  inputMode === "form"
                    ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                    : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
                ].join(" ")}
                onClick={() => setInputMode("form")}
              >
                Form
              </button>
              <button
                type="button"
                className={[
                  "h-8 rounded-md border px-2 text-xs",
                  inputMode === "json"
                    ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                    : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
                ].join(" ")}
                onClick={() => setInputMode("json")}
              >
                JSON
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <div>
              <div className="text-xs font-medium text-foreground/70">
                {locale === "zh-CN" ? "Prompt" : "Prompt"}
              </div>
              <textarea
                className="mt-2 h-24 w-full rounded-xl border border-black/10 bg-transparent p-3 text-sm outline-none placeholder:text-foreground/40 focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
                placeholder={locale === "zh-CN" ? "输入提示词（Mock）" : "Type a prompt (Mock)"}
                defaultValue=""
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-8 items-center rounded-md border border-black/10 px-2 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  {locale === "zh-CN" ? "插入示例" : "Insert example"}
                </button>
                <CopyButton
                  value={`{ \"model\": \"${variant.modelId}\", \"prompt\": \"...\" }`}
                  label={locale === "zh-CN" ? "复制 JSON 示例" : "Copy JSON example"}
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-foreground/70">
                {locale === "zh-CN" ? "上传" : "Upload"}
              </div>
              <button
                type="button"
                className="mt-2 flex h-20 w-full items-center justify-center rounded-xl border border-dashed border-black/15 bg-black/[0.02] text-xs text-foreground/70 hover:bg-black/5 dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/10"
              >
                {locale === "zh-CN" ? "点击或拖拽上传（Mock）" : "Click or drag to upload (Mock)"}
              </button>
              {isSeedreamEdit ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-md border border-black/10 px-2 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    + Add files
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-md border border-black/10 px-2 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    Clear
                  </button>
                </div>
              ) : isSora ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-md border border-black/10 px-2 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {locale === "zh-CN" ? "浏览" : "Browse"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-md border border-black/10 px-2 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {locale === "zh-CN" ? "使用示例" : "Use sample"}
                  </button>
                </div>
              ) : null}
            </div>

            {extraOptionButtons.map((g) => (
              <div key={g.group}>
                <div className="text-xs font-medium text-foreground/70">{g.group}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {g.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      className="inline-flex h-8 items-center rounded-full border border-black/10 px-3 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                {locale === "zh-CN" ? "重置" : "Reset"}
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-500"
              >
                {locale === "zh-CN" ? "运行模型" : "Run Model"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <div className="font-medium">{locale === "zh-CN" ? "Output" : "Output"}</div>
          <div className="mt-6 flex min-h-72 flex-col items-center justify-center gap-3 rounded-xl bg-black/[0.02] p-6 text-center dark:bg-white/[0.06]">
            <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/10" />
            <div className="text-sm font-medium">
              {locale === "zh-CN"
                ? "暂无输出（Mock）"
                : "No output yet (Mock)"}
            </div>
            <div className="text-xs text-foreground/70">
              {locale === "zh-CN"
                ? "点击运行按钮生成结果占位。"
                : "Run the model to generate placeholder output."}
            </div>
            {isVeo || isSeedreamEdit || isSora ? null : (
              <button
                type="button"
                className="mt-2 inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                {locale === "zh-CN" ? "查看示例输出" : "View sample output"}
              </button>
            )}
          </div>
        </section>
      </div>

      <section id="overview" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">{locale === "zh-CN" ? "Overview" : "Overview"}</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="text-3xl font-semibold tracking-tight">{series.name}</div>
            <div className="mt-2 text-sm text-foreground/70">
              {locale === "zh-CN"
                ? "概览区块用于对齐版式、层级、CTA 与锚点。"
                : "Overview section aligns layout, hierarchy, CTAs and anchors."}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {showRichLinks ? (
                <>
                  <Link
                    href={`${base}/register`}
                    className="inline-flex h-9 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background hover:opacity-90"
                  >
                    {locale === "zh-CN" ? "开始使用" : "Start for free"}
                  </Link>
                  <Link
                    href={docsHref}
                    className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {locale === "zh-CN" ? "阅读 API 文档" : "Read API docs"}
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="text-sm font-medium">{locale === "zh-CN" ? "模型信息" : "Model Info"}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { k: "Model ID", v: variant.modelId },
                { k: locale === "zh-CN" ? "价格" : "Price", v: priceText },
                { k: locale === "zh-CN" ? "输入" : "Input", v: variant.inputTypes.join(", ") },
                { k: locale === "zh-CN" ? "输出" : "Output", v: variant.outputTypes.join(", ") },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-xl border border-black/10 p-4 text-sm dark:border-white/10"
                >
                  <div className="text-xs font-medium text-foreground/70">{x.k}</div>
                  <div className="mt-1 font-medium">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {hideLongSections ? null : (
      <section id="why" className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {locale === "zh-CN" ? `为什么选择 ${series.name}？` : `Why ${series.name}?`}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              t: locale === "zh-CN" ? "稳定与回退" : "Reliability",
              d: locale === "zh-CN" ? "用于对齐卡片栅格与图标位。" : "Align cards grid and icon slots.",
            },
            {
              t: locale === "zh-CN" ? "极速接入" : "Fast integration",
              d: locale === "zh-CN" ? "用于对齐 CTA 与示例区域。" : "Align CTAs and sample areas.",
            },
            {
              t: locale === "zh-CN" ? "成本控制" : "Cost control",
              d: locale === "zh-CN" ? "用于对齐信息层级与布局。" : "Align information hierarchy and layout.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
              <div className="font-medium">{c.t}</div>
              <div className="mt-2 text-sm text-foreground/70">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
      )}

      {hideLongSections ? null : (
      <section id="capabilities" className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {locale === "zh-CN" ? "New Capabilities（Mock）" : "New Capabilities (Mock)"}
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="text-sm font-medium">{locale === "zh-CN" ? "示例能力 A" : "Capability A"}</div>
            <div className="mt-3 aspect-video rounded-xl bg-black/5 dark:bg-white/10" />
            <div className="mt-3 text-sm text-foreground/70">
              {locale === "zh-CN" ? "媒体占位用于对齐版式。" : "Media placeholder for layout parity."}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="text-sm font-medium">{locale === "zh-CN" ? "示例能力 B" : "Capability B"}</div>
            <div className="mt-3 aspect-video rounded-xl bg-black/5 dark:bg-white/10" />
            <div className="mt-3 text-sm text-foreground/70">
              {locale === "zh-CN" ? "媒体占位用于对齐版式。" : "Media placeholder for layout parity."}
            </div>
          </div>
        </div>
      </section>
      )}

      {hideLongSections || isVeoFastRef ? null : (
      <section id="integrate" className="mt-12">
        <div className="rounded-2xl border border-black/10 p-8 dark:border-white/10">
          <div className="text-sm font-medium text-foreground/70">
            {locale === "zh-CN" ? "Integrate in Seconds" : "Integrate in Seconds"}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {locale === "zh-CN" ? "快速接入（Mock）" : "Quick integration (Mock)"}
          </div>
          <div className="mt-3 text-sm text-foreground/70">
            {locale === "zh-CN"
              ? "步骤与代码块用于对齐复制按钮与交互密度。"
              : "Steps & code blocks align copy interactions and density."}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="text-sm">
              <ol className="list-decimal pl-4 text-foreground/80">
                <li className="mb-2">
                  {showRichLinks ? (
                    <>
                      <a className="underline hover:text-foreground" href={`${base}/console`}>
                        {locale === "zh-CN" ? "打开 Console" : "Open Console"}
                      </a>{" "}
                      {locale === "zh-CN" ? "并生成 API Key。" : "and generate an API key."}
                    </>
                  ) : (
                    <span>
                      {locale === "zh-CN"
                        ? "打开 Console 并生成 API Key。"
                        : "Open Console and generate an API key."}
                    </span>
                  )}
                </li>
                <li className="mb-2">
                  {showRichLinks ? (
                    <>
                      <a className="underline hover:text-foreground" href={docsHref}>
                        {locale === "zh-CN" ? "阅读 API Reference" : "Read API Reference"}
                      </a>{" "}
                      {locale === "zh-CN" ? "并选择合适模型。" : "and pick a model."}
                    </>
                  ) : (
                    <span>
                      {locale === "zh-CN"
                        ? "阅读 API Reference 并选择合适模型。"
                        : "Read API Reference and pick a model."}
                    </span>
                  )}
                </li>
                <li>
                  {locale === "zh-CN"
                    ? "将 base_url 指向你的 APIPod 网关（Mock）。"
                    : "Point base_url to your APIPod gateway (Mock)."}
                </li>
              </ol>
              {showRichLinks ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`${base}/pricing`}
                    className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {locale === "zh-CN" ? "查看定价" : "View pricing"}
                  </Link>
                  <Link
                    href={`${base}/contact`}
                    className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {locale === "zh-CN" ? "联系销售" : "Contact sales"}
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl bg-black/5 p-4 text-xs text-foreground/80 dark:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{locale === "zh-CN" ? "示例代码" : "Sample code"}</div>
                <CopyButton
                  value={`curl -X POST https://api.example.com/v1/run -d '{\"model\":\"${variant.modelId}\"}'`}
                  label={locale === "zh-CN" ? "复制代码" : "Copy code"}
                />
              </div>
              <pre className="mt-3 overflow-x-auto">{`curl -X POST https://api.example.com/v1/run \\\n  -H \"Authorization: Bearer sk-...\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"${variant.modelId}\",\"input\":{}}'`}</pre>
            </div>
          </div>
        </div>
      </section>
      )}

      {hideLongSections ? null : (
      <section id="faq" className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {locale === "zh-CN" ? "Frequently Asked Questions" : "Frequently Asked Questions"}
        </h2>
        <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 dark:divide-white/10 dark:border-white/10">
          {(isVeoFastRef ? faqItems.slice(0, 2) : faqItems).map((x, idx) => {
            const open = faqOpen === idx;
            return (
              <div key={x.q} className="p-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 text-left"
                  onClick={() => setFaqOpen((cur) => (cur === idx ? null : idx))}
                >
                  <div className="font-medium">{x.q}</div>
                  <div className="text-sm text-foreground/70">{open ? "−" : "+"}</div>
                </button>
                {open ? <div className="mt-3 text-sm text-foreground/70">{x.a}</div> : null}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-white">
          <div className="text-2xl font-semibold tracking-tight">
            {locale === "zh-CN" ? `准备好使用 ${series.name} 了吗？` : `Ready to use ${series.name}?`}
          </div>
          <div className="mt-3 text-sm text-white/90">
            {locale === "zh-CN"
              ? "CTA 区用于对齐按钮样式与信息层级（Mock）。"
              : "CTA section aligns button styles and hierarchy (Mock)."}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${base}/register`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-white/90"
            >
              {locale === "zh-CN" ? "开始使用" : "Start for free"}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 px-4 text-sm font-medium text-white hover:bg-white/10"
            >
              {locale === "zh-CN" ? "联系销售" : "Contact sales"}
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
