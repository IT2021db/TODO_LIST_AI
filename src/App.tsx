import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TaskList from './components/TaskList';
import { Task } from './types';
import { supabase } from './lib/supabase';
import { mapTaskFromDb, prepareTaskForInsert, prepareTaskForUpdate } from './lib/taskMapper';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  // Pobierz zadania z Supabase przy starcie aplikacji
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Błąd podczas pobierania zadań:', error);
        return;
      }

      if (data) {
        const mappedTasks = data.map(mapTaskFromDb);
        setTasks(mappedTasks);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskText: string) => {
    if (taskText.trim() === '') return;

    try {
      const taskData = prepareTaskForInsert(taskText, false);
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) {
        console.error('Błąd podczas dodawania zadania:', error);
        return;
      }

      if (data) {
        const newTask = mapTaskFromDb(data);
        setTasks((current) => [newTask, ...current]);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania zadania:', error);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;

    try {
      const updateData = prepareTaskForUpdate(newCompleted);
      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Błąd podczas aktualizacji zadania:', error);
        return;
      }

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, completed: newCompleted } : task
        )
      );
    } catch (error) {
      console.error('Błąd podczas aktualizacji zadania:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Błąd podczas usuwania zadania:', error);
        return;
      }

      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Błąd podczas usuwania zadania:', error);
    }
  };

  const loadExampleTasks = async () => {
    const exampleTasks = [
      'Zrobić zakupy',
      'Nauka React',
      'Spotkanie z zespołem',
      'Przygotować prezentację',
      'Przeczytać książkę'
    ];

    try {
      const tasksToInsert = exampleTasks.map((text) => prepareTaskForInsert(text, false));
      const { data, error } = await supabase
        .from('tasks')
        .insert(tasksToInsert)
        .select();

      if (error) {
        console.error('Błąd podczas dodawania przykładowych zadań:', error);
        return;
      }

      if (data) {
        const mappedTasks = data.map(mapTaskFromDb);
        setTasks((current) => [...mappedTasks, ...current]);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania przykładowych zadań:', error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="App">
      <Navigation />
      <div className="main-content">
        <h1 className="main-title">Lista zadań</h1>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Ładowanie zadań...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onLoadExamples={loadExampleTasks}
            filterText={filterText}
            onFilterChange={setFilterText}
          />
        )}
      </div>
    </div>
  );
};

export default App;

