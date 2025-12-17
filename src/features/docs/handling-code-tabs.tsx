"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import type { Locale } from "@/lib/i18n";

export function HandlingCodeTabs({ locale }: { locale: Locale }) {
  const isZh = locale === "zh-CN";
  const tabs = useMemo(() => ["Python", "Node.js"] as const, []);
  const [active, setActive] = useState<(typeof tabs)[number]>("Python");

  const code = useMemo(() => {
    if (active === "Python") {
      return [
        "from openai import OpenAI, APIError, RateLimitError",
        "",
        "client = OpenAI(base_url=\"https://api.example.com/v1\", api_key=\"sk-your-api-key\")",
        "try:",
        "  client.chat.completions.create(model=\"gpt-4o\", messages=[{\"role\":\"user\",\"content\":\"Hello!\"}])",
        "except RateLimitError as e:",
        "  print(\"Rate limited\")",
        "except APIError as e:",
        "  print(\"API error\")",
      ].join("\n");
    }
    return [
      "import OpenAI from \"openai\";",
      "",
      "const client = new OpenAI({ baseURL: \"https://api.example.com/v1\", apiKey: process.env.APIPOD_API_KEY });",
      "try {",
      "  await client.chat.completions.create({ model: \"gpt-4o\", messages: [{ role: \"user\", content: \"Hello!\" }] });",
      "} catch (e) {",
      "  console.error(e);",
      "}",
    ].join("\n");
  }, [active]);

  return (
    <div className="mt-4 rounded-2xl border border-black/10 p-4 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={[
                "rounded-md px-3 py-2 text-sm",
                active === t
                  ? "bg-black/5 text-foreground dark:bg-white/10"
                  : "text-foreground/70 hover:text-foreground",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
        <CopyButton value={code} label={isZh ? "复制代码" : "Copy Text"} />
      </div>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs text-foreground/80 dark:bg-white/10">
        {code}
      </pre>
    </div>
  );
}

