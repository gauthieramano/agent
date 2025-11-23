/**
 * ### Frontier models
 * OpenAI's most advanced models, recommended for most tasks
 */
export const MODELS = {
  "GPT-5.1": "gpt-5.1-2025-11-13",
  "GPT-5 mini": "gpt-5-mini-2025-08-07",
  "GPT-5 nano": "gpt-5-nano-2025-08-07",
  "GPT-5 pro": "gpt-5-pro-2025-10-06",
  "GPT-5": "gpt-5-2025-08-07",
  "GPT-4.1": "gpt-4.1-2025-04-14",
} as const;

export type ModelName = keyof typeof MODELS;

export const MODEL_NAMES = Object.keys(MODELS) as ModelName[];
