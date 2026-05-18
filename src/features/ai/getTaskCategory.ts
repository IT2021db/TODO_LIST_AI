import type { TaskCategory } from "../tasks/types";
import { mockTaskCategoryClassifier } from "./mockTaskCategoryClassifier";

const classifier = mockTaskCategoryClassifier;

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  return classifier.classify(text);
}