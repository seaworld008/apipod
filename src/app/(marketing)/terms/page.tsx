import { Container } from "@/components/container";

export default function TermsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Terms of Service (Mock)
      </h1>
      <p className="mt-3 max-w-prose text-foreground/70">
        法律条款页面占位符：请在获得授权后填充正式内容。
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/10">
          <div className="font-medium">On this page</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["#acceptance", "Acceptance of Terms"],
              ["#service", "Service Description"],
              ["#usage", "API Usage Rules"],
              ["#billing", "Billing and Payments"],
              ["#security", "Account Security"],
              ["#ip", "Intellectual Property"],
              ["#contact", "Contact Information"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-foreground/70 hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          {[
            ["acceptance", "Acceptance of Terms"],
            ["service", "Service Description"],
            ["usage", "API Usage Rules"],
            ["billing", "Billing and Payments"],
            ["security", "Account Security"],
            ["ip", "Intellectual Property"],
            ["contact", "Contact Information"],
          ].map(([id, title]) => (
            <div key={id} id={id} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-2 text-sm text-foreground/70">
                Placeholder section (Mock). Replace with the real Terms content when authorized.
              </div>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}
