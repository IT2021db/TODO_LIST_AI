import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, AddTaskFormData } from "./utils";
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
    mutationFn: ({ id, isCompleted }: { id: [Task]; isCompleted: [Task] }) =>
      toggleTaskInSupabase(id, isCompleted),

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
    addTask: (text: AddTaskFormData) => addTaskMutation.mutate(text),
    toggleTask: (id: [Task], isCompleted: [Task]) =>
      toggleTaskMutation.mutate({ id, isCompleted }),
    completeAllTasks: () => completeAllMutation.mutate(),
    deleteTask: (id: [Task]) => deleteTaskMutation.mutate(id),
  };
}
