import TasksUI from "./features/tasks/TasksUI";
import useTasksQuery from "./features/hooks/useTaskQuery";
import { useAuth } from "./features/auth/useAuth";

export default function App() {
  const auth = useAuth();

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    completeAllTasks,
  } = useTasksQuery(auth.user?.id);

  return (
    <TasksUI
      tasks={tasks}
      onTodoAdd={addTask}
      onTodoToggle={toggleTask}
      onTodoDelete={deleteTask}
      onCompleteAll={completeAllTasks}
      auth={auth}
    />
  );
}