import { supabase } from "./lib/supabase";
import {
  tasksSchema,
  Task,
  CreateTaskInput,
  ToggleTaskInput,
  DeleteTaskInput,
} from "./types";

// Fetch all tasks
export async function fetchTasksFromSupabase(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, text, completed")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const result = tasksSchema.safeParse(data);
  console.log("result in TaskService: ", result);
  if (!result.success) throw new Error("Wrong data format from Supabase");

  return result.data;
}

// Add new task
export const addTaskToSupabase = async ({ text }: CreateTaskInput) => {
  const { error } = await supabase
    .from("tasks")
    .insert({ text, completed: false, created_at: new Date().toISOString() });
    
  console.log("dodany task w AddTasksService/addTask : ", { text });
  if (error) throw new Error(error.message);
};

// Toggle task
export async function toggleTaskInSupabase(data: ToggleTaskInput) {
  const { error } = await supabase
    .from("tasks")
    .update({ completed: data.completed })
    .eq("id", data.id);

  if (error) throw new Error(error.message);
}

// Complete all tasks
export async function completeAllTasksInSupabase() {
  const { error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("completed", false);

  if (error) throw new Error(error.message);
}

// Delete task
export async function deleteTaskFromSupabase(data: DeleteTaskInput) {
  const { error } = await supabase.from("tasks").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
}
