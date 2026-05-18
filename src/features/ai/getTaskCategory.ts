import type { TaskCategory } from "../tasks/types";
import { taskCategorySchema } from "../tasks/types";
import { aiProvider } from "./config";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";
import { openAITaskCategoryClassifier } from "./openAITaskCategoryClassifier";

const classifier =
  aiProvider === "openai"
    ? openAITaskCategoryClassifier
    : mockTaskCategoryClassifier;

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  const category = await classifier.classify(text);

  const result = taskCategorySchema.safeParse(category);

  if (!result.success) {
    return "other";
  }

  return result.data;
}