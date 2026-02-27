export const messages = {
  en: {
    title: "Task list",
    addTask: "Add new task",
    placeholder: "What needs to be done?",
    writeTask: "Add task",
    loading: "Loading data...",
    showCompleted: "Show completed",
    hideCompleted: "Hide completed",
    completeAll: "Complete all",
    allCompleted: "All completed ✓",
    taskRequired: "Enter a task",
  },

  pl: {
    title: "Lista zadań",
    addTask: "Dodaj nowe zadanie",
    placeholder: "Co jest do zrobienia?",
    writeTask: "Dodaj zadanie",
    loading: "Trwa ładowanie danych...",
    showCompleted: "Pokaż ukończone",
    hideCompleted: "Ukryj ukończone",
    completeAll: "Ukończ wszystkie",
    allCompleted: "Wszystkie ukończone ✓",
    taskRequired: "Wpisz treść zadania",
  },

  es: {
    title: "Lista de tareas",
    addTask: "Agregar nueva tarea",
    placeholder: "¿Qué hay que hacer?",
    writeTask: "Agregar tarea",
    loading: "Cargando datos...",
    showCompleted: "Mostrar completadas",
    hideCompleted: "Ocultar completadas",
    completeAll: "Completar todas",
    allCompleted: "Todas completadas ✓",
    taskRequired: "Escribe una tarea",
  },
};

export type Locale = keyof typeof messages;
