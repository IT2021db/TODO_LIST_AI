import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTasksUI } from "./useTasksUI";
import { useTasksActions } from "./useTasksActions";
import { AddTaskFormData, Task, TasksService } from "./types";
import AddTaskForm from "./AddTaskForm";
import TasksList from "./TasksList";
import TasksPanelActions from "./TasksPanelActions";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TasksUILayout from "./TasksUILayout";
import Panel from "../../design-system/Panel";
import PageHeader from "../../design-system/PageHeader";
import AppState from "../../components/app-state/AppState";

interface TasksUIProps {
  tasks: Task[];
  loading: TasksService["loading"];
  error: TasksService["error"];
  onTodoAdd: (text: AddTaskFormData) => void;
  onTodoToggle: TasksService["toggleTask"];
  onTodoDelete: TasksService["deleteTask"];
  onCompleteAll: TasksService["completeAllTasks"];
}

export default function TasksUI({
  tasks,
  loading,
  error,
  onTodoAdd,
  onTodoToggle,
  onTodoDelete,
  onCompleteAll,
}: TasksUIProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
  const el = inputRef.current;
  if (!el) return;

  requestAnimationFrame(() => {
    el.focus();
  });
}, [i18n.language]);

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
        <TasksUILayout header={<LanguageSwitcher />}>
          <PageHeader title={t("title")} />
          <Panel title={t("addTask")}>
            <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} />
          </Panel>
          <Panel
            title={t("title")}
            actions={
              <TasksPanelActions
                hideCompleted={hideCompleted}
                allCompleted={allCompleted}
                hasUncompleted={hasUncompleted}
                onToggleHide={toggleHideCompleted}
                onCompleteAll={completeAll}
              />
            }
          >
            <ul>
              <TasksList
                tasks={visibleTasks}
                onToggle={onTodoToggle}
                onDelete={onTodoDelete}
                inputRef={inputRef}
              />
            </ul>
          </Panel>
        </TasksUILayout>
      </main>
    </AppState>
  );
}
