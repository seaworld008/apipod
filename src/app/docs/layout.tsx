import { DocsLayout } from "@/features/docs/docs-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout locale="en">{children}</DocsLayout>;
}

