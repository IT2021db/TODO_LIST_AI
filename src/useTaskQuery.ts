import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "./utils";
import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "./tasksService";

export default function useTasksQuery() {
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

  // ADD
  const addTaskMutation = useMutation({
    mutationFn: addTaskToSupabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // TOGGLE
  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTaskInSupabase(id, completed),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // COMPLETE ALL
  const completeAllMutation = useMutation({
    mutationFn: completeAllTasksInSupabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // DELETE
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskFromSupabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    loading: isLoading,
    error: error?.message || null,
    addTask: (text: string) => addTaskMutation.mutate(text),
    toggleTask: (id: number, completed: boolean) => toggleTaskMutation.mutate({ id, completed }),
    completeAllTasks: () => completeAllMutation.mutate(),
    deleteTask: (id: number) => deleteTaskMutation.mutate(id),
  };
}
