import { Task } from "../types";

/**
 * Mapuje dane z bazy danych do typu Task
 * Obsługuje różne nazwy kolumn (completed, is_completed, done, etc.)
 */
type TaskDb = {
  id: number;
  text?: string;
  task?: string;
  title?: string;
  name?: string;
  completed?: boolean;
  is_completed?: boolean;
  done?: boolean;
  is_done?: boolean;
};

export const mapTaskFromDb = (item: TaskDb): Task => {
  return {
    id: item.id,
    text: item.text || item.task || item.title || item.name || "",
    completed:
      item.completed ?? item.is_completed ?? item.done ?? item.is_done ?? false,
  };
};

/**
 * Przygotowuje dane do zapisu w bazie danych
 */
export const prepareTaskForInsert = (
  text: string,
  completed: boolean = false,
) => {
  return {
    text,
    completed,
    created_at: new Date().toISOString(),
  };
};

/**
 * Przygotowuje dane do aktualizacji w bazie danych
 */
export const prepareTaskForUpdate = (completed: boolean) => {
  return {
    completed,
  };
};
