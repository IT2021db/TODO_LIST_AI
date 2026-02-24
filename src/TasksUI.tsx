// TasksUI.tsx
import React, { useState } from "react";
import { Task } from "./utils";
import spinner from "./assets/spinner.gif";
import AddTaskForm from "./reactComponents/AddTaskForm";

interface TasksUIProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onTodoAdd: (task: string) => void;
  onTodoToggle: (id: number, completed: boolean) => void;
  onTodoDelete: (id: number) => void;
  onCompleteAll: () => void;
}

export default function TasksUI({
  tasks,
  loading,
  error,
  onTodoAdd,
  onTodoToggle,
  onTodoDelete,
  onCompleteAll,
}: TasksUIProps) {
  const [hideCompleted, setHideCompleted] = useState(false);

  if (loading) {
    return (
      <div className="caret-transparent flex flex-col items-center justify-center min-h-screen">
        <img src={spinner} alt="Loading..." className="w-80 h-80 mb-4" />
        <p className="text-xl">Trwa ładowanie danych...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-2xl">{error}</p>;

  const visibleTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  console.log("allCompleted", allCompleted);
  const hasUncompleted = tasks.some((t) => !t.completed);
  console.log("hasUncompleted", hasUncompleted);

  return (
    <div>
      <h1 className="bg-teal-500 text-white p-8 w-full h-24" />
      <main className="grid grid-cols-1 mx-auto p-5 max-w-4xl gap-5 max-[767px]:grid-cols-1">
        <h2 className="text-4xl font-bold">Lista zadań</h2>

        {/* Formularz dodawania */}
        <AddTaskForm onAdd={onTodoAdd} />

        {/* Lista zadań */}
        <div className="bg-gray-50 mb-2.5 ">
          <div className="grid gap-5 grid-cols-2 px-5 py-0 border-b border-gray-300 items-center ">
            <h2 className="text-2xl font-bold p-5">Lista zadań</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setHideCompleted((prev) => !prev)}
                className="px-3 py-2 text-teal-500 rounded bg-transparent cursor-pointer"
              >
                {hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone"}
              </button>
              <button
                onClick={onCompleteAll}
                disabled={!hasUncompleted}
                className={`py-2 px-3 mr-3 rounded transition bg-transparent duration-300
                  ${allCompleted ? "text-gray-400" : "text-teal-500"}
                  ${!hasUncompleted ? "opacity-50 text-gray-700 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {allCompleted ? "Wszystkie ukończone ✓" : "Ukończ wszystkie"}
              </button>
            </div>
          </div>

          <ul className="m-0 pl-3 px-3 pb-3 break-all">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between text-blue-800 py-3 px-5 border-b border-gray-300"
              >
                <div className="flex gap-5 flex-start">
                  <button
                    onClick={() => onTodoToggle(task.id, !task.completed)}
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
                  onClick={() => onTodoDelete(task.id)}
                  className="rounded-sm cursor-pointer bg-red-400 ml-3 w-7 h-7 text-white flex items-center justify-center hover:brightness-110 transition"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
