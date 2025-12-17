import { Container } from "@/components/container";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Get in Touch (Mock)</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        用于对齐联系页信息结构：主邮箱、支持类型卡片、退款提醒、FAQ 与企业咨询入口。
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
        <div className="font-medium">On this page</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            ["#support", "Support"],
            ["#faq", "FAQ"],
            ["#enterprise", "Enterprise"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-foreground/70 hover:text-foreground hover:underline">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="text-sm font-medium text-foreground/70">Primary Contact Email</div>
        <a className="mt-2 inline-block text-lg font-semibold hover:underline" href="mailto:api@apipod.ai">
          api@apipod.ai
        </a>
        <p className="mt-2 text-sm text-foreground/70">
          Mock：请在邮件中附上账号邮箱/请求 ID/复现步骤等信息以便快速处理。
        </p>
      </div>

      <div id="support" className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { title: "Technical Support", desc: "API integration, errors, usage questions", eta: "Within 24 hours" },
          { title: "Billing & Refunds", desc: "Payment, invoice, refund for unused credits", eta: "Within 48 hours" },
          { title: "General Inquiries", desc: "Partnerships, feature requests, feedback", eta: "Within 3-5 days" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <div className="font-medium">{c.title}</div>
            <div className="mt-2 text-sm text-foreground/70">{c.desc}</div>
            <a className="mt-3 inline-block text-sm hover:underline" href="mailto:api@apipod.ai">
              api@apipod.ai
            </a>
            <div className="mt-2 text-xs text-foreground/60">{c.eta}</div>
          </div>
        ))}
      </div>

      <div id="faq" className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">Refund Policy Reminder</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Mock：此处用于展示退款所需信息清单（原站可能来自 i18n/配置）。
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70">
            {[
              "Your account email address",
              "Reason for refund request",
              "Amount of unused credits",
            ].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3 text-sm text-foreground/70">
            <div>
              <div className="font-medium text-foreground">How quickly will I receive a response?</div>
              <div className="mt-1">Mock：不同类型问题响应时间不同。</div>
            </div>
            <div>
              <div className="font-medium text-foreground">What information should I include?</div>
              <div className="mt-1">Mock：账号邮箱、错误信息、请求 ID、复现步骤。</div>
            </div>
          </div>
        </div>
      </div>

      <div id="enterprise" className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">Enterprise Solutions</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Mock：定制 SLA、专属通道、私有化部署、批量折扣等。
        </p>
        <a
          className="mt-4 inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
          href="mailto:api@apipod.ai?subject=Enterprise%20Inquiry"
        >
          Contact Enterprise Sales
        </a>
      </div>
    </Container>
  );
}
