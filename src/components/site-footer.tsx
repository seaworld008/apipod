import Link from "next/link";
import { Container } from "@/components/container";
import { t, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const labels = t(locale).nav;
  const base = locale === "zh-CN" ? "/zh-CN" : "";

  return (
    <footer className="border-t border-black/10 py-10 text-sm text-foreground/80 dark:border-white/10">
      <Container>
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-semibold text-foreground">APIPod</div>
            <p className="mt-2 max-w-sm">
              复刻壳子（Mock 数据）：用于对照信息架构与交互，不包含原站素材。
            </p>
          </div>

          <div>
            <div className="font-medium text-foreground">Product</div>
            <div className="mt-3 flex flex-col gap-2">
              <Link href={`${base}/features`} className="hover:text-foreground">
                Features
              </Link>
              <Link href={`${base}/pricing`} className="hover:text-foreground">
                {labels.pricing}
              </Link>
              <Link href={`${base}/models`} className="hover:text-foreground">
                {labels.models}
              </Link>
              <Link href={`${base}/changelog`} className="hover:text-foreground">
                {labels.changelog}
              </Link>
            </div>
          </div>

          <div>
            <div className="font-medium text-foreground">Resources</div>
            <div className="mt-3 flex flex-col gap-2">
              <Link href={`${base}/docs`} className="hover:text-foreground">
                Documentation
              </Link>
              <Link
                href={`${base}/docs/api`}
                className="hover:text-foreground"
              >
                API Reference
              </Link>
              <Link href={`${base}/blog`} className="hover:text-foreground">
                Blog
              </Link>
            </div>
          </div>

          <div>
            <div className="font-medium text-foreground">Company</div>
            <div className="mt-3 flex flex-col gap-2">
              <Link href={`${base}/about`} className="hover:text-foreground">
                {labels.about}
              </Link>
              <Link href={`${base}/contact`} className="hover:text-foreground">
                {labels.contact}
              </Link>
              <Link href={`${base}/privacy`} className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href={`${base}/terms`} className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6 text-xs dark:border-white/10">
          © {new Date().getFullYear()} APIPod (Mock). All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
