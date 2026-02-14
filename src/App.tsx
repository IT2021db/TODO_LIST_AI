import { useState } from "react";
import useTasks from "./useTasks";
import "./index.css";

export default function Tasks() {
  const { tasks, error, addTask, toggleTask, deleteTask, completeAllTasks } =
    useTasks();
  const [filter, setFilter] = useState<"all" | "completed">("all");
  const [newTask, setNewTask] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const visibleTasks = hideCompleted
    ? tasks.filter((task) => !task.completed) //uncomplited only
    : tasks; //all tasks

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    await addTask(newTask);
    setNewTask("");
  };
  const allCompleted =
    tasks.length > 0 && tasks.every((task) => task.completed);

  const hasUncompleted = tasks.some((task) => !task.completed);

  return (
    <div>
      <h1 className="bg-teal-500 text-white p-8 w-full h-24" />
      <main className="grid grid-cols-1 mx-auto p-5 max-w-4xl gap-5 p-5 max-[767px]:grid-cols-1">
        <h2 className="text-4xl font-bold">Lista zadań</h2>
        <div className="bg-gray-50 mb-2.5">
          <h2 className="text-2xl font-bold border-b border-gray-300 p-5">
            Dodaj nowe zadanie
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-5 p-5">
            <input
              type="text"
              placeholder="Co jest do zrobienia?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className=" bg-gray-50 flex-1 border border-gray-300"
            />
            <button
              type="submit"
              className="
          px-2.5 py-2 bg-teal-500 text-white border-0 cursor-pointer
          transform transition duration-1000 hover:brightness-110 hover:scale-110
          active:brightness-150
        "
            >
              Dodaj zadanie
            </button>
          </form>
        </div>

        <div className="bg-gray-50 mb-2.5 ">
          <div className="grid gap-5 grid-cols-2 px-5 py-0  border-b border-gray-300 items-center ">
            <h2 className="text-2xl font-bold">Lista zadań</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setHideCompleted((prev) => !prev)}
                className="px-3 py-2 text-teal-500 rounded bg-transparent  cursor-pointer"
              >
                {hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone"}
              </button>
              <button
                onClick={completeAllTasks}
                disabled={!hasUncompleted}
                className={`
    py-2 px-3 mr-3 rounded transition  bg-transparent duration-300

    ${allCompleted ? " text-gray-400" : " text-teal-500 "}

    ${!hasUncompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
              >
                {allCompleted ? "Wszystkie ukończone ✓" : "Ukończ wszystkie"}
              </button>
            </div>
          </div>

          <ul className="m-0 pl-3 px-3 pb-3 break-all  ">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between
                   text-blue-800 py-3 px-5  border-b border-gray-300"
              >
                <div className="flex gap-5 flex-start">
                  <button
                    onClick={() => toggleTask(task.id, !task.completed)}
                    className="
                    cursor-pointer w-7 h-7  flex items-center justify-center
                    bg-teal-500 text-white
                    hover:brightness-110 transition"
                  >
                    {task.completed ? "✔" : ""}
                  </button>
                  <div className={`${task.completed ? "line-through" : ""}`}>
                    {task.text}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="cursor-pointer bg-red-400 ml-3 w-7 h-7 text-white flex items-center justify-center hover:brightness-110 transition"
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
