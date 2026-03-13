import type { Task, TasksService } from "./types";
import TaskItem from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
  onToggle: TasksService["toggleTask"];
  onDelete: TasksService["deleteTask"];
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function TasksList({
  tasks,
  onToggle,
  onDelete,
  inputRef,
}: TasksListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          inputRef={inputRef}
        />
      ))}
    </ul>
  );
}