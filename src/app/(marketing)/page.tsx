import Link from "next/link";
import { Container } from "@/components/container";
import { getFeaturedModels } from "@/mock/models";
import content from "@/content/marketing.en.json";

export default async function HomePage() {
  const featured = await getFeaturedModels();

  return (
    <div className="py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-sm text-foreground/70 dark:border-white/15">
              {content.hero.eyebrow}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md border border-black/10 bg-transparent px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                Spin the mascot (Mock)
              </button>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {content.hero.title}
            </h1>
            <p className="mt-4 max-w-prose text-base text-foreground/70">
              {content.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
              >
                {content.hero.primaryCta}
              </Link>
              <Link
                href="/models"
                className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-6 dark:border-white/10 dark:from-white/[0.06]">
            <div className="text-sm font-medium">{content.sections.featured.label}</div>
            <div className="mt-2 text-lg font-semibold">{content.sections.featured.title}</div>
            <div className="mt-2 text-sm text-foreground/70">
              {content.sections.featured.subtitle}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {featured.map((m) => (
                <Link
                  key={m.slug}
                  href={`/models/${m.slug}`}
                  className="rounded-xl border border-black/10 bg-background p-4 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="font-medium">{m.name}</div>
                  <div className="mt-1 text-foreground/70">{m.provider}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.capabilities.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-black/5 px-2 py-0.5 text-xs text-foreground/70 dark:bg-white/10"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-black/10 p-8 dark:border-white/10">
          <div className="text-sm font-medium text-foreground/70">Popular AI API Models</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {["All", "LLM", "Text to image", "Text to video", "Image to video", "Audio"].map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  {t}
                </button>
              ),
            )}
            <div className="flex-1" />
            <button
              type="button"
              aria-label="Prev"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              ›
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.06]"
              />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="text-sm font-medium text-foreground/70">
            {content.sections.reliability.label}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {content.sections.reliability.title}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.sections.reliability.items.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
              >
                <div className="font-medium">{f.title}</div>
                <div className="mt-2 text-sm text-foreground/70">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-black/10 p-8 dark:border-white/10">
          <div className="text-sm font-medium text-foreground/70">
            {content.sections.developerFirst.label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {content.sections.developerFirst.title}
          </div>
          <div className="mt-3 text-sm text-foreground/70">
            {content.sections.developerFirst.subtitle}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "Node.js"].map((x) => (
              <button
                key={x}
                type="button"
                className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                {x}
              </button>
            ))}
          </div>
          <pre className="mt-6 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs text-foreground/80 dark:bg-white/10">
            {`from openai import OpenAI\n\nclient = OpenAI(base_url=\"https://api.example.com/v1\", api_key=\"sk-...\")\nresponse = client.chat.completions.create(model=\"gpt-5.1\", messages=[{\"role\":\"user\",\"content\":\"Hello\"}])`}
          </pre>
        </div>

        <div className="mt-14 rounded-2xl border border-black/10 p-8 dark:border-white/10">
          <div className="text-2xl font-semibold tracking-tight">
            {content.sections.finalCta.title}
          </div>
          <div className="mt-3 text-sm text-foreground/70">
            {content.sections.finalCta.subtitle}
          </div>
          <div className="mt-6">
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
            >
              {content.sections.finalCta.cta}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
