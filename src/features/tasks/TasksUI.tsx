import { useRef, useEffect } from "react";
import { useTasksUI } from "./useTasksUI";
import { FormattedMessage } from "react-intl";
import { useTasksActions } from "./useTasksActions";
import { AddTaskFormData, Task, TasksService } from "./types";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TasksUILayout from "./TasksUILayout";
import Panel from "../../design-system/Panel";
import { Button } from "../../design-system/Button";
import PageHeader from "../../design-system/PageHeader";
import AppState from "../../components/app-state/AppState";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [locale]);

  const {
    hideCompleted,
    setHideCompleted,
    visibleTasks,
    allCompleted,
    hasUncompleted,
  } = useTasksUI(tasks);

  const { toggleHideCompleted, completeAll } = useTasksActions({
    inputRef,
    onCompleteAll,
    setHideCompleted,
  });

  return (
    <AppState loading={loading} error={error}>
      <main>
        <TasksUILayout
          header={
            <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
          }
        >
          <PageHeader title={<FormattedMessage id="title" />} />
          <Panel title={<FormattedMessage id="addTask" />}>
            <AddTaskForm
              onAdd={onTodoAdd}
              inputRef={inputRef}
              locale={locale}
            />
          </Panel>
          <Panel
            title={<FormattedMessage id="title" />}
            actions={
              <>
                <Button variant="ghost" onClick={toggleHideCompleted}>
                  {hideCompleted ? (
                    <FormattedMessage id="showCompleted" />
                  ) : (
                    <FormattedMessage id="hideCompleted" />
                  )}
                </Button>
                <Button
                  variant={allCompleted ? "secondary" : "ghost"}
                  disabled={!hasUncompleted}
                  onClick={completeAll}
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
    </AppState>
  );
}
