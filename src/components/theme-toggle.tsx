"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <select
      aria-label="Theme"
      className="h-9 rounded-md border border-black/10 bg-transparent px-2 text-sm text-foreground dark:border-white/15"
      value={theme ?? "system"}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">light</option>
      <option value="dark">dark</option>
      <option value="system">system</option>
    </select>
  );
}

