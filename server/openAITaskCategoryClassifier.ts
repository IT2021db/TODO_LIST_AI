import type { TaskCategoryClassifier } from "./types";

export const openAITaskCategoryClassifier: TaskCategoryClassifier = {
  classify: async () => {
    throw new Error("OpenAI classifier is not implemented yet");
  },
};