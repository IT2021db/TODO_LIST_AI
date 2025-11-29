import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState('');

  const addTask = (taskText) => {
    if (taskText.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const loadExampleTasks = () => {
    const exampleTasks = [
      { id: Date.now() + 1, text: 'Zrobić zakupy', completed: false },
      { id: Date.now() + 2, text: 'Nauka React', completed: false },
      { id: Date.now() + 3, text: 'Spotkanie z zespołem', completed: false },
      { id: Date.now() + 4, text: 'Przygotować prezentację', completed: false },
      { id: Date.now() + 5, text: 'Przeczytać książkę', completed: false }
    ];
    setTasks([...tasks, ...exampleTasks]);
  };

  const filteredTasks = tasks.filter(task =>
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
}

export default App;

