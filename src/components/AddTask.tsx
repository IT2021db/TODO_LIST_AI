import { FormEvent, useState } from 'react';
import './AddTask.css';

type AddTaskProps = {
  onAddTask: (taskText: string) => void;
  onLoadExamples: () => void;
};

const AddTask = ({ onAddTask, onLoadExamples }: AddTaskProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === '') return;

    onAddTask(inputValue);
    setInputValue('');
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
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit" className="add-task-btn">
          Dodaj zadanie
        </button>
      </form>
    </div>
  );
};

export default AddTask;

