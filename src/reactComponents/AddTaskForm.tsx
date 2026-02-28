// AddTaskForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormData } from "../utils";
import { useIntl, FormattedMessage } from "react-intl";
import { Tooltip } from "react-tooltip";

interface AddTaskFormProps {
  onAdd: (task: string) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const intl = useIntl(); // <-- hook do pobierania tłumaczeń

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      task: "",
    },
  });

  const isDisabled = !isDirty || isSubmitting;

  const onSubmit = (data: TaskFormData) => {
    onAdd(data.task);
    console.log("dodany task w form: ", data.task);
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
          className="bg-gray-50 flex-1 border outline-none rounded-sm caret-teal-600 border-gray-300 pl-2.5"
          {...register("task")}
        />
        <div>
          {/* Tooltip */}
          {isDisabled && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-red-700 text-white text-xs rounded-b-4xl px-2 py-1 whitespace-nowrap z-10">
              <FormattedMessage id="taskRequired" />
            </span>
          )}
          <button
            id="taskButton"
            type="submit"
            disabled={!isDirty || isSubmitting}
            className=" px-2.5 py-2  bg-teal-500 text-white border-0 rounded-sm
    cursor-pointer transform transition duration-1000
    hover:brightness-110 hover:scale-110 active:brightness-150
    disabled:cursor-not-allowed  disabled:hover:scale-100"
          >
            <FormattedMessage id="writeTask" />
          </button>
          {isDisabled && (
            <Tooltip
              anchorSelect="button[id='taskButton']"
              className="bg-slate-400! font-bold!
              text-white! px-2! py-2! rounded! text-base!"
              place="top"
              content={intl.formatMessage({ id: "taskRequired" })}
            />
          )}
        </div>
      </form>
      {errors.task && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.task?.message}
        </span>
      )}
    </div>
  );
}
