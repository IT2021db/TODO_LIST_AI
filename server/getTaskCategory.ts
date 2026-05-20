import type { TaskCategory } from "./types";
import { serverAIProvider } from "./config";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";
import { openAITaskCategoryClassifier } from "./openAITaskCategoryClassifier";
import { taskCategorySchema } from "./schemas";

const classifier =
  serverAIProvider === "openai"
    ? openAITaskCategoryClassifier
    : mockTaskCategoryClassifier;

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  try {
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