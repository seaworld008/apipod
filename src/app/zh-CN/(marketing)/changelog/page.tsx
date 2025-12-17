import { Container } from "@/components/container";
import { getChangelog } from "@/mock/site";

export default async function ChangelogPageZh() {
  const items = await getChangelog();
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">更新日志（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        用于展示更新条目结构；后续可接入真实数据源。
      </p>
      <div className="mt-10 space-y-8">
        {items.map((it) => (
          <div
            key={it.id}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            <div className="text-sm text-foreground/70">{it.date}</div>
            <div className="mt-1 text-lg font-medium">{it.title}</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70">
              {it.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}

