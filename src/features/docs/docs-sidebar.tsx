"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { clsx } from "clsx";

function makeHref(locale: Locale, path: string) {
  if (locale === "zh-CN") return `/zh-CN${path}`;
  return path;
}

export function DocsSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const docsHome = makeHref(locale, "/docs");
  const overviewHref = locale === "zh-CN" ? "/zh-CN/docs" : "/en/docs";
  const apiReferenceHref = makeHref(locale, "/docs/api-reference");
  const isZh = locale === "zh-CN";

  const onApiRef = pathname.includes("/docs/api-reference");
  const onSeedream = pathname.includes("/docs/api-reference/seedream");
  const onNano = pathname.includes("/docs/api-reference/nano-banana");

  return (
    <aside className="hidden border-r border-black/10 p-4 dark:border-white/10 md:block">
      <div className="flex items-center justify-between gap-3">
        <Link href={docsHome} className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500"
          />
          <span>APIPod</span>
        </Link>
        <button
          type="button"
          className="h-9 rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
        >
          Collapse Sidebar
        </button>
      </div>

      <nav className="mt-6 space-y-2 text-sm">
        <Link
          className={clsx(
            "block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10",
            pathname === docsHome || pathname === overviewHref
              ? "bg-black/5 text-foreground dark:bg-white/10"
              : "text-foreground/80",
          )}
          href={overviewHref}
        >
          {isZh ? "概览" : "Overview"}
        </Link>

        <button
          type="button"
          aria-expanded={isZh ? onApiRef : false}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10"
          onClick={() => router.push(apiReferenceHref)}
        >
          <span>{isZh ? "API 参考" : "API Reference"}</span>
          <span aria-hidden className="text-foreground/50">
            ›
          </span>
        </button>

        {isZh && onApiRef ? (
          <div className="space-y-2 pl-1">
            <Link
              href={apiReferenceHref}
              className={clsx(
                "block rounded-md px-3 py-2 text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10",
                pathname === apiReferenceHref ? "bg-black/5 text-foreground dark:bg-white/10" : "",
              )}
            >
              快速开始
            </Link>

            <div className="px-3 pt-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
              Text
            </div>
            <button
              type="button"
              aria-expanded={true}
              className={clsx(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10",
                onApiRef ? "bg-black/[0.02] dark:bg-white/[0.04]" : "",
              )}
            >
              <span>LLM API</span>
              <span aria-hidden className="text-foreground/50">
                ▾
              </span>
            </button>
            <div className="space-y-1 pl-3">
              <Link
                href="/zh-CN/docs/api-reference/llm/openai"
                className={clsx(
                  "block rounded-md px-3 py-2 text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
                  pathname.includes("/zh-CN/docs/api-reference/llm/openai")
                    ? "bg-black/5 text-foreground dark:bg-white/10"
                    : "",
                )}
              >
                通用对话接口
              </Link>
            </div>

            <div className="px-3 pt-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
              Image
            </div>
            <button
              type="button"
              aria-expanded={onSeedream}
              className={clsx(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10",
                onSeedream ? "bg-black/[0.02] dark:bg-white/[0.04]" : "",
              )}
            >
              <span>Seedream</span>
              <span aria-hidden className="text-foreground/50">
                {onSeedream ? "▾" : "›"}
              </span>
            </button>
            {onSeedream ? (
              <div className="space-y-1 pl-3">
                <Link
                  href="/zh-CN/docs/api-reference/seedream/seedream-v4.5"
                  className={clsx(
                    "block rounded-md px-3 py-2 text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
                    pathname.includes("/zh-CN/docs/api-reference/seedream/seedream-v4.5")
                      ? "bg-black/5 text-foreground dark:bg-white/10"
                      : "",
                  )}
                >
                  Seedream V4.5
                </Link>
                <Link
                  href="/zh-CN/docs/api-reference/seedream/seedream-v4.5-edit"
                  className={clsx(
                    "block rounded-md px-3 py-2 text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
                    pathname.includes("/zh-CN/docs/api-reference/seedream/seedream-v4.5-edit")
                      ? "bg-black/5 text-foreground dark:bg-white/10"
                      : "",
                  )}
                >
                  Seedream V4.5 Edit
                </Link>
              </div>
            ) : null}

            <button
              type="button"
              aria-expanded={onNano}
              className={clsx(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10",
                onNano ? "bg-black/[0.02] dark:bg-white/[0.04]" : "",
              )}
            >
              <span>Nano Banana</span>
              <span aria-hidden className="text-foreground/50">
                {onNano ? "▾" : "›"}
              </span>
            </button>
            {onNano ? (
              <div className="space-y-1 pl-3">
                <Link
                  href="/zh-CN/docs/api-reference/nano-banana/nano-banana"
                  className={clsx(
                    "block rounded-md px-3 py-2 text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
                    pathname.includes("/zh-CN/docs/api-reference/nano-banana/nano-banana")
                      ? "bg-black/5 text-foreground dark:bg-white/10"
                      : "",
                  )}
                >
                  Nano Banana
                </Link>
                <Link
                  href="/zh-CN/docs/api-reference/nano-banana/nano-banana-pro"
                  className={clsx(
                    "block rounded-md px-3 py-2 text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
                    pathname.includes("/zh-CN/docs/api-reference/nano-banana/nano-banana-pro")
                      ? "bg-black/5 text-foreground dark:bg-white/10"
                      : "",
                  )}
                >
                  Nano Banana Pro
                </Link>
              </div>
            ) : null}

            <div className="px-3 pt-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
              Video
            </div>
          </div>
        ) : null}
      </nav>
    </aside>
  );
}
