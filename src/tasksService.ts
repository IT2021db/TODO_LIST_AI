// tasksService.ts
import { supabase } from "./lib/supabase";
import { AddTaskFormData, Task, tasksSchema } from "./utils";

// Fetch all tasks
export async function fetchTasksFromSupabase(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, text,completed")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const result = tasksSchema.safeParse(data);
  console.log(
    "result w TaskService, a w nim zadania pobrane z supabase: ",
    result,
  );
  if (!result.success) throw new Error("Wrong data format from Supabase");

  return result.data;
}

// Add new task
export async function addTaskToSupabase(text: AddTaskFormData) {
  const { error } = await supabase
    .from("tasks")
    .insert([
      { text: text, completed: false, created_at: new Date().toISOString() },
    ]);
  console.log("dodany task w tasksService/addTask : ", text);
  if (error) throw new Error(error.message);
}

// Toggle task
export async function toggleTaskInSupabase(id: [Task], completed: [Task]) {
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
export async function deleteTaskFromSupabase(id: [Task]) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
