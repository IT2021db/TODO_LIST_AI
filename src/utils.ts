import { z } from "zod";

//1. DATA SCHEMA FROM SUPABASE

//taskSchema describing structure of a single task in database
export const taskSchema = z.object({
  id: z.coerce.number(),
  text: z.coerce.string(),
  completed: z.coerce.boolean(),
});

export const tasksSchema = z.array(taskSchema); //table of tasks Task[]

export type Task = z.infer<typeof taskSchema>; //type of TypeScript generated from Zod
// TypeScript automatomatically create type:
// type Task = {
//   id: string;
//   text: string;
//   completed: boolean;
// };

//2. FORM SCHEMA - TEXT WRITTEN IN INPUT

//TaskFormSchema - scheme for addNewTask form
export const taskFormSchema = z.object({
  text: z.coerce.string(),
});

export type AddTaskFormData = z.infer<typeof taskFormSchema>; //type TS for form
//TS creates:type AddTaskFormData = {  text: string;}

//3. TYPE FOR TaskService
export type TasksService = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: number, isCompleted: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeAllTasks: () => Promise<void>;
};
