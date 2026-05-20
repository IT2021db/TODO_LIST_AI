export type ServerAIProvider = "mock" | "openai";

export const serverAIProvider: ServerAIProvider =
  process.env.OPENAI_API_KEY ? "openai" : "mock";