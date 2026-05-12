import { categoryBadge } from "../styles/ui";

type Category =
  | "work"
  | "personal"
  | "health"
  | "priority";

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({
  category,
}: CategoryBadgeProps) {
  return (
    <div
      className={categoryBadge({
        category,
      })}
    >
      {category.toLowerCase()}
    </div>
  );
}