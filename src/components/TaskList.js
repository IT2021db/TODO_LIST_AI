import React from 'react';
import './TaskList.css';
import AddTask from './AddTask';
import SearchFilter from './SearchFilter';
import TaskItem from './TaskItem';

function TaskList({ 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask, 
  onLoadExamples,
  filterText,
  onFilterChange 
}) {
  return (
    <div className="task-list-container">
      <AddTask onAddTask={onAddTask} onLoadExamples={onLoadExamples} />
      
      <SearchFilter filterText={filterText} onFilterChange={onFilterChange} />
      
      <div className="task-list-section">
        <h2 className="section-title">Lista zadań</h2>
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>Brak zadań do wyświetlenia</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;

