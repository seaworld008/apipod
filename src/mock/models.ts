export type ModelCapability =
  | "LLM text"
  | "Text to image"
  | "Image to image"
  | "Text to video"
  | "Image to video"
  | "Video enhancement"
  | "With Audio";

export type ModelVariant = {
  slug: string;
  modelId: string;
  name: string;
  pricePerRequestUsd: number;
  contextTokens?: number;
  maxOutputTokens?: number;
  inputTypes: string[];
  outputTypes: string[];
  description: string;
};

export type ModelSeries = {
  slug: string;
  name: string;
  provider: string;
  capabilities: ModelCapability[];
  tags: string[];
  description: string;
  variants: ModelVariant[];
};

const data: ModelSeries[] = [
  {
    slug: "nano-banana",
    name: "Nano Banana",
    provider: "Google",
    capabilities: ["Text to image", "Image to image"],
    tags: ["Multimodality", "Image Editing"],
    description:
      "示例模型：用于演示图像生成/编辑的卡片布局与详情页结构（Mock 文案）。",
    variants: [
      {
        slug: "nano-banana-pro",
        modelId: "nano-banana-pro",
        name: "Nano Banana Pro (Mock)",
        pricePerRequestUsd: 0.2,
        contextTokens: 66000,
        maxOutputTokens: 33000,
        inputTypes: ["text", "image"],
        outputTypes: ["image"],
        description:
          "示例 variant：展示 Copy Model ID、价格、上下文等字段（Mock 文案）。",
      },
    ],
  },
  {
    slug: "veo3-1",
    name: "Veo 3.1",
    provider: "Google",
    capabilities: ["Text to video", "Image to video", "Video enhancement", "With Audio"],
    tags: ["With Audio", "Frame Interpolation", "Video Extension"],
    description:
      "示例模型：用于演示视频模型系列页与多 variant 路由（Mock 文案）。",
    variants: [
      {
        slug: "veo3-1-fast-ref",
        modelId: "veo3-1-fast-ref",
        name: "Veo 3.1 Fast Ref (Mock)",
        pricePerRequestUsd: 0.08,
        inputTypes: ["text", "image"],
        outputTypes: ["video"],
        description: "快速参考版（Mock）。",
      },
      {
        slug: "veo3-1-quality",
        modelId: "veo3-1-quality",
        name: "Veo 3.1 Quality (Mock)",
        pricePerRequestUsd: 0.12,
        inputTypes: ["text", "image"],
        outputTypes: ["video"],
        description: "质量优先版（Mock）。",
      },
      {
        slug: "veo3-1-fast",
        modelId: "veo3-1-fast",
        name: "Veo 3.1 Fast (Mock)",
        pricePerRequestUsd: 0.06,
        inputTypes: ["text", "image"],
        outputTypes: ["video"],
        description: "极速版（Mock）。",
      },
    ],
  },
  {
    slug: "seedream-v4.5",
    name: "Seedream V4.5",
    provider: "Bytedance",
    capabilities: ["Text to image", "Image to image"],
    tags: ["Production Ready", "4k Output"],
    description: "示例模型：用于演示编辑/生成两个 API 入口（Mock 文案）。",
    variants: [
      {
        slug: "seedream-v4.5",
        modelId: "seedream-v4.5",
        name: "Seedream V4.5 Generate (Mock)",
        pricePerRequestUsd: 0.025,
        inputTypes: ["text", "image"],
        outputTypes: ["image"],
        description: "生成接口（Mock）。",
      },
      {
        slug: "seedream-v4.5-edit",
        modelId: "seedream-v4.5-edit",
        name: "Seedream V4.5 Edit (Mock)",
        pricePerRequestUsd: 0.03,
        inputTypes: ["text", "image"],
        outputTypes: ["image"],
        description: "编辑接口（Mock）。",
      },
    ],
  },
  {
    slug: "sora-2",
    name: "Sora 2",
    provider: "OPENAI",
    capabilities: ["Text to video", "Image to video"],
    tags: ["Cinematic", "Control"],
    description: "示例模型：用于演示系列 slug 与 variant slug 相同的情况（Mock）。",
    variants: [
      {
        slug: "sora-2",
        modelId: "sora-2",
        name: "Sora 2 (Mock)",
        pricePerRequestUsd: 0.03,
        inputTypes: ["text", "image"],
        outputTypes: ["video"],
        description: "单一 variant（Mock）。",
      },
    ],
  },
  {
    slug: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    provider: "anthropic",
    capabilities: ["LLM text"],
    tags: ["Reasoning", "Long Context"],
    description: "示例模型：用于演示文本模型（Mock）。",
    variants: [],
  },
  {
    slug: "gpt-5.2-codex",
    name: "GPT-5.2 Codex",
    provider: "OPENAI",
    capabilities: ["LLM text"],
    tags: ["Coding", "Agent First"],
    description: "示例模型：用于演示 Codex 系列（Mock）。",
    variants: [],
  },
  {
    slug: "gpt-5.2",
    name: "GPT-5.2",
    provider: "OPENAI",
    capabilities: ["LLM text"],
    tags: ["Reasoning", "Response speed"],
    description: "示例模型：用于演示文本模型系列页（Mock）。",
    variants: [],
  },
  {
    slug: "gpt-5.1",
    name: "GPT-5.1",
    provider: "OPENAI",
    capabilities: ["LLM text"],
    tags: ["Reasoning"],
    description: "示例模型：用于演示文本模型系列页（Mock）。",
    variants: [],
  },
  {
    slug: "gemini-3",
    name: "Gemini 3",
    provider: "Google",
    capabilities: ["LLM text"],
    tags: ["Multimodal reasoning", "Agent First", "Code Execution"],
    description: "示例模型：用于演示多能力标签（Mock）。",
    variants: [],
  },
  {
    slug: "gpt-5",
    name: "GPT-5",
    provider: "OPENAI",
    capabilities: ["LLM text"],
    tags: ["Reasoning"],
    description: "示例模型：用于演示文本模型系列页（Mock）。",
    variants: [],
  },
  {
    slug: "gpt-4o",
    name: "GPT-4o",
    provider: "OPENAI",
    capabilities: ["LLM text"],
    tags: ["Multimodality", "Response speed", "Multilingual ability"],
    description: "示例模型：用于演示多语言/多模态标签（Mock）。",
    variants: [],
  },
];

export async function getModelSeriesList() {
  return data;
}

export async function getModelSeries(slug: string) {
  return data.find((x) => x.slug === slug) ?? null;
}

export async function getModelVariant(seriesSlug: string, variantSlug: string) {
  const series = await getModelSeries(seriesSlug);
  if (!series) return null;
  return series.variants.find((v) => v.slug === variantSlug) ?? null;
}

export async function getFeaturedModels() {
  return data.slice(0, 8);
}
