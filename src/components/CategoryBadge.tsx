import { categoryBadge } from "../styles/ui";
import type { TaskCategory } from "../features/tasks/types";

interface CategoryBadgeProps {
  category: TaskCategory;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <div className={categoryBadge({ category })}>
      {category.toLowerCase()}
    </div>
  );
}