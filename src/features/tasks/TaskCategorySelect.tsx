import { useTranslation } from "react-i18next";
import { categoryBadge } from "../../styles/ui";
import { taskCategories } from "./types";
import type { TaskCategory } from "./types";

interface TaskCategorySelectProps {
  category: TaskCategory;
  onChange: (category: TaskCategory) => void;
}

export default function TaskCategorySelect({
  category,
  onChange,
}: TaskCategorySelectProps) {
  const { t } = useTranslation();

  return (
    <select
      value={category}
      onChange={(event) => {
        onChange(event.target.value as TaskCategory);
      }}
      className={`
        ${categoryBadge({ category })}
        border-none
        outline-none
        cursor-pointer
        bg-[#1A1D24]
        text-gray-100
      `}
      title={t("changeCategory")}
    >
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
  );
}