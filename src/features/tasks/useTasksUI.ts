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
  const completedCount = completedTasks.length;
  const unCompletedCount = tasks.filter((t) => !t.completed).length;
  const totalCount = tasks.length;
  const completedProgress =
    totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  const inProgress =
    totalCount === 0 ? 0 : (unCompletedCount / totalCount) * 100;
  return {
    hideCompleted,
    setHideCompleted,
    visibleTasks,
    allCompleted,
    hasUncompleted,
    completedCount,
    unCompletedCount,
    inProgress,
    completedProgress,
    totalCount,
  };
}
