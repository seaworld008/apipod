import Link from "next/link";
import { Container } from "@/components/container";

export default function RegisterPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">免费开始（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        注册页面占位符：后续可对接真实认证与计费系统。
      </p>
      <div className="mt-8 max-w-md rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <div className="h-10 rounded-md bg-black/5 dark:bg-white/10" />
        <div className="mt-3 h-10 rounded-md bg-black/5 dark:bg-white/10" />
        <div className="mt-3 h-10 rounded-md bg-black/5 dark:bg-white/10" />
        <div className="mt-6 h-10 rounded-md bg-foreground" />
        <div className="mt-4 text-sm text-foreground/70">
          已有账号？{" "}
          <Link className="underline" href="/zh-CN/login">
            去登录
          </Link>
        </div>
      </div>
    </Container>
  );
}

