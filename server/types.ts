export const taskCategories = [
  "work",
  "home",
  "health",
  "shopping",
  "garden",
  "urgent",
  "other",
] as const;

export type TaskCategory = (typeof taskCategories)[number];