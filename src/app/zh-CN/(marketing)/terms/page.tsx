import { Container } from "@/components/container";

export default function TermsPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">服务条款（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        法律条款页面占位符：请在获得授权后填充正式内容。
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
          <div className="font-medium">本页目录</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["#acceptance", "条款接受"],
              ["#service", "服务说明"],
              ["#usage", "使用规则"],
              ["#billing", "计费与支付"],
              ["#security", "账户安全"],
              ["#ip", "知识产权"],
              ["#contact", "联系方式"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-foreground/70 hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          {[
            ["acceptance", "条款接受"],
            ["service", "服务说明"],
            ["usage", "使用规则"],
            ["billing", "计费与支付"],
            ["security", "账户安全"],
            ["ip", "知识产权"],
            ["contact", "联系方式"],
          ].map(([id, title]) => (
            <div
              key={id}
              id={id}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-2 text-sm text-foreground/70">
                占位内容（Mock）：待获得授权后替换为正式条款文本。
              </div>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}
