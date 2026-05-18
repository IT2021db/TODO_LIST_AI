import type { TaskCategory } from "../tasks/types";
import { taskCategorySchema } from "../tasks/types";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";

const classifier = mockTaskCategoryClassifier;

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  const category = await classifier.classify(text);

  const result = taskCategorySchema.safeParse(category);

  if (!result.success) {
    return "other";
  }

  return result.data;
}