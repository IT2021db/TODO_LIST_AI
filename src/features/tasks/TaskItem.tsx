import type { Task, TasksService } from "./types";
import { Button } from "../../design-system/Button";
import { taskItem, taskText } from "../../styles/ui";
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
    <li
      className={taskItem({
        state: task.completed ? "completed" : "default",
      })}
    >
      <div className="flex gap-3 items-center">
        <Button
          variant="primary" // używa variantStyles + activeStyles
          size="icon" // ustawia wymiary w sizeStyles
          active={task.completed} // ustawia activeStyles
           className={`
    !w-6 !h-6 !min-w-0 !min-h-0
    !p-0
    !rounded-full
    !flex !items-center !justify-center
    !border-3
    !transition-all !duration-200

    ${task.completed
      ? "!bg-green-500 !border-green-500 !text-white"
      : "!bg-transparent !border-purple-500 !text-transparent hover:!border-blue-400"}
  `}
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
  //        className={`
  //   !w-6 !h-6 !min-w-0 !min-h-0
  //   !p-0
  //   !rounded-full
  //   !flex !items-center !justify-center
  //   !border-3
  //   !transition-all !duration-200

  //   !bg-transparent !border-gray-500 !text-gray-400
  //   hover:!border-red-400 hover:!text-red-400
  // `}
        onClick={() => {
          onDelete(task.id);
          inputRef.current?.focus();
        }}
      >
        ✕
      </Button>
    </li>
  );
}
