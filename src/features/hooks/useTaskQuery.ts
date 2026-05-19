import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, AddTaskFormData, TasksService } from "../tasks/types";
import { rd, RemoteData } from "../../lib/remoteData";
import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  updateTaskCategoryInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "../../lib/tasksApi";

export default function useTasksQuery(
  userId: string | undefined,
): TasksService {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Task[], Error>({
    queryKey: ["tasks", userId],
    queryFn: fetchTasksFromSupabase,
    enabled: !!userId,
  });

  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const addTaskMutation = useMutation({
    mutationFn: addTaskToSupabase,
    onSuccess: invalidateTasks,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: toggleTaskInSupabase,
    onSuccess: invalidateTasks,
  });

  const updateTaskCategoryMutation = useMutation({
    mutationFn: updateTaskCategoryInSupabase,
    onSuccess: invalidateTasks,
  });

  const completeAllMutation = useMutation({
    mutationFn: completeAllTasksInSupabase,
    onSuccess: invalidateTasks,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskFromSupabase,
    onSuccess: invalidateTasks,
  });

  let tasks: RemoteData<Task[]>;

  if (isLoading) {
    tasks = rd.ofPending();
  } else if (error) {
    tasks = rd.ofError(error.message);
  } else {
    tasks = rd.of(data ?? []);
  }

  return {
    tasks,

    addTask: async (data: AddTaskFormData) => {
      await addTaskMutation.mutateAsync(data);
    },

    toggleTask: async (id: number, completed: boolean) => {
      await toggleTaskMutation.mutateAsync({ id, completed });
    },

    updateTaskCategory: async (id, category) => {
      await updateTaskCategoryMutation.mutateAsync({ id, category });
    },

    completeAllTasks: async () => {
      await completeAllMutation.mutateAsync();
    },

    deleteTask: async (id: number) => {
      await deleteTaskMutation.mutateAsync({ id });
    },
  };
}
