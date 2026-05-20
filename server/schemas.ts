import { z } from "zod";
import { taskCategories } from "./types";

export const taskCategorySchema = z.enum(taskCategories);

export const classifyTaskCategoryRequestSchema = z.object({
  text: z.string().min(1),
});

export const classifyTaskCategoryResponseSchema = z.object({
  category: taskCategorySchema,
});