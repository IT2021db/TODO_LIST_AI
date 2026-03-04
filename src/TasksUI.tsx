// TasksUI.tsx
import { useState, useRef, useEffect } from "react";
import { Task } from "./utils";
import spinner from "./assets/spinner.gif";
import AddTaskForm from "./reactComponents/AddTaskForm";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "./reactComponents/LanguageSwitcher";
import { Locale } from "./i18n/messages";

interface TasksUIProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onTodoAdd: (task: string) => void;
  onTodoToggle: (id: number, isCompleted: boolean) => void;
  onTodoDelete: (id: number) => void;
  onCompleteAll: () => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function TasksUI({
  tasks,
  loading,
  error,
  onTodoAdd,
  onTodoToggle,
  onTodoDelete,
  onCompleteAll,
  locale: Locale,
  onLocaleChange, // <-- destrukturing
}: TasksUIProps) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [Locale]);

  if (loading) {
    return (
      <div className="caret-transparent flex flex-col items-center justify-center min-h-screen">
        <img src={spinner} alt="Loading..." className="w-80 h-80 mb-4" />
        <p className="text-xl">
          {" "}
          <FormattedMessage id="loading" />
        </p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-2xl">{error}</p>;

  const visibleTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  const hasUncompleted = tasks.some((t) => !t.completed);
  console.log("hasUncompleted", hasUncompleted);

  return (
    <div>
      <h1 className="bg-teal-500 text-white p-8 w-full h-24">
        <LanguageSwitcher locale={Locale} onLocaleChange={onLocaleChange} />
      </h1>
      <main className="grid grid-cols-1 mx-auto p-5 max-w-4xl gap-5 max-[767px]:grid-cols-1 caret-transparent">
        <h2 className="text-4xl font-bold">
          <FormattedMessage id="title" />
        </h2>
        <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} />
        <div className="bg-gray-50 mb-2.5 ">
          <div className="grid gap-5 grid-cols-2 px-5 py-0 border-b border-gray-300 items-center ">
            <h2 className="text-2xl font-bold p-5">
              <FormattedMessage id="title" />
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setHideCompleted((prev) => !prev);
                  inputRef.current?.focus(); //focus on input
                }}
                className="px-3 py-2 text-teal-500 rounded bg-transparent cursor-pointer"
              >
                {hideCompleted ? (
                  <FormattedMessage id="showCompleted" />
                ) : (
                  <FormattedMessage id="hideCompleted" />
                )}
              </button>
              <button
                onClick={() => {
                  onCompleteAll(); // wykonaj akcję complete all
                  inputRef.current?.focus(); // focus do inputa
                }}
                disabled={!hasUncompleted}
                className={`py-2 px-3 mr-3 rounded transition bg-transparent duration-300
                  ${allCompleted ? "text-gray-400" : "text-teal-500"}
                  ${!hasUncompleted ? "opacity-50 text-gray-700 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {allCompleted ? (
                  <FormattedMessage id="allCompleted" />
                ) : (
                  <FormattedMessage id="completeAll" />
                )}
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
                    onClick={() => {
                      onTodoToggle(task.id, !task.completed);
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
                    (onTodoDelete(task.id), inputRef.current?.focus());
                  }}
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
