import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayoutZh({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="zh-CN" />
      <main>{children}</main>
      <SiteFooter locale="zh-CN" />
    </div>
  );
}

