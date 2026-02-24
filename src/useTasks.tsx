// useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "./utils";
import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "./tasksService";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasksFromSupabase();
      setTasks(data);
      console.log("data w useTasks - zadania przekazane z tasksService", data);
    } catch (err: any) {
      setError(err.message || "Błąd przy pobieraniu zadań");
    } finally {
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
      await addTaskToSupabase(task);
      console.log("dodany task w useTasks:", task);
      await fetchTasks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    setError(null);
    try {
      await toggleTaskInSupabase(id, completed);
      console.log("toggle task - id, completed", id, completed);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t)),
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const completeAllTasks = async () => {
    setError(null);
    try {
      await completeAllTasksInSupabase();
      setTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);
    try {
      await deleteTaskFromSupabase(id);
      console.log("delated task id:", id);
      await fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    completeAllTasks,
    deleteTask,
  };
}
