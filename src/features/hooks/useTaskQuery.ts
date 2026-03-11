import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, AddTaskFormData, TasksService } from "../tasks/types";
import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "../../lib/tasksApi";

export default function useTasksQuery(): TasksService {
  const queryClient = useQueryClient();

  // FETCH
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasksFromSupabase,
  });
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

  // ADD
  const addTaskMutation = useMutation({
    mutationFn: addTaskToSupabase,
    onSuccess: invalidate,
  });

  // TOGGLE
  const toggleTaskMutation = useMutation({
    mutationFn: toggleTaskInSupabase,
    onSuccess: invalidate,
  });

  // COMPLETE ALL
  const completeAllMutation = useMutation({
    mutationFn: completeAllTasksInSupabase,
    onSuccess: invalidate,
  });

  // DELETE
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskFromSupabase,
    onSuccess: invalidate,
  });

  return {
    tasks,
    loading: isLoading,
    error: error?.message || null,
    addTask: async (data: AddTaskFormData) => addTaskMutation.mutateAsync(data),
    toggleTask: async (id: number, completed: boolean) =>
      toggleTaskMutation.mutateAsync({ id, completed }),
    completeAllTasks: async () => completeAllMutation.mutateAsync(),
    deleteTask: async (id: number) => deleteTaskMutation.mutateAsync({ id }),
  };
}
