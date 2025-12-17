import { Container } from "@/components/container";

export default function ApiKeysPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Key 管理（Mock）
      </h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        示例：用于展示 API Key 列表、创建/禁用等交互（Mock）。
      </p>
      <div className="mt-8 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="h-10 w-40 rounded-md bg-foreground" />
        <div className="mt-6 space-y-2">
          <div className="h-10 rounded-md bg-black/5 dark:bg-white/10" />
          <div className="h-10 rounded-md bg-black/5 dark:bg-white/10" />
          <div className="h-10 rounded-md bg-black/5 dark:bg-white/10" />
        </div>
      </div>
    </Container>
  );
}

