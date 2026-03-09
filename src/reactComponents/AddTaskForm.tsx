// AddTaskForm.tsx
import { MutableRefObject } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, AddTaskFormData } from "../types";
import { useIntl, FormattedMessage } from "react-intl";
import { Tooltip } from "react-tooltip";

interface AddTaskFormProps {
  onAdd: (data: AddTaskFormData) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>; // <-- forward ref from parent
  locale: string; //potrzebne do triggera useEffect po zmianie języka
}

export default function AddTaskForm({
  onAdd,
  inputRef,
  locale,
}: AddTaskFormProps) {
  const intl = useIntl(); // <-- hook for loading translations
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      text: "",
    },
  });

  const isDisabled = !isDirty || isSubmitting;

  // -fix conflict ref - react-hook-form
  const { ref: registerRef, ...rest } = register("text");

  const onSubmit = (data: AddTaskFormData) => {
    onAdd(data);
    reset();
    inputRef.current?.focus();
  };

  return (
    <div className="bg-gray-50 mb-2.5">
      <h2 className="text-2xl font-bold border-b border-gray-300 p-5">
        <label htmlFor="taskInput">
          <FormattedMessage id="addTask" />
        </label>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 p-5">
        <input
          {...rest} // rest of register props
          ref={(el) => {
            registerRef(el); // hook form works
            inputRef.current = el; // my focus
          }}
          id="taskInput" // <--joint with label
          type="text"
          placeholder={intl.formatMessage({ id: "placeholder" })}
          className="bg-gray-50 flex-1 border outline-none rounded-sm caret-teal-600 border-gray-300 pl-2.5"
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
      {errors.text && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.text?.message}
        </span>
      )}
    </div>
  );
}
