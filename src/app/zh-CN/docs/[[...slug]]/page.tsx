import { DocPage } from "@/features/docs/doc-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <DocPage locale="zh-CN" slug={slug ?? []} />;
}
