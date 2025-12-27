import { Task } from '../types';

/**
 * Mapuje dane z bazy danych do typu Task
 * Obsługuje różne nazwy kolumn (completed, is_completed, done, etc.)
 */
export const mapTaskFromDb = (item: any): Task => {
  return {
    id: item.id,
    text: item.text || item.task || item.title || item.name || '',
    completed: item.completed ?? item.is_completed ?? item.done ?? item.is_done ?? false
  };
};

/**
 * Przygotowuje dane do zapisu w bazie danych
 * Próbuje użyć różnych nazw kolumn w zależności od schematu
 */
export const prepareTaskForInsert = (text: string, completed: boolean = false) => {
  // Najpierw próbuj z 'completed', potem z 'is_completed', na końcu bez kolumny statusu
  return {
    text,
    completed,
    is_completed: completed,
    created_at: new Date().toISOString()
  };
};

/**
 * Przygotowuje dane do aktualizacji w bazie danych
 */
export const prepareTaskForUpdate = (completed: boolean) => {
  return {
    completed,
    is_completed: completed
  };
};

