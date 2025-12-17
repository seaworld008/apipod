import Link from "next/link";
import { Container } from "@/components/container";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { t, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const labels = t(locale).nav;
  const base = locale === "zh-CN" ? "/zh-CN" : "";

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href={`${base}/`} className="font-semibold tracking-tight">
            APIPod
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-foreground/80 md:flex">
            <Link className="hover:text-foreground" href={`${base}/`}>
              {labels.home}
            </Link>
            <Link className="hover:text-foreground" href={`${base}/models`}>
              {labels.models}
            </Link>
            <Link className="hover:text-foreground" href={`${base}/docs`}>
              {labels.docs}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher activeLocale={locale} />
          <ThemeToggle />
          <Link
            href={`${base}/login`}
            className="hidden h-9 items-center rounded-md px-3 text-sm text-foreground/80 hover:text-foreground md:inline-flex"
          >
            {labels.login}
          </Link>
          <Link
            href={`${base}/register`}
            className="inline-flex h-9 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background hover:opacity-90"
          >
            {labels.start}
          </Link>
        </div>
      </Container>
    </header>
  );
}

