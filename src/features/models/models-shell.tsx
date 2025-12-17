"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ModelSeries } from "@/mock/models";
import { apiGetJson } from "@/lib/api/client";

type ApiResponse = { data: ModelSeries[] };
type Mode = "list" | "detail";

export function ModelsShell({
  basePath,
  mode,
  children,
}: {
  basePath: "" | "/zh-CN";
  mode: Mode;
  children?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ModelSeries[] | null>(null);
  const [capability, setCapability] = useState<string>("All");
  const [providers, setProviders] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;
    apiGetJson<ApiResponse>("/api/models")
      .then((json) => {
        if (!alive) return;
        setData(json.data ?? []);
      })
      .catch(() => {
        if (!alive) return;
        setData([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const providerCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of data ?? []) counts.set(m.provider, (counts.get(m.provider) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [data]);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of data ?? []) for (const t of m.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [data]);

  const capabilityTabs = [
    "All",
    "LLM text",
    "Text to image",
    "Text to video",
    "Image to video",
    "Image to image",
    "Image to 3D",
    "Video enhancement",
  ] as const;

  const filtered = useMemo(() => {
    const list = data ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((m) => {
      if (capability !== "All" && !m.capabilities.includes(capability as never)) return false;
      if (providers.size > 0 && !providers.has(m.provider)) return false;
      if (tags.size > 0 && !m.tags.some((t) => tags.has(t))) return false;
      if (!q) return true;
      const hay = `${m.name} ${m.slug} ${m.provider} ${m.capabilities.join(" ")} ${m.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [capability, data, providers, query, tags]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Explore AI models</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        Discover global frontier models from OpenAI, Anthropic, Google, and more in one catalog. (Mock)
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-4 text-sm dark:border-white/10">
          <div className="font-medium">FILTERS</div>

          <div className="mt-4">
            <div className="text-xs font-medium text-foreground/70">Providers</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {providerCounts.map(([p, n]) => {
                const active = providers.has(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setProviders((prev) => {
                        const next = new Set(prev);
                        if (next.has(p)) next.delete(p);
                        else next.add(p);
                        return next;
                      });
                    }}
                    className={[
                      "rounded-md border px-2 py-1 text-xs",
                      active
                        ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                        : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5",
                    ].join(" ")}
                  >
                    {p} {n}
                  </button>
                );
              })}
            </div>
          </div>

          {mode === "list" ? (
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                onClick={() => {
                  setQuery("");
                  setCapability("All");
                  setProviders(new Set());
                  setTags(new Set());
                }}
              >
                Clear filters
              </button>
            </div>
          ) : null}

          <div className="mt-5">
            <div className="text-xs font-medium text-foreground/70">Tags</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(mode === "detail" ? tagCounts.slice(0, 7) : tagCounts.slice(0, 16)).map(
                ([t, n]) => {
                const active = tags.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTags((prev) => {
                        const next = new Set(prev);
                        if (next.has(t)) next.delete(t);
                        else next.add(t);
                        return next;
                      });
                    }}
                    className={[
                      "rounded-md border px-2 py-1 text-xs",
                      active
                        ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                        : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5",
                    ].join(" ")}
                  >
                    {t} {n}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section>
          <div className="flex flex-col gap-3">
            {mode === "list" ? (
              <div className="flex flex-wrap gap-2">
                {capabilityTabs.map((t) => {
                  const active = capability === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCapability(t)}
                      className={[
                        "h-9 rounded-full border px-3 text-sm",
                        active
                          ? "border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10"
                          : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-foreground/70">
                {data ? `${filtered.length} series` : "Loading..."}
              </div>
              <input
                className="h-10 w-full rounded-md border border-black/10 bg-transparent px-3 text-sm outline-none placeholder:text-foreground/40 focus:border-black/30 dark:border-white/15 dark:focus:border-white/30 md:w-96"
                placeholder="Search model series or providers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {mode === "detail" ? (
            <div className="mt-6">{children}</div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {!data
                ? Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-44 animate-pulse rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.06]"
                    />
                  ))
                : filtered.map((m) => (
                    <Link
                      key={m.slug}
                      href={`${basePath}/models/${m.slug}`}
                      className="rounded-2xl border border-black/10 p-5 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                    >
                      <div className="text-xs font-medium text-foreground/70">
                        {m.provider}
                      </div>
                      <div className="mt-1 text-lg font-semibold tracking-tight">
                        {m.name}
                      </div>
                      <div className="mt-2 text-sm text-foreground/70">
                        {m.description}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {m.capabilities.slice(0, 5).map((c) => (
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
          )}
        </section>
      </div>
    </div>
  );
}
