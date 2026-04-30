import TasksUI from "./features/tasks/TasksUI";
import useTasksQuery from "./features/hooks/useTaskQuery";

export default function App() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    completeAllTasks,
  } = useTasksQuery();

  return (
    <TasksUI
      tasks={tasks}
      onTodoAdd={addTask}
      onTodoToggle={toggleTask}
      onTodoDelete={deleteTask}
      onCompleteAll={completeAllTasks}
    />
  );
}
