export type AIProvider = "mock" | "openai";

export const aiProvider: AIProvider =
  import.meta.env.VITE_AI_PROVIDER === "openai" ? "openai" : "mock";