"use client";

import { useTheme } from "next-themes";

export function DocsThemeButtons() {
  const { theme, setTheme } = useTheme();
  const active = theme ?? "system";

  const btn = (key: "light" | "dark" | "system") => (
    <button
      key={key}
      type="button"
      onClick={() => setTheme(key)}
      className={[
        "h-9 rounded-md px-3 text-sm",
        active === key
          ? "bg-black/5 text-foreground dark:bg-white/10"
          : "text-foreground/70 hover:text-foreground",
      ].join(" ")}
    >
      {key}
    </button>
  );

  return <div className="flex items-center gap-1">{["light", "dark", "system"].map((x) => btn(x as never))}</div>;
}

