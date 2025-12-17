import { Container } from "@/components/container";

export default function PlaygroundPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Playground (Mock)</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        占位页：后续可接入真实在线调试台与请求回放。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          className="h-10 rounded-md border border-black/10 px-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
        >
          Create Session
        </button>
        <button
          type="button"
          className="h-10 rounded-md border border-black/10 px-4 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
        >
          Run Request
        </button>
      </div>
    </Container>
  );
}

