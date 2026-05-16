import type { TaskCategory } from "../tasks/types";
import { classifyTaskCategory } from "./classifyTaskCategory";

export async function getTaskCategory(text: string): Promise<TaskCategory> {
  return classifyTaskCategory(text);
}
