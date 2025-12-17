"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ModelSeries } from "@/mock/models";

export function ModelsBrowser({ initial }: { initial: ModelSeries[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initial;
    return initial.filter((m) => {
      const hay = `${m.name} ${m.slug} ${m.provider} ${m.capabilities.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [initial, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-foreground/70">
          {filtered.length} series
        </div>
        <input
          className="h-10 w-full rounded-md border border-black/10 bg-transparent px-3 text-sm outline-none placeholder:text-foreground/40 focus:border-black/30 dark:border-white/15 dark:focus:border-white/30 md:w-96"
          placeholder="Search model series or providers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Link
            key={m.slug}
            href={`/models/${m.slug}`}
            className="rounded-2xl border border-black/10 p-5 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
          >
            <div className="text-xs font-medium text-foreground/70">
              {m.provider}
            </div>
            <div className="mt-1 text-lg font-semibold tracking-tight">
              {m.name}
            </div>
            <div className="mt-2 text-sm text-foreground/70">{m.description}</div>
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
    </div>
  );
}

