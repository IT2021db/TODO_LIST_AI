import TasksUI from "./features/tasks/TasksUI";
import useTasksQuery from "./features/hooks/useTaskQuery";
import { useAuth } from "./features/auth/useAuth";

export default function App() {
  const auth = useAuth();

  const { tasks, addTask, toggleTask, deleteTask,updateTaskCategory, completeAllTasks } =
    useTasksQuery(auth.user?.id);

  return (
    <TasksUI
      tasks={tasks}
      onTodoAdd={addTask}
      onTodoToggle={toggleTask}
      onTodoDelete={deleteTask}
      onTodoUpdateCategory={updateTaskCategory}
      onCompleteAll={completeAllTasks}
      auth={auth}
    />
  );
}
