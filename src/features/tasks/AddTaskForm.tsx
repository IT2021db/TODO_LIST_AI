// AddTaskForm.tsx
import { useTranslation } from "react-i18next";
import { MutableRefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import mergeRefs from "merge-refs";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, AddTaskFormData } from "./types";
import { Button } from "../../design-system/Button";
import { Input } from "../../design-system/Input";
import FormError from "../../design-system/FormError";
import VoiceButton from "./VoiceButton";
import ClearInputButton from "../../components/ClearInputButton";
import { useVoiceInput } from "../hooks/useVoiceInput";

interface AddTaskFormProps {
  onAdd: (data: AddTaskFormData) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>; // <-- forward ref from parent
}

export default function AddTaskForm({ onAdd, inputRef }: AddTaskFormProps) {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const watchText = watch("text");

  const clearInput = () => {
    setValue("text", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    inputRef.current?.focus();
  };

  const { listening, browserSupportsSpeechRecognition, handleVoiceInput } =
    useVoiceInput({
      language: i18n.language,
      onTranscript: (text) => {
        setValue("text", text, {
          shouldDirty: true,
          shouldValidate: true,
        });
      },
    });

  const isDisabled = !isDirty || isSubmitting;

  // -fix conflict ref - react-hook-form
  const { ref: registerRef, ...rest } = register("text");

  const onSubmit = (data: AddTaskFormData) => {
    onAdd(data);
    setValue("text", "", {
      shouldDirty: false,
      shouldValidate: false,
    });
    reset({
      text: "",
    });
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 p-2">
      <div className="flex flex-col flex-1 relative">
        <Input
          {...rest}
          ref={mergeRefs(registerRef, inputRef)}
          id="taskInput" // <--joint with label
          type="text"
          placeholder={t("placeholder")}
          autoFocus
          className="flex-1 bg-[#1A1D24] px-4 py-3 rounded-xl outline-none pr-10"
        />
        <ClearInputButton visible={!!watchText} onClick={clearInput} />
        <FormError message={errors.text?.message} />
      </div>

      {browserSupportsSpeechRecognition && (
        <VoiceButton listening={listening} onClick={handleVoiceInput} />
      )}

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
