// AddTaskForm.tsx
import { useTranslation } from "react-i18next";
import { MutableRefObject, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!transcript) return;

    setValue("text", transcript, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [transcript, setValue]);

  const clearInput = () => {
  setValue("text", "", {
    shouldDirty: true,
    shouldValidate: true,
  });
  

 

  inputRef.current?.focus();
};
 const watchText = watch("text");
  const speechLanguages: Record<string, string> = {
    pl: "pl-PL",
    en: "en-US",
    es: "es-ES",
  };

  const handleVoiceInput = async () => {
    resetTranscript();

    await SpeechRecognition.startListening({
      continuous: false,
      language: speechLanguages[i18n.language] || "pl-PL",
    });
  };

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
          {watchText && watchText.length > 0 && (
    <button
      type="button"
      onClick={clearInput}
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-gray-400
        hover:text-white
        hover:scale-110
        transition
      "
    >
     ×
    </button>
  )}
        <FormError  message={errors.text?.message}  />
      </div>

      {browserSupportsSpeechRecognition && (
        <Button type="button" onClick={handleVoiceInput} variant="transparent">
          <span
            className={`
      ${listening ? "animate-pulse scale-110" : ""}
  `}
          >
            {listening ? "🔴" : "🎤"}
          </span>
        </Button>
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
