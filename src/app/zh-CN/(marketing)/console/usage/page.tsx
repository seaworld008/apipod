import { Container } from "@/components/container";

export default function UsagePage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Usage Dashboard（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        占位页：后续可接入用量统计、成本分析与告警。
      </p>
      <div className="mt-8 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="grid gap-3 md:grid-cols-3">
          {["请求数", "Tokens", "成本"].map((x) => (
            <div key={x} className="rounded-xl bg-black/5 p-4 dark:bg-white/10">
              <div className="text-xs text-foreground/60">{x}</div>
              <div className="mt-2 text-2xl font-semibold">—</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

