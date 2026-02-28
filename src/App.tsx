import TasksUI from "./TasksUI";
import type { Locale } from "./i18n/messages";
import useTasksQuery from "./useTaskQuery";

// type of available languages
type Props = {
  locale: Locale; // <-- define prop - locale
  setLocale: (locale: Locale) => void; // <--  prop - setLocale
};

export default function App({ locale, setLocale }: Props) {
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
    <div>
      <TasksUI
        tasks={tasks}
        loading={loading}
        error={error}
        onTodoAdd={addTask}
        onTodoToggle={toggleTask}
        onTodoDelete={deleteTask}
        onCompleteAll={completeAllTasks}
        locale={locale} // forwarding locale
        setLocale={setLocale} // forwarding setLocale
      />
    </div>
  );
}
