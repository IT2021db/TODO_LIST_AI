import { useTranslation } from "react-i18next";
import { categoryBadge } from "../styles/ui";
import type { TaskCategory } from "../features/tasks/types";

interface CategoryBadgeProps {
  category: TaskCategory;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const { t } = useTranslation();

  return (
    <div className={categoryBadge({ category })}>
      {t(`categories.${category}`)}
    </div>
  );
}
