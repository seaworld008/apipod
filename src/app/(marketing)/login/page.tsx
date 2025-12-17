import Link from "next/link";
import { Container } from "@/components/container";

export default function LoginPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Log in (Mock)</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        登录/注册与控制台通常依赖后端，这里仅实现页面骨架与跳转。
      </p>
      <div className="mt-8 max-w-md rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="h-10 rounded-md bg-black/5 dark:bg-white/10" />
        <div className="mt-3 h-10 rounded-md bg-black/5 dark:bg-white/10" />
        <div className="mt-6 h-10 rounded-md bg-foreground" />
        <div className="mt-4 text-sm text-foreground/70">
          No account?{" "}
          <Link className="underline" href="/register">
            Create one
          </Link>
        </div>
      </div>
    </Container>
  );
}

