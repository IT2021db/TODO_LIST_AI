// TasksUI.tsx
import { useState, useRef, useEffect } from "react";
import { AddTaskFormData, Task, TasksService } from "./types";
import spinner from "./assets/spinner.gif";
import AddTaskForm from "./reactComponents/AddTaskForm";
import TaskItem from "./reactComponents/TaskItem";
import LanguageSwitcher from "./reactComponents/LanguageSwitcher";
import { FormattedMessage } from "react-intl";

import { Locale } from "./i18n/messages";


interface TasksUIProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onTodoAdd: (text: AddTaskFormData) => void;
  onTodoToggle: TasksService["toggleTask"];
  onTodoDelete: TasksService["deleteTask"];
  onCompleteAll: TasksService["completeAllTasks"];
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
  locale,
  onLocaleChange,
}: TasksUIProps) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [locale]);

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
        <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
      </h1>
      <main className="grid grid-cols-1 mx-auto p-5 max-w-4xl gap-5 max-[767px]:grid-cols-1 caret-transparent">
        <div className="text-4xl font-bold">
          <FormattedMessage id="title" />
        </div>
        <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} locale={locale}/>
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
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onTodoToggle}
                onDelete={onTodoDelete}
                inputRef={inputRef}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
