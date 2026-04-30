import type { Task, TasksService } from "./types";
import { Button } from "../../design-system/Button";
interface TaskItemProps {
  task: Task;
  onToggle: TasksService["toggleTask"];
  onDelete: TasksService["deleteTask"];
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  inputRef,
}: TaskItemProps) {
  return (
    <li className="flex items-center justify-between text-blue-800 py-3 px-5 border-b border-gray-300">
      <div className="flex gap-5 flex-start">
        <Button
          variant="primary" // używa variantStyles + activeStyles
          size="icon" // ustawia wymiary w sizeStyles
          active={task.completed} // ustawia activeStyles
          onClick={() => {
            onToggle(task.id, !task.completed);
            inputRef.current?.focus();
          }}
        >
          {task.completed ? "✓" : ""}
        </Button>
        <div className={`${task.completed ? "line-through" : ""}`}>
          {task.text}
        </div>
      </div>
      <Button
        variant="danger"
        size="icon"
        onClick={() => {
          onDelete(task.id);
          inputRef.current?.focus();
        }}
      >
        🗑
      </Button>
    </li>
  );
}
