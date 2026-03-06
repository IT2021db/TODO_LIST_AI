// useTasks.ts
import { useState, useEffect } from "react";
import { Task, AddTaskFormData } from "./types";
import { useIntl } from "react-intl";

import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "./ApiTasksService";

type TasksState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Task[] }
  | { status: "error"; error: string };

export default function useTasks() {
  const intl = useIntl();
  const [state, setState] = useState<TasksState>({ status: "idle" });

  const fetchTasks = async () => {
    setState({ status: "loading" });

    try {
      const data = await fetchTasksFromSupabase();
      setState({ status: "success", data });
      console.log(
        "data w useTasks - zadania przekazane z ApiTasksService",
        data,
        state,
      );
    } catch (err: any) {
      setState({
        status: "error",
        error: err.message || intl.formatMessage({ id: "tasksFetchError" }),
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: AddTaskFormData) => {
    setState({ status: "loading" });

    try {
      await addTaskToSupabase(task);
      console.log("dodany task w useTasks:", task);
      await fetchTasks();
    } catch (err: any) {
      setState({ status: "error", error: err.message });
    }
  };

  const toggleTask = async (id: number, isCompleted: boolean) => {
    if (state.status !== "success") return;

    try {
      await toggleTaskInSupabase(id, isCompleted);
      console.log("toggle task - id,isCompleted", id, isCompleted);
      setState({
        status: "success",
        data: state.data.map((t) => (t.id === id ? { ...t, isCompleted } : t)),
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
        data: state.data.map((t) => ({ ...t, isCompleted: true })),
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
