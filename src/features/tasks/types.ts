import { z } from "zod";
import { RemoteData } from "../../lib/remoteData";

export const taskCategorySchema = z.enum([
  "work",
  "personal",
  "health",
  "priority",
  "other",
]);

export type TaskCategory =
  z.infer<typeof taskCategorySchema>;

//1- ZOD SCHEMA FOR TASK
export const taskSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
  category: taskCategorySchema,
});

export const tasksSchema = z.array(taskSchema); //table of tasks -> Task[]

export type Task = z.infer<typeof taskSchema>;
// TypeScript automatomatically create type:
// type Task = {
//   id: number;
//   text: string;
//   completed: boolean;
// };

//2- ZOD SCHEMA FOR FORM
export const taskFormSchema = taskSchema.pick({
  text: true,
  category: true,
});

export type AddTaskFormData = z.infer<typeof taskFormSchema>;

//3-API DTOs
export const createTaskSchema = taskSchema.pick({
  text: true,
  category: true,
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const toggleTaskSchema = taskSchema.pick({
  id: true,
  completed: true,
});

export type ToggleTaskInput = z.infer<typeof toggleTaskSchema>;

export const deleteTaskSchema = taskSchema.pick({
  id: true,
});

export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

//4. TYPE FOR TaskService
export type TasksService = {
  tasks: RemoteData<Task[]>;
  addTask: (text: AddTaskFormData) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeAllTasks: () => Promise<void>;
};
