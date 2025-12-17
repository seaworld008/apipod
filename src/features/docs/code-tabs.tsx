"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";

type OverviewTabKey = "Python" | "Node.js" | "cURL";
type ApiTabKey = "cURL" | "Python" | "JavaScript" | "Go" | "Java";
type TabKey = OverviewTabKey | ApiTabKey;

export function CodeTabs({
  locale,
  variant = "overview",
  endpointPath,
}: {
  locale: "en" | "zh-CN";
  variant?: "overview" | "api";
  endpointPath?: string;
}) {
  const tabs = useMemo(
    () =>
      (variant === "api"
        ? (["cURL", "Python", "JavaScript", "Go", "Java"] as const)
        : (["Python", "Node.js", "cURL"] as const)) satisfies readonly TabKey[],
    [variant],
  );
  const [active, setActive] = useState<TabKey>(tabs[0] || "Python");

  const code = useMemo(() => {
    const baseUrl = "https://api.example.com";
    const path = endpointPath || "/v1/chat/completions";
    const url = `${baseUrl}${path}`;
    if (active === "Python") {
      return [
        "import openai",
        "",
        'client = openai.OpenAI(base_url="' + baseUrl + '/v1", api_key="your-api-key")',
        "",
        "# Example request (Mock)",
        'response = client.chat.completions.create(model="gpt-4o", messages=[{"role":"user","content":"Hello"}])',
        "print(response.choices[0].message.content)",
      ].join("\n");
    }
    if (active === "Node.js") {
      return [
        'import OpenAI from "openai";',
        "",
        `const client = new OpenAI({ baseURL: \"${baseUrl}/v1\", apiKey: process.env.APIPOD_KEY });`,
        "",
        "const res = await client.chat.completions.create({",
        '  model: "gpt-4o",',
        '  messages: [{ role: "user", content: "Hello" }],',
        "});",
        "console.log(res.choices[0].message.content);",
      ].join("\n");
    }
    if (active === "JavaScript") {
      return [
        "import OpenAI from \"openai\";",
        "",
        `const client = new OpenAI({ baseURL: \"${baseUrl}/v1\", apiKey: process.env.APIPOD_KEY });`,
        "",
        "const res = await client.chat.completions.create({",
        "  model: \"gpt-4o\",",
        "  messages: [{ role: \"user\", content: \"Hello\" }],",
        "});",
        "console.log(res.choices[0].message.content);",
      ].join("\n");
    }
    if (active === "Go") {
      return [
        "package main",
        "",
        "import (",
        "  \"bytes\"",
        "  \"net/http\"",
        ")",
        "",
        "func main() {",
        "  body := []byte(`{\"model\":\"gpt-4o\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}`)",
        `  req, _ := http.NewRequest(\"POST\", \"${url}\", bytes.NewBuffer(body))`,
        "  req.Header.Set(\"Authorization\", \"Bearer <token>\")",
        "  req.Header.Set(\"Content-Type\", \"application/json\")",
        "  http.DefaultClient.Do(req)",
        "}",
      ].join("\n");
    }
    if (active === "Java") {
      return [
        "import java.net.http.*;",
        "import java.net.URI;",
        "",
        "public class Main {",
        "  public static void main(String[] args) throws Exception {",
        "    var body = \"{\\\"model\\\":\\\"gpt-4o\\\",\\\"messages\\\":[{\\\"role\\\":\\\"user\\\",\\\"content\\\":\\\"Hello\\\"}]}\";",
        `    var req = HttpRequest.newBuilder(URI.create(\"${url}\"))`,
        "      .header(\"Authorization\", \"Bearer <token>\")",
        "      .header(\"Content-Type\", \"application/json\")",
        "      .POST(HttpRequest.BodyPublishers.ofString(body))",
        "      .build();",
        "    HttpClient.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString());",
        "  }",
        "}",
      ].join("\n");
    }
    return [
      `curl --request POST \\`,
      `  --url \"${url}\" \\`,
      "  -H \"Authorization: Bearer $APIPOD_KEY\" \\",
      "  -H \"Content-Type: application/json\" \\",
      "  -d '{\"model\":\"gpt-4o\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    ].join("\n");
  }, [active, endpointPath]);

  const copyLabel = locale === "zh-CN" ? "复制代码" : "Copy Text";

  return (
    <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
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
        <CopyButton value={code} label={copyLabel} />
      </div>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs text-foreground/80 dark:bg-white/10">
        {code}
      </pre>
    </div>
  );
}
