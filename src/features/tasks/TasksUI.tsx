import { useState, useRef, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { AddTaskFormData, Task, TasksService } from "./types";
import spinner from "../../assets/spinner.gif";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TasksUILayout from "./TasksUILayout";
import Panel from "../../design-system/Panel";
import { Button } from "../../design-system/Button";
import PageHeader from "../../design-system/PageHeader";
import ErrorMessage from "../../components/app-state/ErrorMessage";
import LoadingScreen from "../../components/app-state/LoadingScreen";

import { Locale } from "../../i18n/messages";

interface TasksUIProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onTodoAdd: (text: AddTaskFormData) => void;
  onTodoToggle: TasksService["toggleTask"];
  onTodoDelete: TasksService["deleteTask"];
  onCompleteAll: TasksService["completeAllTasks"];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function TasksUI({
  tasks,
  loading,
  error,
  onTodoAdd,
  onTodoToggle,
  onTodoDelete,
  onCompleteAll,
  locale,
  onLocaleChange,
}: TasksUIProps) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [locale]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorMessage message={error} />;

  const visibleTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  const hasUncompleted = tasks.some((t) => !t.completed);

  return (
    <main>
      <TasksUILayout
        header={
          <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        }
      >
        <PageHeader title={<FormattedMessage id="title" />} />
        <Panel title={<FormattedMessage id="addTask" />}>
          <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} locale={locale} />
        </Panel>
        <Panel
          title={<FormattedMessage id="title" />}
          actions={
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setHideCompleted((prev) => !prev);
                  inputRef.current?.focus();
                }}
              >
                {hideCompleted ? (
                  <FormattedMessage id="showCompleted" />
                ) : (
                  <FormattedMessage id="hideCompleted" />
                )}
              </Button>
              <Button
                variant={allCompleted ? "secondary" : "ghost"}
                disabled={!hasUncompleted}
                onClick={() => {
                  onCompleteAll();
                  inputRef.current?.focus();
                }}
              >
                {allCompleted ? (
                  <FormattedMessage id="allCompleted" />
                ) : (
                  <FormattedMessage id="completeAll" />
                )}
              </Button>
            </>
          }
        >
          <ul>
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onTodoToggle}
                onDelete={onTodoDelete}
                inputRef={inputRef}
              />
            ))}
          </ul>
        </Panel>
      </TasksUILayout>
    </main>
  );
}
