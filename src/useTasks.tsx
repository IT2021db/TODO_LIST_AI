import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Task, tasksSchema, TasksService } from "./utils";

export default function useTasks(): TasksService {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const { data, error: supabaseError } = await supabase
      .from("tasks")
      .select("id, text, completed")
      .order("created_at", { ascending: true }); // <- new task on the end of the list

    if (supabaseError) {
      setError(supabaseError.message);
      setLoading(false);
      console.log("Nie udało się pobrać danych z supabase");
      return;
    }

    const result = tasksSchema.safeParse(data); //<- tasks taken from supabase
    console.log("result", result);
    if (!result.success) {
      console.error(result.error);
      setError("Wrong data format from supabase");
      setLoading(false);
      return;
    }

    setTasks(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: string) => {
    const { error } = await supabase.from("tasks").insert([
      {
        text: task,
        completed: false,
        created_at: new Date().toISOString(),
      },
    ]);

    console.log("text as task: ", task); // <- task from input (data.task in props) converted to text for supabase connection

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
    await fetchTasks(); // list refreshing
  };

  console.log("tasks",tasks);   //<- tasks from supabase
  console.log("loading",loading)

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
