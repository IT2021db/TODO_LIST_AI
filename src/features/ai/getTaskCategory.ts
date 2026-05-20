import type { TaskCategory } from "../tasks/types";
import { taskCategorySchema } from "../tasks/types";
import { aiProvider } from "./config";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";
import { apiTaskCategoryClassifier } from "./apiTasksCategoryClassifier";

const classifier =
  aiProvider === "api" ? apiTaskCategoryClassifier : mockTaskCategoryClassifier;

  console.log("AI PROVIDER:", aiProvider);

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  try {
    const category = await classifier.classify(text);

    const result = taskCategorySchema.safeParse(category);

    if (!result.success) {
      return "other";
    }

    return result.data;
  } catch (error) {
    console.error("Task category classification failed:", error);
    return "other";
  }
}