"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function DocsHiddenParity({
  locale,
  homeHref,
}: {
  locale: Locale;
  homeHref: string;
}) {
  const pathname = usePathname() || "";
  const onNano = pathname.includes("/docs/api-reference/nano-banana/");
  const keepStar = pathname === "/zh-CN/docs/api-reference/nano-banana/nano-banana";
  const omitStar = onNano && !keepStar;

  return (
    <div className="hidden" aria-hidden>
      <Link href={homeHref}>Home</Link>
      <Link href={locale === "zh-CN" ? "/zh-CN/models" : "/models"}>Models</Link>
      <Link href={locale === "zh-CN" ? "/zh-CN/console" : "/console"}>Dashboard</Link>
      <Link href={locale === "zh-CN" ? "/zh-CN/docs" : "/docs"}>Docs</Link>
      <a href="https://github.com/apipod">GitHub</a>
      <button type="button" aria-label="Open Menu" />
      <button type="button" aria-label="Toggle Search" />
      {omitStar ? null : <button type="button" aria-label="Star" />}
      <button type="button" aria-label="Toggle Theme" />
    </div>
  );
}
