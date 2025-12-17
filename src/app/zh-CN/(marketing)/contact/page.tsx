import { Container } from "@/components/container";

export default function ContactPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">联系我们（Mock）</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        用于对齐联系页信息结构：主邮箱、支持类型卡片、退款提醒、FAQ 与企业咨询入口。
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
        <div className="font-medium">本页目录</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            ["#support", "支持类型"],
            ["#faq", "常见问题"],
            ["#enterprise", "企业咨询"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-foreground/70 hover:text-foreground hover:underline">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="text-sm font-medium text-foreground/70">主要联系邮箱</div>
        <a className="mt-2 inline-block text-lg font-semibold hover:underline" href="mailto:api@apipod.ai">
          api@apipod.ai
        </a>
        <p className="mt-2 text-sm text-foreground/70">
          Mock：建议附上账号邮箱/请求 ID/复现步骤等信息以便快速处理。
        </p>
      </div>

      <div id="support" className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { title: "技术支持", desc: "接入问题、错误排查、用量咨询", eta: "24 小时内（工作日）" },
          { title: "计费与退款", desc: "支付问题、发票、未使用额度退款", eta: "48 小时内（工作日）" },
          { title: "一般咨询", desc: "合作、需求、反馈", eta: "3-5 个工作日" },
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
          <h2 className="text-lg font-semibold">退款提醒</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Mock：此处用于展示退款所需信息清单（原站可能来自 i18n/配置）。
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70">
            {["账号邮箱", "退款原因", "未使用额度金额"].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">常见问题</h2>
          <div className="mt-4 space-y-3 text-sm text-foreground/70">
            <div>
              <div className="font-medium text-foreground">多久能收到回复？</div>
              <div className="mt-1">Mock：不同类型问题响应时间不同。</div>
            </div>
            <div>
              <div className="font-medium text-foreground">需要提供哪些信息？</div>
              <div className="mt-1">Mock：账号邮箱、错误信息、请求 ID、复现步骤。</div>
            </div>
          </div>
        </div>
      </div>

      <div id="enterprise" className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">企业方案</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Mock：定制 SLA、专属通道、私有化部署、批量折扣等。
        </p>
        <a
          className="mt-4 inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
          href="mailto:api@apipod.ai?subject=Enterprise%20Inquiry"
        >
          联系企业销售
        </a>
      </div>
    </Container>
  );
}
