import type { TaskCategoryClassifier } from "./types";
import { classifyTaskCategoryResponseSchema } from "./schemas";

export const apiTaskCategoryClassifier: TaskCategoryClassifier = {
  classify: async (text) => {
    const response = await fetch("/api/classify-task-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to classify task category");
    }

    const data = await response.json();

    const result = classifyTaskCategoryResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error("Wrong AI category response format");
    }

    return result.data.category;
  },
};