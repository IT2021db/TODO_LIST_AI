import { z } from "zod";
import { taskCategorySchema } from "../tasks/types";

export const classifyTaskCategoryRequestSchema = z.object({
  text: z.string().min(1),
});

export type ClassifyTaskCategoryRequest = z.infer<
  typeof classifyTaskCategoryRequestSchema
>;

export const classifyTaskCategoryResponseSchema = z.object({
  category: taskCategorySchema,
});

export type ClassifyTaskCategoryResponse = z.infer<
  typeof classifyTaskCategoryResponseSchema
>;