import OpenAI from "openai";
import type { TaskCategoryClassifier } from "./types";
import { taskCategoryPrompt } from "./taskCategoryPrompt";
import { taskCategorySchema } from "./schemas";

export const openAITaskCategoryClassifier: TaskCategoryClassifier = {
  classify: async (text) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: taskCategoryPrompt,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0,
    });

    const category = response.choices[0]?.message?.content?.trim();

    const result = taskCategorySchema.safeParse(category);

    if (!result.success) {
      return "other";
    }

    return result.data;
  },
};