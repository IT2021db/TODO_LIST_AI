import TasksUI from "./features/tasks/TasksUI";
import type { Locale } from "./i18n/messages";
import useTasksQuery from "./features/hooks/useTaskQuery";

// type of available languages
type Props = {
  locale: Locale; // <-- define prop - locale
  onLocaleChange: (locale: Locale) => void; // <--  prop - setLocale
};

export default function App({ locale, onLocaleChange }: Props) {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    completeAllTasks,
  } = useTasksQuery();

  return (
    <TasksUI
      tasks={tasks}
      loading={loading}
      error={error}
      onTodoAdd={addTask}
      onTodoToggle={toggleTask}
      onTodoDelete={deleteTask}
      onCompleteAll={completeAllTasks}
      locale={locale} // forward current language
      onLocaleChange={onLocaleChange} // forward callback
    />
  );
}
