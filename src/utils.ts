import { z } from "zod";

//1. DATA SCHEMA FROM SUPABASE

//taskSchema describing structure of a single task in database
export const taskSchema = z.object({
  id: z.coerce.number(),
  text: z.coerce.string(),
  completed: z.coerce.boolean(),
});

export const tasksSchema = z.array(taskSchema); //table of tasks

export type Task = z.infer<typeof taskSchema>; //type of TypeScript generated from Zod

//2. FORM SCHEMA - TEXT WRITTEN IN INPUT

//TaskFormSchema - scheme for addNewTask form
export const taskFormSchema = z.object({
  task: z.coerce.string().min(1, "Pole nie może być puste"),
});

export type TaskFormData = z.infer<typeof taskFormSchema>; //type TS for form

//3. TYPE FOR TaskService
export type TasksService = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeAllTasks: () => Promise<void>;
};
