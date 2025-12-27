import { Task } from '../types';
import './TaskItem.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const completedLabel = task.completed ? 'Przywróć' : 'Oznacz jako ukończone';

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={() => onToggle(task.id)}
          aria-label="Oznacz jako ukończone"
        >
          {completedLabel}
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Usuń zadanie"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

