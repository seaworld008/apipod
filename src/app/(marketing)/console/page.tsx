import { Container } from "@/components/container";

export default function ConsolePage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard (Mock)</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        控制台通常依赖登录态与后端数据；这里提供占位页，便于对齐导航与后续接入。
      </p>
    </Container>
  );
}

