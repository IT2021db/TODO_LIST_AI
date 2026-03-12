import { useState } from "react";
import type { Task } from "./types";

export function useTasksUI(tasks: Task[]) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const completedTasks = tasks.filter((t) => t.completed);

  const visibleTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;

  const allCompleted =
    tasks.length > 0 && completedTasks.length === tasks.length;

  const hasUncompleted = completedTasks.length !== tasks.length;

  return {
    hideCompleted,
    setHideCompleted,
    visibleTasks,
    allCompleted,
    hasUncompleted,
  };
}
