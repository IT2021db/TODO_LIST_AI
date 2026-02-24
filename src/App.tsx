// App.tsx
import useTasks from "./useTasks";
import TasksUI from "./TasksUI";

export default function App() {
  const { tasks, loading, error, addTask, toggleTask, deleteTask, completeAllTasks } = useTasks();

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
