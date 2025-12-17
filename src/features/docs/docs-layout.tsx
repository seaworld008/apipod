import Link from "next/link";
import { Container } from "@/components/container";
import type { Locale } from "@/lib/i18n";
import { DocsThemeButtons } from "@/features/docs/docs-theme-buttons";
import { DocsSidebar } from "@/features/docs/docs-sidebar";
import { DocsLanguageMenu } from "@/features/docs/docs-language-menu";
import { DocsHiddenParity } from "@/features/docs/docs-hidden-parity";

export async function DocsLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const homeHref = locale === "zh-CN" ? "/zh-CN" : "/";
  const isZh = locale === "zh-CN";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <DocsSidebar locale={locale} />

        <div className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
            <Container className="flex h-14 items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link
                  href={homeHref}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {isZh ? "首页" : "Home"}
                </Link>
                <Link
                  href={locale === "zh-CN" ? "/zh-CN/models" : "/models"}
                  className="hidden text-sm text-foreground/80 hover:text-foreground md:inline"
                >
                  {isZh ? "模型" : "Models"}
                </Link>
                <Link
                  href={locale === "zh-CN" ? "/zh-CN/console" : "/console"}
                  className="hidden text-sm text-foreground/80 hover:text-foreground md:inline"
                >
                  {isZh ? "控制台" : "Dashboard"}
                </Link>
                <a
                  href="https://github.com/apipod"
                  className="hidden text-sm text-foreground/80 hover:text-foreground md:inline"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <div className="hidden h-5 w-px bg-black/10 dark:bg-white/10 md:block" />
                <div className="hidden items-center gap-2 md:flex">
                  <button
                    type="button"
                    className="h-9 rounded-md border border-black/10 bg-transparent px-3 text-sm text-foreground/70 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    Search ⌘ K
                  </button>
                </div>
                <DocsHiddenParity locale={locale} homeHref={homeHref} />
              </div>
              <div className="flex items-center gap-2">
                <DocsLanguageMenu locale={locale} />
                <DocsThemeButtons />
              </div>
            </Container>
          </header>

          <main className="py-10">
            <Container className="max-w-4xl">{children}</Container>
          </main>
        </div>
      </div>
    </div>
  );
}
