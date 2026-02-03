import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Task, tasksSchema, GetTasksReturn } from "./utils";

export default function getTasks(): GetTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const { data, error: supabaseError } = await supabase
      .from("tasks")
      .select("id, text, completed");

    if (supabaseError) {
      setError(supabaseError.message);
      setLoading(false);
      console.log("Nie udało się pobrać danych z supabase");
      return;
    }

    const parsed = tasksSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      setError("Wrong data format from supabase");
      setLoading(false);
      return;
    }

    setTasks(parsed.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    const { error } = await supabase.from("tasks").insert([
      {
        text,
        completed: false,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchTasks(); // list refreshing
  };

  const toggleTask = async (id: number, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed })
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed } : task)),
    );
  };

  const completeAllTasks = async (): Promise<void> => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: true })
      .eq("completed", false);

    if (error) {
      setError(error.message);
      return;
    }
    setTasks((prev) => prev.map((task) => ({ ...task, completed: true })));
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }
  };

  console.log(tasks);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    completeAllTasks,
  };
}
