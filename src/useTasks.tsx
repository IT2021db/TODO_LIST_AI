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

type TasksState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Task[] }
  | { status: "error"; error: string };

export default function useTasks() {
  const [state, setState] = useState<TasksState>({ status: "idle" });

  const fetchTasks = async () => {
    setState({ status: "loading" });

    try {
      const data = await fetchTasksFromSupabase();
      setState({ status: "success", data });
      console.log("data w useTasks - zadania przekazane z tasksService", data, state);
    } catch (err: any) {
      setState({
        status: "error",
        error: err.message || "Błąd przy pobieraniu zadań",
      });
      // setError(err.message || "Błąd przy pobieraniu zadań");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: string) => {
    setState({ status: "loading" });
 
    try {
      await addTaskToSupabase(task);
      console.log("dodany task w useTasks:", task);
      await fetchTasks();
    } catch (err: any) {
      setState({ status: "error", error: err.message });
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    if (state.status !== "success") return;

    try {
      await toggleTaskInSupabase(id, completed);
      console.log("toggle task - id, completed", id, completed);
      setState({
        status: "success",
        data: state.data.map((t) => (t.id === id ? { ...t, completed } : t)),
      });
    } catch (err: any) {
      setState({ status: "error", error: err.message });
    }
  };

  const completeAllTasks = async () => {
    if (state.status !== "success") return;

    try {
      await completeAllTasksInSupabase();
      setState({
        status: "success",
        data: state.data.map((t) => ({ ...t, completed: true })),
      });
    } catch (err: any) {
      setState({ status: "error", error: err.message });
    }
  };

  const deleteTask = async (id: number) => {
    if (state.status !== "success") return;

    try {
      await deleteTaskFromSupabase(id);
      console.log("delated task id:", id);
      await fetchTasks();
    } catch (err: any) {
      setState({ status: "error", error: err.message });
    }
  };

  return {
    state,
    tasks: state.status === "success" ? state.data : [],
    loading: state.status === "loading",
    error: state.status === "error" ? state.error : null,
    addTask,
    toggleTask,
    completeAllTasks,
    deleteTask,
  };
}
