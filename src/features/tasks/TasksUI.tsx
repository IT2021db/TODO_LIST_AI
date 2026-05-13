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
import { rd, RemoteData } from "../../lib/remoteData";
import LoadingScreen from "../../components/app-state/LoadingScreen";
import ErrorMessage from "../../components/app-state/ErrorMessage";
import AuthPanelContainer from "../auth/AuthPanelContainer";
import TasksStats from "./TasksStats";
interface TasksUIProps {
  tasks: RemoteData<Task[]>;
  onTodoAdd: (text: AddTaskFormData) => void;
  onTodoToggle: TasksService["toggleTask"];
  onTodoDelete: TasksService["deleteTask"];
  onCompleteAll: TasksService["completeAllTasks"];
}

export default function TasksUI({
  tasks,
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

  // 🔥 drawing data if success
  const tasksData = tasks.type === "success" ? tasks.data : [];

  const {
    hideCompleted,
    setHideCompleted,
    visibleTasks,
    allCompleted,
    hasUncompleted,
    completedCount,
    unCompletedCount,
    inProgress,
    completedProgress,
    totalCount,
  } = useTasksUI(tasksData);

  const { toggleHideCompleted, completeAll } = useTasksActions({
    inputRef,
    onCompleteAll,
    setHideCompleted,
  });

  return rd
    .journey(tasks)
    .wait(<LoadingScreen message={t("loading")} />)
    .catch((error) => <ErrorMessage message={error} />)
    .done(() => (
      <main>
        <TasksUILayout header={<LanguageSwitcher />}>
          <PageHeader title={t("title")} />
          <AuthPanelContainer />
          <TasksStats
            completedCount={completedCount}
            unCompletedCount={unCompletedCount}
            totalCount={totalCount}
            completedProgress={completedProgress}
            inProgress={inProgress}
          />
        
          <Panel
            // title={t("title")}
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
          <Panel title={t("addTask")}>
            <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} />
          </Panel>
        </TasksUILayout>
      </main>
    ));
}
