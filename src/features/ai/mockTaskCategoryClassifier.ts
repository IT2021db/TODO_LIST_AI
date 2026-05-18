import type { TaskCategoryClassifier } from "./types";
import { classifyTaskCategory } from "./classifyTaskCategory";

export const mockTaskCategoryClassifier: TaskCategoryClassifier = {
  classify: async (text) => {
    return classifyTaskCategory(text);
  },
};