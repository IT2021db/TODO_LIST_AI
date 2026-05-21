import type { TaskCategory } from "./types";
import { serverAIProvider } from "./config";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";
import { openAITaskCategoryClassifier } from "./openAITaskCategoryClassifier";
import { taskCategorySchema } from "./schemas";

const classifier =
  serverAIProvider === "openai"
    ? openAITaskCategoryClassifier
    : mockTaskCategoryClassifier;

console.log("SERVER AI PROVIDER:", serverAIProvider);

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  try {
    console.log("SERVER AI PROVIDER:", serverAIProvider);
    console.log("TEXT TO CLASSIFY:", text);

    const category = await classifier.classify(text);

    const result = taskCategorySchema.safeParse(category);

    if (!result.success) {
      return "other";
    }

    return result.data;
  } catch (error) {
    console.error("Backend category classification failed:", error);
    return "other";
  }
}
