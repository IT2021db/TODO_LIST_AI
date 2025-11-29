import React, { useState } from 'react';
import './AddTask.css';

function AddTask({ onAddTask, onLoadExamples }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="add-task-section">
      <div className="add-task-header">
        <h2 className="section-title">Dodaj nowe zadanie</h2>
        <button 
          type="button" 
          className="load-examples-btn"
          onClick={onLoadExamples}
        >
          Pobierz przykładowe zadania
        </button>
      </div>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          className="task-input"
          placeholder="Co jest do zrobienia?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-task-btn">
          Dodaj zadanie
        </button>
      </form>
    </div>
  );
}

export default AddTask;

