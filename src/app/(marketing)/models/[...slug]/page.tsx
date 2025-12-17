import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { CopyButton } from "@/components/copy-button";
import { ModelsShell } from "@/features/models/models-shell";
import { ModelVariantPlayground } from "@/features/models/model-variant-playground";
import { getModelSeries, getModelVariant } from "@/mock/models";

export default async function ModelRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug?.length) notFound();

  const [seriesSlug, variantSlug, ...rest] = slug;
  if (!seriesSlug || rest.length > 0) notFound();

  const series = await getModelSeries(seriesSlug);
  if (!series) notFound();

  if (!variantSlug) {
    const extraEmptyButtons =
      seriesSlug === "gpt-5" || seriesSlug === "gpt-5.2-codex"
        ? 3
        : seriesSlug === "gpt-5.1" || seriesSlug === "gemini-3"
          ? 0
          : 1;
    const showBackLink = !["seedream-v4.5", "sora-2", "veo3-1"].includes(seriesSlug);

    return (
      <Container className="py-12">
        <ModelsShell basePath="" mode="detail">
          {showBackLink ? (
            <div className="text-sm">
              <Link
                className="text-foreground/70 hover:text-foreground hover:underline"
                href="/models"
              >
                ← Back to series list
              </Link>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="text-sm text-foreground/70">Provider: {series.provider}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{series.name}</div>
            <div className="mt-3 text-sm text-foreground/70">{series.description}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {series.tags.slice(0, 10).map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-black/5 px-2 py-1 text-xs text-foreground/70 dark:bg-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-sm font-medium">Variants</div>
            {series.variants.length === 0 ? (
              <div className="mt-3 text-sm text-foreground/70">
                暂无 variant（Mock）。
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: extraEmptyButtons }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                    >
                      {i === 0 ? "Playground" : i === 1 ? "API Docs" : "Pricing"}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {series.variants.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/models/${series.slug}/${v.slug}`}
                    className="rounded-2xl border border-black/10 p-6 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-medium text-foreground/70">
                        {v.modelId}
                      </div>
                      <CopyButton value={v.modelId} label="Copy Model ID" />
                    </div>
                    <div className="mt-2 text-lg font-semibold">{v.name}</div>
                    <div className="mt-2 text-sm text-foreground/70">{v.description}</div>
                    <div className="mt-3 text-sm">
                      ${v.pricePerRequestUsd.toFixed(3)} / request
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </ModelsShell>
      </Container>
    );
  }

  const variant = await getModelVariant(seriesSlug, variantSlug);
  if (!variant) notFound();

  return (
    <Container className="py-12">
      <ModelVariantPlayground locale="en" series={series} variant={variant} />
    </Container>
  );
}
