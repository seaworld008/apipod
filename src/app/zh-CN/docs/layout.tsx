import { DocsLayout } from "@/features/docs/docs-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout locale="zh-CN">{children}</DocsLayout>;
}

