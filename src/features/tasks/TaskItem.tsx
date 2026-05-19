import { useTranslation } from "react-i18next";
import { taskCategories } from "./types";
import type { Task, TasksService, TaskCategory } from "./types";
import { Button } from "../../design-system/Button";
import { taskItem } from "../../styles/ui";
import { categoryBadge } from "../../styles/ui";

interface TaskItemProps {
  task: Task;
  onToggle: TasksService["toggleTask"];
  onDelete: TasksService["deleteTask"];
  onUpdateCategory: TasksService["updateTaskCategory"];
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdateCategory,
  inputRef,
}: TaskItemProps) {
  const { t } = useTranslation();
  return (
    <li
      className={taskItem({
        state: task.completed ? "completed" : "default",
      })}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Button
          variant="primary"
          size="icon"
          active={task.completed}
          className={`
            w-6 !h-6 !min-w-6 !min-h-6
            !p-0
            !rounded-full
            !flex !items-center !justify-center
            !border-3
            !transition-all !duration-200
            shrink-0

            ${
              task.completed
                ? "!bg-green-500 !border-green-500 !text-white"
                : "!bg-transparent !border-purple-500 !text-transparent hover:!border-blue-400"
            }
          `}
          onClick={() => {
            onToggle(task.id, !task.completed);
            inputRef.current?.focus();
          }}
        >
          {task.completed ? "✓" : ""}
        </Button>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className={`
              min-w-0
              flex-1
              text-sm
              text-gray-200
              whitespace-normal
              break-word: break-all
              line-clamp-2

              ${task.completed ? "line-through opacity-50" : ""}
            `}
          >
            {task.text}
          </div>

          <select
            value={task.category}
            onChange={(event) => {
              onUpdateCategory(task.id, event.target.value as TaskCategory);
              inputRef.current?.focus();
            }}
            className={`
    ${categoryBadge({ category: task.category })}
    border-none
    outline-none
    cursor-pointer
    `}
            title="Change category"
          >
            {taskCategories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-[#1A1D24] text-gray-100"
              >
                {t(`categories.${category}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="danger"
        size="icon"
        className="shrink-0"
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
