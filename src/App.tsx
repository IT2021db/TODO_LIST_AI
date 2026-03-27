import TasksUI from "./features/tasks/TasksUI";
import useTasksQuery from "./features/hooks/useTaskQuery";

export default function App() {
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
    />
  );
}
