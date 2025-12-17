import { Container } from "@/components/container";

export default function PricingPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing (Mock)</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        用于对齐套餐卡片与“功能对比”表格结构；具体价格/权益后续由真实后端驱动。
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Monthly
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-full border border-black/10 px-3 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Yearly
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "Free",
            note: "For personal & prototyping",
            badge: "",
            ctaHref: "/auth/register",
            ctaLabel: "Get started",
          },
          {
            name: "Growth",
            price: "$49/mo",
            note: "Recommended for teams",
            badge: "Recommended",
            ctaHref: "/auth/register",
            ctaLabel: "Start for free",
          },
          {
            name: "Enterprise",
            price: "Contact",
            note: "Custom contract & SLA",
            badge: "",
            ctaHref: "mailto:hello@apipod.ai",
            ctaLabel: "Contact us",
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

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Compare</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-black/[0.02] text-xs text-foreground/70 dark:bg-white/[0.06]">
            <tr>
              <th className="px-4 py-3">Capability</th>
              <th className="px-4 py-3">Starter</th>
              <th className="px-4 py-3">Growth</th>
              <th className="px-4 py-3">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Multi-channel routing",
              "Health monitoring",
              "Rate limit & quota",
              "Team & SSO",
              "Billing & invoice",
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
        <div className="text-lg font-semibold">Need a custom plan?</div>
        <div className="mt-2 text-sm text-foreground/70">
          Mock：对齐底部 CTA 区块的按钮与布局。
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-500"
          >
            Contact us
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Schedule a call
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
