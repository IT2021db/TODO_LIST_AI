import { RefObject } from "react";
import type { TasksService } from "./types";

interface UseTasksActionsProps {
  inputRef: RefObject<HTMLInputElement>;
  onCompleteAll: TasksService["completeAllTasks"];
  setHideCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useTasksActions({
  inputRef,
  onCompleteAll,
  setHideCompleted,
}: UseTasksActionsProps) {
  const toggleHideCompleted = () => {
    setHideCompleted((prev) => !prev);
    inputRef.current?.focus();
  };

  const completeAll = () => {
    onCompleteAll();
    inputRef.current?.focus();
  };

  return {
    toggleHideCompleted,
    completeAll,
  };
}
