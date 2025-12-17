export type ChangelogItem = {
  id: string;
  date: string;
  title: string;
  items: string[];
};

const changelog: ChangelogItem[] = [
  {
    id: "2025-12-13-general-api",
    date: "2025-12-13",
    title: "General API",
    items: ["新增模型系列（Mock）", "优化路由与可观测性展示（Mock）"],
  },
];

export async function getChangelog() {
  return changelog;
}

