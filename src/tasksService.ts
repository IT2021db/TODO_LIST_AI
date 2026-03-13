// tasksService.ts
import { supabase } from "./lib/supabase";
import { Task, tasksSchema } from "./utils";

// Fetch all tasks
export async function fetchTasksFromSupabase(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, text, completed")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const result = tasksSchema.safeParse(data);
  console.log(
    "result w TaskService, a w nim zadania pobrane z supabase",
    result,
  );
  if (!result.success) throw new Error("Wrong data format from Supabase");

  return result.data;
}

// Add new task
export async function addTaskToSupabase(task: string) {
  const { error } = await supabase
    .from("tasks")
    .insert([
      { text: task, completed: false, created_at: new Date().toISOString() },
    ]);
  console.log("dodany task w tasksService", task);
  if (error) throw new Error(error.message);
}

// Toggle task
export async function toggleTaskInSupabase(id: number, completed: boolean) {
  const { error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", id);

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
export async function deleteTaskFromSupabase(id: number) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
