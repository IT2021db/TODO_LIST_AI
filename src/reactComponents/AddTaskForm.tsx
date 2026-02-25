// AddTaskForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormData } from "../utils";
import { useIntl, FormattedMessage } from "react-intl";

interface AddTaskFormProps {
  onAdd: (task: string) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const intl = useIntl(); // <-- hook do pobierania tłumaczeń
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    onAdd(data.task);
    console.log("dodany task w form", data.task);
    reset();
  };

  return (
    <div className="bg-gray-50 mb-2.5">
      <h2 className="text-2xl font-bold border-b border-gray-300 p-5">
        <FormattedMessage id="addTask" />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 p-5">
        <input
          autoFocus
          type="text"
          placeholder={intl.formatMessage({ id: "placeholder" })}
          className="bg-gray-50 flex-1 border outline-none rounded-sm border-gray-300 pl-2.5"
          {...register("task")}
        />
        <button
          type="submit"
          className="px-2.5 py-2 bg-teal-500 text-white border-0 cursor-pointer rounded-sm
            transform transition duration-1000 hover:brightness-110 hover:scale-110
            active:brightness-150"
        >
          <FormattedMessage id="writeTask" />
        </button>
      </form>
      {errors.task && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.task?.message}
        </span>
      )}
    </div>
  );
}
