import { Container } from "@/components/container";

export default function AboutPageZh() {
  return (
    <Container className="py-12">
      <div className="text-sm font-medium text-foreground/70">
        构建更易用的 AI 接入方式（Mock）
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        一个 API，连接多种 AI 模型
      </h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        用于对齐“关于我们”的信息结构与区块布局；正文与数据可后续接入真实来源。
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
          <div className="font-medium">本页目录</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["#stats", "关键数据"],
              ["#mission", "我们的使命"],
              ["#values", "核心价值"],
              ["#stack", "技术栈"],
              ["#philosophy", "我们的理念"],
              ["#ready", "准备开始"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-foreground/70 hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </aside>

        <section className="space-y-12">
          <section id="stats">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "可用性 SLA", v: "99.9%" },
                { k: "平均延迟", v: "<100ms" },
                { k: "支持模型", v: "50+" },
                { k: "日请求量", v: "10M+" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <div className="text-2xl font-semibold">{x.v}</div>
                  <div className="mt-1 text-sm text-foreground/70">{x.k}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="mission">
            <h2 className="text-xl font-semibold">我们的使命</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：通过统一网关与智能路由，让开发者以更低成本获得稳定可控的 AI 能力。
            </p>
          </section>

          <section id="values">
            <h2 className="text-xl font-semibold">核心价值</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { title: "稳定性优先", body: "Mock：多渠道路由 + 熔断保护。" },
                { title: "计费透明", body: "Mock：可预期的成本与用量。" },
                { title: "性能导向", body: "Mock：优先选择低延迟可用通道。" },
                { title: "开发者体验", body: "Mock：保持接口兼容，降低迁移成本。" },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="mt-2 text-sm text-foreground/70">{s.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="stack">
            <h2 className="text-xl font-semibold">技术栈（Mock）</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：后端、路由、可观测性、安全与审计等能力块占位。
            </p>
            <div className="mt-4 space-y-4">
              {[
                { title: "高性能后端", body: "Mock：高并发服务 + 缓存与持久化。" },
                { title: "智能路由", body: "Mock：多种策略与自动降级。" },
                { title: "全链路可观测性", body: "Mock：日志、指标、费用与用量分析。" },
                { title: "企业安全", body: "Mock：鉴权、限流、TLS、审计。" },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="mt-2 text-sm text-foreground/70">{s.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="philosophy">
            <h2 className="text-xl font-semibold">我们的理念</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：强调开放接口、稳定性优先与持续迭代。
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { t: "开放优先", d: "Mock：保持接口透明与可迁移。" },
                { t: "客户成功", d: "Mock：关注落地效果与交付体验。" },
                { t: "持续迭代", d: "Mock：快速反馈与持续优化。" },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
                  <div className="font-medium">{x.t}</div>
                  <div className="mt-2 text-sm text-foreground/70">{x.d}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="ready">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-8 dark:border-violet-400/20 dark:bg-violet-400/[0.06]">
              <div className="text-lg font-semibold">准备开始构建？</div>
              <div className="mt-2 text-sm text-foreground/70">Mock：底部 CTA 区块占位。</div>
              <div className="mt-6">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
                  href="/zh-CN/contact"
                >
                  联系我们
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
    </Container>
  );
}
