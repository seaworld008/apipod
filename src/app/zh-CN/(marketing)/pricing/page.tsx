import { Container } from "@/components/container";

export default function PricingPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">定价（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        用于对齐套餐卡片与“功能对比”表格结构；具体价格/权益后续由真实后端驱动。
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          按月
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          按年
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "免费",
            note: "个人/概念验证",
            badge: "",
            ctaHref: "/zh-CN/auth/register",
            ctaLabel: "立即开始",
          },
          {
            name: "Growth",
            price: "¥49/月",
            note: "推荐团队使用",
            badge: "推荐",
            ctaHref: "/zh-CN/auth/register",
            ctaLabel: "免费开始",
          },
          {
            name: "Enterprise",
            price: "联系销售",
            note: "定制合约与 SLA",
            badge: "",
            ctaHref: "mailto:hello@apipod.ai",
            ctaLabel: "联系咨询",
          },
        ].map((p) => (
          <div
            key={p.name}
            className="relative rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            {p.badge ? (
              <div className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                {p.badge}
              </div>
            ) : null}
            <div className="text-sm font-medium text-foreground/70">{p.name}</div>
            <div className="mt-2 text-3xl font-semibold">{p.price}</div>
            <div className="mt-2 text-sm text-foreground/70">{p.note}</div>
            <div className="mt-6 h-10 rounded-md bg-black/5 dark:bg-white/10" />
            <div className="mt-6">
              <a
                href={p.ctaHref}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
              >
                {p.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">功能对比</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-black/[0.02] text-xs text-foreground/70 dark:bg-white/[0.06]">
            <tr>
              <th className="px-4 py-3">能力</th>
              <th className="px-4 py-3">Starter</th>
              <th className="px-4 py-3">Growth</th>
              <th className="px-4 py-3">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {[
              "多渠道路由策略",
              "模型健康实时监控",
              "限流与配额",
              "团队协作 & SSO",
              "账单与发票",
            ].map((c) => (
              <tr key={c} className="border-t border-black/10 dark:border-white/10">
                <td className="px-4 py-3">{c}</td>
                <td className="px-4 py-3 text-foreground/70">—</td>
                <td className="px-4 py-3 text-foreground/70">—</td>
                <td className="px-4 py-3 text-foreground/70">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-8 dark:border-violet-400/20 dark:bg-violet-400/[0.06]">
        <div className="text-lg font-semibold">需要定制套餐？</div>
        <div className="mt-2 text-sm text-foreground/70">
          Mock：对齐底部 CTA 区块的按钮与布局。
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-500"
          >
            联系我们
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            预约沟通
          </button>
        </div>
        <div className="mt-4 text-sm">
          <a className="underline hover:text-foreground" href="mailto:hello@apipod.ai">
            hello@apipod.ai
          </a>
        </div>
      </div>
    </Container>
  );
}
