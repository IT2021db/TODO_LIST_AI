import { useState } from 'react';
import Navigation from './components/Navigation';
import TaskList from './components/TaskList';
import { Task } from './types';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterText, setFilterText] = useState('');

  const addTask = (taskText: string) => {
    if (taskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    setTasks((current) => [...current, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const loadExampleTasks = () => {
    const exampleTasks: Task[] = [
      { id: Date.now() + 1, text: 'Zrobić zakupy', completed: false },
      { id: Date.now() + 2, text: 'Nauka React', completed: false },
      { id: Date.now() + 3, text: 'Spotkanie z zespołem', completed: false },
      { id: Date.now() + 4, text: 'Przygotować prezentację', completed: false },
      { id: Date.now() + 5, text: 'Przeczytać książkę', completed: false }
    ];

    setTasks((current) => [...current, ...exampleTasks]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="App">
      <Navigation />
      <div className="main-content">
        <h1 className="main-title">Lista zadań</h1>
        <TaskList
          tasks={filteredTasks}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onLoadExamples={loadExampleTasks}
          filterText={filterText}
          onFilterChange={setFilterText}
        />
      </div>
    </div>
  );
};

export default App;

