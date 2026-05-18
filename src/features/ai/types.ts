import type { TaskCategory } from "../tasks/types";

export type TaskCategoryClassifier = {
  classify: (text: string) => Promise<TaskCategory>;
};