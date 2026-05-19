import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTasksUI } from "./useTasksUI";
import { useTasksActions } from "./useTasksActions";
import { AddTaskFormData, Task, TasksService, TaskCategory } from "./types";
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
import AuthPanel from "../auth/AuthPanel";
import { useAuth } from "../auth/useAuth";
import TasksStats from "./TasksStatsPanel";
interface TasksUIProps {
  tasks: RemoteData<Task[]>;
  onTodoAdd: (text: AddTaskFormData) => void;
  onTodoToggle: TasksService["toggleTask"];
  onTodoDelete: TasksService["deleteTask"];
  onTodoUpdateCategory: TasksService["updateTaskCategory"];
  onCompleteAll: TasksService["completeAllTasks"];
  auth: ReturnType<typeof useAuth>;
}

export default function TasksUI({
  tasks,
  onTodoAdd,
  onTodoToggle,
  onTodoDelete,
  onTodoUpdateCategory,
  onCompleteAll,
  auth,
}: TasksUIProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">(
    "all",
  );
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.focus();
    });
  }, [i18n.language]);

  // 🔥 drawing data if success
  const tasksData = tasks.type === "success" ? tasks.data : [];

  const urgentCount = tasksData.filter(
    (task) => task.category === "urgent",
  ).length;

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

  const categoryFilteredTasks =
    categoryFilter === "all"
      ? visibleTasks
      : visibleTasks.filter((task) => task.category === categoryFilter);

  const { toggleHideCompleted, completeAll } = useTasksActions({
    inputRef,
    onCompleteAll,
    setHideCompleted,
  });

  return (
    <main>
      <TasksUILayout header={<LanguageSwitcher />}>
        <PageHeader title={t("title")} />

        <AuthPanel
          userEmail={auth.user?.email}
          email={auth.email}
          password={auth.password}
          setEmail={auth.setEmail}
          setPassword={auth.setPassword}
          login={auth.login}
          register={auth.register}
          logout={auth.logout}
          isLoggedIn={auth.isLoggedIn}
          loading={auth.loading}
          authError={auth.authError}
          authMessage={auth.authMessage}
        />

        {auth.isLoggedIn ? (
          rd
            .journey(tasks)
            .wait(<LoadingScreen message={t("loading")} />)
            .catch((error) => <ErrorMessage message={error} />)
            .done(() => (
              <>
                <TasksStats
                  completedCount={completedCount}
                  unCompletedCount={unCompletedCount}
                  totalCount={totalCount}
                  completedProgress={completedProgress}
                  inProgress={inProgress}
                  urgentCount={urgentCount}
                />
                <Panel
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
                  <div className="mb-3 flex justify-end">
                    <select
                      value={categoryFilter}
                      onChange={(event) =>
                        setCategoryFilter(
                          event.target.value as TaskCategory | "all",
                        )
                      }
                      className="
      rounded-xl
      bg-[#1A1D24]
      border
      border-white/10
      px-3
      py-2
      text-sm
      text-gray-100
      outline-none
      cursor-pointer
    "
                    >
                      <option
                        value="all"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("allCategories")}
                      </option>
                      <option
                        value="work"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.work")}
                      </option>
                      <option
                        value="home"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.home")}
                      </option>
                      <option
                        value="health"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.health")}
                      </option>
                      <option
                        value="shopping"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.shopping")}
                      </option>
                      <option
                        value="garden"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.garden")}
                      </option>
                      <option
                        value="urgent"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.urgent")}
                      </option>
                      <option
                        value="other"
                        className="bg-[#1A1D24] text-gray-100"
                      >
                        {t("categories.other")}
                      </option>
                    </select>
                  </div>
                  <TasksList
                    tasks={categoryFilteredTasks}
                    onToggle={onTodoToggle}
                    onDelete={onTodoDelete}
                    onUpdateCategory={onTodoUpdateCategory}
                    inputRef={inputRef}
                  />
                </Panel>
                <Panel title={t("addTask")}>
                  <AddTaskForm onAdd={onTodoAdd} inputRef={inputRef} />
                </Panel>
              </>
            ))
        ) : (
          <Panel>
            <p className="text-md text-purple-500 flex items-center justify-center">
              {t("pleaseLog")}
            </p>
          </Panel>
        )}
      </TasksUILayout>
    </main>
  );
}
