import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Task, tasksSchema, TasksService } from "./utils";

export default function useTasks(): TasksService {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      setError("Nie udało się pobrać zadań - timeout 20s");
    }, 20000); // <- if the query takes too long

    try {
      const { data, error: supabaseError } = await supabase
        .from("tasks")
        .select("id, text, completed")
        .order("created_at", { ascending: true }); // <- new task on the end of the list

      if (supabaseError) throw supabaseError;

      const result = tasksSchema.safeParse(data); //<- tasks taken from supabase
      if (!result.success) throw new Error("Wrong data format from Supabase");

      setTasks(result.data);
      console.log("result", result);
    } catch (err: any) {
      setError(err.message || "Nieznany błąd przy pobieraniu zadań");
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("tasks").insert([
        {
          text: task,
          completed: false,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;

      await fetchTasks();
    } catch (err: any) {
      setError(err.message || "Nie udało się dodać zadania");
    } finally {
      setLoading(false);
    }
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
    await fetchTasks(); // list refreshing
  };

  console.log("tasks", tasks); //<- tasks from supabase

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
