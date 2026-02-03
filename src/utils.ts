import { z } from "zod";

export type GetTasksReturn = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeAllTasks: () => Promise<void>;
};
//type of data from Supabase
export const taskSchema = z.object({
  id: z.coerce.number(),
  text: z.coerce.string(),
  completed: z.coerce.boolean(),
});

//type of TypeScript generated from Zod
export type Task = z.infer<typeof taskSchema>;
export const tasksSchema = z.array(taskSchema);
