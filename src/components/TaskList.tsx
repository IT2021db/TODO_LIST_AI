import AddTask from './AddTask';
import SearchFilter from './SearchFilter';
import TaskItem from './TaskItem';
import { Task } from '../types';
import './TaskList.css';

type TaskListProps = {
  tasks: Task[];
  onAddTask: (taskText: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onLoadExamples: () => void;
  onRemoveExamples: () => void;
  hasExampleTasks: boolean;
  filterText: string;
  onFilterChange: (value: string) => void;
};

const TaskList = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onLoadExamples,
  onRemoveExamples,
  hasExampleTasks,
  filterText,
  onFilterChange
}: TaskListProps) => {
  return (
    <div className="task-list-container">
      <AddTask
        onAddTask={onAddTask}
        onLoadExamples={onLoadExamples}
        onRemoveExamples={onRemoveExamples}
        hasExampleTasks={hasExampleTasks}
      />

      <SearchFilter filterText={filterText} onFilterChange={onFilterChange} />

      <div className="task-list-section">
        <h2 className="section-title">Lista zadań</h2>
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>Brak zadań do wyświetlenia</p>
            </div>
          ) : (
            tasks.map((task) => (
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
};

export default TaskList;

