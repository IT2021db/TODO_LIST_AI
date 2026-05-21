export type ServerAIProvider = "mock" | "openai";

export const serverAIProvider: ServerAIProvider =
  process.env.SERVER_AI_PROVIDER === "openai" ? "openai" : "mock";