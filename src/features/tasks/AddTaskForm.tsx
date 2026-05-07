// AddTaskForm.tsx
import { useTranslation } from "react-i18next";
import { MutableRefObject } from "react";
import { useForm } from "react-hook-form";
import mergeRefs from "merge-refs";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, AddTaskFormData } from "./types";
import { Button } from "../../design-system/Button";
import { Input } from "../../design-system/Input";
import FormError from "../../design-system/FormError";

interface AddTaskFormProps {
  onAdd: (data: AddTaskFormData) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>; // <-- forward ref from parent
}

export default function AddTaskForm({ onAdd, inputRef }: AddTaskFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    mode: "onChange",
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 p-2">
      <div className="flex flex-col flex-1">
        <Input
          {...rest}
          ref={mergeRefs(registerRef, inputRef)}
          id="taskInput" // <--joint with label
          type="text"
          placeholder={t("placeholder")}
          autoFocus
          className="flex-1 bg-[#1A1D24] px-4 py-3 rounded-xl outline-none"
        />
        <FormError message={errors.text?.message} />
      </div>
      <Button
        type="submit"
        disabled={isDisabled}
        data-tooltip-id="app-tooltip"
        data-tooltip-content={t("taskRequired")}
        variant="addTask"
        // size="full"
      >
        <span
          className="
    text-[30px]
    leading-none
    font-light

    flex
    items-center
    justify-center

    relative
    -top-[3px]
  "
        >
          +
        </span>
      </Button>
    </form>
  );
}
