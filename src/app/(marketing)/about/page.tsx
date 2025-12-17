import { Container } from "@/components/container";

export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="text-sm font-medium text-foreground/70">
        Building the Future of AI Access (Mock)
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        One API, All AI Models
      </h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        该页面用于对齐“关于我们”的信息结构与区块布局；正文与数据可后续接入真实来源。
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
          <div className="font-medium">On this page</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["#stats", "Key stats"],
              ["#mission", "Our mission"],
              ["#values", "Core values"],
              ["#stack", "Technology stack"],
              ["#philosophy", "Our philosophy"],
              ["#ready", "Ready to build"],
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
                { k: "Uptime SLA", v: "99.9%" },
                { k: "Average Latency", v: "<100ms" },
                { k: "AI Models Supported", v: "50+" },
                { k: "Daily API Requests", v: "10M+" },
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
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：通过统一网关与智能路由，让开发者以更低成本获得稳定可控的 AI 能力。
            </p>
          </section>

          <section id="values">
            <h2 className="text-xl font-semibold">Core Values</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Reliability First",
                  body: "Mock：多渠道路由 + 熔断保护。",
                },
                {
                  title: "Transparent Pricing",
                  body: "Mock：计费透明，便于成本预期。",
                },
                {
                  title: "Performance Obsessed",
                  body: "Mock：优先选择低延迟可用通道。",
                },
                {
                  title: "Developer-Centric",
                  body: "Mock：保持接口兼容，降低迁移成本。",
                },
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
            <h2 className="text-xl font-semibold">Technology Stack</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：后端、路由、可观测性、安全与审计等能力块占位。
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  title: "High-Performance Backend",
                  body: "Mock：高并发服务 + 缓存与持久化。",
                },
                {
                  title: "Intelligent Routing",
                  body: "Mock：round-robin / weighted / failover 等策略。",
                },
                {
                  title: "Full Observability",
                  body: "Mock：日志、指标、费用与用量分析。",
                },
                {
                  title: "Enterprise Security",
                  body: "Mock：鉴权、限流、TLS、审计。",
                },
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
            <h2 className="text-xl font-semibold">Our Philosophy</h2>
            <p className="mt-3 text-sm text-foreground/70">
              Mock：强调开放接口、稳定性优先与持续迭代。
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { t: "Open source first", d: "Mock：保持接口透明与可迁移。" },
                { t: "Customer success", d: "Mock：关注落地效果与交付体验。" },
                { t: "Continuous iteration", d: "Mock：快速反馈与持续优化。" },
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
              <div className="text-lg font-semibold">Ready to build with APIPod?</div>
              <div className="mt-2 text-sm text-foreground/70">
                Mock：底部 CTA 区块占位。
              </div>
              <div className="mt-6">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
                  href="/contact"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
    </Container>
  );
}
