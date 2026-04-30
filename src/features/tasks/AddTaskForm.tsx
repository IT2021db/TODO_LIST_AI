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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 p-5">
      <div className="flex flex-col flex-1">
        <Input
          {...rest}
          ref={mergeRefs(registerRef, inputRef)}
          id="taskInput" // <--joint with label
          type="text"
          placeholder={t("placeholder")}
          autoFocus
          className="flex-1"
        />
        <FormError message={errors.text?.message} />
      </div>
      <Button
        type="submit"
        disabled={isDisabled}
        data-tooltip-id="app-tooltip"
        data-tooltip-content={t("taskRequired")}
        variant="primary"
      >
        {t("writeTask")}
      </Button>
    </form>
  );
}
