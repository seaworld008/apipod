"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-9 items-center rounded-md border border-black/10 bg-transparent px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // ignore
        }
      }}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
