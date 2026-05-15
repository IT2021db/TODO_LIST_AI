import { supabase } from "./supabase";
import {
  tasksSchema,
  Task,
  CreateTaskInput,
  ToggleTaskInput,
  DeleteTaskInput,
} from "../features/tasks/types";

async function getCurrentUserId(): Promise<string> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) throw new Error("User is not logged in");

  return user.id;
}

export async function fetchTasksFromSupabase(): Promise<Task[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("tasks")
    .select("id, text, completed, category, user_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  //------------------------------------
  console.log("DATA FROM SUPABASE:", data);

  const result = tasksSchema.safeParse(data);

  if (!result.success) {
    console.log("Zod error:", result.error);
    throw new Error("Wrong data format from Supabase");
  }

  return result.data;
}

export async function addTaskToSupabase({
  text,
  category,
}: CreateTaskInput): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase.from("tasks").insert({
    text,
    completed: false,
    created_at: new Date().toISOString(),
    category,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
}

export async function toggleTaskInSupabase(
  data: ToggleTaskInput,
): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("tasks")
    .update({ completed: data.completed })
    .eq("id", data.id)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function completeAllTasksInSupabase(): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("completed", false)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function deleteTaskFromSupabase(
  data: DeleteTaskInput,
): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", data.id)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}