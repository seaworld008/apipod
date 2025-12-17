"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

function swapLocale(pathname: string, target: Locale) {
  if (target === "zh-CN") {
    if (pathname === "/") return "/zh-CN";
    if (pathname.startsWith("/zh-CN/")) return pathname;
    if (pathname.startsWith("/zh-CN")) return pathname;
    return `/zh-CN${pathname}`;
  }

  if (pathname === "/zh-CN") return "/";
  if (pathname.startsWith("/zh-CN/")) return pathname.replace("/zh-CN", "");
  return pathname;
}

export function DocsLanguageMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => [
      { label: "English", href: swapLocale(pathname, "en") },
      { label: "中文", href: swapLocale(pathname, "zh-CN") },
    ],
    [pathname],
  );

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        className="hidden h-9 items-center rounded-md border border-black/10 px-3 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10 md:inline-flex"
        onClick={() => setOpen((v) => !v)}
      >
        Choose a language
      </button>
      {open ? (
        <div
          role="dialog"
          className="absolute right-0 top-[calc(100%+8px)] w-44 rounded-xl border border-black/10 bg-background p-2 shadow-lg dark:border-white/10"
        >
          <div className="space-y-1 text-sm">
            {items.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10",
                  locale === "zh-CN"
                    ? x.label === "中文"
                      ? "bg-black/5 dark:bg-white/10"
                      : ""
                    : x.label === "English"
                      ? "bg-black/5 dark:bg-white/10"
                      : "",
                ].join(" ")}
              >
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
