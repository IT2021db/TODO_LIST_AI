import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, AddTaskFormData, TasksService } from "./types";
import {
  fetchTasksFromSupabase,
  addTaskToSupabase,
  toggleTaskInSupabase,
  completeAllTasksInSupabase,
  deleteTaskFromSupabase,
} from "./tasksService";

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
    mutationFn: ({ id, isCompleted }: { id: [Task]; isCompleted: [Task] }) =>
      toggleTaskInSupabase(id, isCompleted),

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
    addTask: (text: AddTaskFormData) => addTaskMutation.mutate(text),
    toggleTask: (id: [Task], isCompleted: [Task]) =>
      toggleTaskMutation.mutate({ id, isCompleted }),
    completeAllTasks: () => completeAllMutation.mutate(),
    deleteTask: (id: [Task]) => deleteTaskMutation.mutate(id),
  };
}
