export type Locale = "en" | "zh-CN";

export function normalizeLocale(locale: string | undefined): Locale {
  return locale === "zh-CN" ? "zh-CN" : "en";
}

const dict = {
  en: {
    nav: {
      home: "Home",
      models: "Models",
      docs: "Docs",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      changelog: "Changelog",
      login: "Log in",
      start: "Start for free",
    },
    misc: {
      comingSoon: "Coming soon",
    },
  },
  "zh-CN": {
    nav: {
      home: "首页",
      models: "模型",
      docs: "文档",
      pricing: "定价",
      about: "关于我们",
      contact: "联系我们",
      changelog: "更新日志",
      login: "登录",
      start: "免费开始",
    },
    misc: {
      comingSoon: "敬请期待",
    },
  },
} as const;

export function t(locale: Locale) {
  return dict[locale];
}

