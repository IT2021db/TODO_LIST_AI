import type { Task, TasksService } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: TasksService["toggleTask"];
  onDelete: TasksService["deleteTask"];
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function TaskItem ({task, onToggle, onDelete, inputRef }: TaskItemProps){

  return (
 <li className="flex items-center justify-between text-blue-800 py-3 px-5 border-b border-gray-300">
    <div className="flex gap-5 flex-start">
      <button
        onClick={() => {
          onToggle(task.id, !task.completed);
          inputRef.current?.focus();
          }}
          className="cursor-pointer w-7 h-7 flex items-center justify-center
            bg-teal-500 text-white font-bold rounded-sm hover:brightness-110 transition"
      >
         {task.completed ? "✓" : ""}
      </button>
      <div className={`${task.completed ? "line-through" : ""}`}>
         {task.text}
      </div> 
     </div>
     <button
       onClick={() => {
         onDelete(task.id), inputRef.current?.focus();
       }}
       className="rounded-sm cursor-pointer bg-red-400 ml-3 w-7 h-7 text-white flex items-center justify-center hover:brightness-110 transition"
     >
         🗑
     </button>
 </li>
    
  );
};



