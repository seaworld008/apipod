import { Container } from "@/components/container";

export default function PrivacyPageZh() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">隐私政策（Mock）</h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        法律条款页面占位符：请在获得授权后填充正式内容。
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
          <div className="font-medium">本页目录</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["#overview", "概览"],
              ["#data", "我们收集的数据"],
              ["#use", "我们如何使用数据"],
              ["#share", "共享"],
              ["#security", "安全"],
              ["#contact", "联系我们"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-foreground/70 hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </aside>

        <section className="space-y-10">
          {[
            ["overview", "概览"],
            ["data", "我们收集的数据"],
            ["use", "我们如何使用数据"],
            ["share", "共享"],
            ["security", "安全"],
            ["contact", "联系我们"],
          ].map(([id, title]) => (
            <div
              key={id}
              id={id}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-2 text-sm text-foreground/70">
                占位内容（Mock）：待获得授权后替换为正式隐私政策文本。
              </div>
              {id === "overview" ? null : (
                <div className="mt-4">
                  <a className="text-sm text-foreground/70 hover:text-foreground" href="#overview">
                    返回顶部
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}

