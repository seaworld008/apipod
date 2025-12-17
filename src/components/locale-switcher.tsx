"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

function swapLocale(pathname: string, targetLocale: "en" | "zh-CN") {
  if (targetLocale === "zh-CN") {
    if (pathname === "/") return "/zh-CN";
    if (pathname.startsWith("/zh-CN/")) return pathname;
    if (pathname.startsWith("/zh-CN")) return pathname;
    return `/zh-CN${pathname}`;
  }

  if (pathname === "/zh-CN") return "/";
  if (pathname.startsWith("/zh-CN/")) return pathname.replace("/zh-CN", "");
  return pathname;
}

export function LocaleSwitcher({ activeLocale }: { activeLocale: "en" | "zh-CN" }) {
  const pathname = usePathname() || "/";

  return (
    <div className="flex items-center gap-1 rounded-md border border-black/10 p-1 text-sm dark:border-white/15">
      <Link
        className={clsx(
          "rounded px-2 py-1",
          activeLocale === "en"
            ? "bg-black/5 text-foreground dark:bg-white/10"
            : "text-foreground/70 hover:text-foreground",
        )}
        href={swapLocale(pathname, "en")}
      >
        EN
      </Link>
      <Link
        className={clsx(
          "rounded px-2 py-1",
          activeLocale === "zh-CN"
            ? "bg-black/5 text-foreground dark:bg-white/10"
            : "text-foreground/70 hover:text-foreground",
        )}
        href={swapLocale(pathname, "zh-CN")}
      >
        中文
      </Link>
    </div>
  );
}

