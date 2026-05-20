export type AIProvider = "mock" | "api";

export const aiProvider: AIProvider =
  import.meta.env.VITE_AI_PROVIDER === "api" ? "api" : "mock";