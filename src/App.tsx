import { useState } from "react";
import getTasks from "./getTasks";
import "./App.css";

export default function Tasks() {
  const { tasks, error, addTask, toggleTask, deleteTask, completeAllTasks } =
    getTasks();
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

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Co jest do zrobienia?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Dodaj zadanie</button>
      </form>

      <br />
      <button onClick={() => setHideCompleted((prev) => !prev)}>
        {hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>
      <button
        onClick={completeAllTasks}
        style={{
          margin: "10px 0",
          padding: "8px 14px",
          backgroundColor: "#46d074",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Ukończ wszystkie
      </button>

      <ul>
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {task.text}
            <button
              onClick={() => toggleTask(task.id, !task.completed)}
              style={{
                marginLeft: "10px",
                height: "25px",
                width: "25px",
                padding: "4px 8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {task.completed ? "✔" : ""}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                marginLeft: "10px",
                height: "25px",
                width: "25px",
                padding: "4px 8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "red",
                color: "black",
              }}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
