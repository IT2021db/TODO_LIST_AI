import { useTranslation } from "react-i18next";
import { taskCategories } from "./types";
import type { TaskCategory } from "./types";

interface TaskCategoryFilterProps {
  value: TaskCategory | "all";
  onChange: (category: TaskCategory | "all") => void;
}

export default function TaskCategoryFilter({
  value,
  onChange,
}: TaskCategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-3 flex justify-end">
      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value as TaskCategory | "all");
        }}
        className="
          rounded-xl
          bg-[#1A1D24]
          border
          border-white/10
          px-3
          py-2
          text-sm
          text-gray-100
          outline-none
          cursor-pointer
        "
      >
        <option value="all" className="bg-[#1A1D24] text-gray-100">
          {t("allCategories")}
        </option>

        {taskCategories.map((category) => (
          <option
            key={category}
            value={category}
            className="bg-[#1A1D24] text-gray-100"
          >
            {t(`categories.${category}`)}
          </option>
        ))}
      </select>
    </div>
  );
}