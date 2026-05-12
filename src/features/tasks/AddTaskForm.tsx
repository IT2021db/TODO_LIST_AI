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
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(taskFormSchema),
    mode: "onChange",
    defaultValues: {
      text: "",
      category: "work",
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
    console.log("FORM DATA:", data);
    onAdd(data);

    reset({
      text: "",
      category: "work",
    });
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-2">
      {/* pierwszy rząd: input + mikrofon + plus */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col flex-1">
          <div className="relative">
            <Input
              {...rest}
              ref={mergeRefs(registerRef, inputRef)}
              id="taskInput" // <--joint with label
              type="text"
              placeholder={t("placeholder")}
              autoFocus
            />

            <ClearInputButton visible={!!watchText} onClick={clearInput} />
          </div>
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
      </div>
      {/* drugi rząd: select category */}
      <select
        {...register("category")}
        className="
        shrink-0
      h-12
      shrink-0
      rounded-xl
      bg-[#1A1D24]
      border
      border-white/5
      px-3
      text-sm
      text-gray-400
      outline-none
      cursor-pointer
    "
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="health">Health</option>
        <option value="priority">Priority</option>
      </select>
    </form>
  );
}
