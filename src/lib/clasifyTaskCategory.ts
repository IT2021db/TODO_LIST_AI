import type { TaskCategory } from "../features/tasks/types";

export function classifyTaskCategory(text: string): TaskCategory {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("lekarz") ||
    lowerText.includes("doctor") ||
    lowerText.includes("health") ||
    lowerText.includes("badania")
  ) {
    return "health";
  }

  if (
    lowerText.includes("kup") ||
    lowerText.includes("buy") ||
    lowerText.includes("zakupy")
  ) {
    return "shopping";
  }

  if (
    lowerText.includes("ogród") ||
    lowerText.includes("garden") ||
    lowerText.includes("podlej") ||
    lowerText.includes("kwiaty")
  ) {
    return "garden";
  }

  if (
    lowerText.includes("pilne") ||
    lowerText.includes("urgent") ||
    lowerText.includes("ważne")
  ) {
    return "urgent";
  }

  if (
    lowerText.includes("praca") ||
    lowerText.includes("work") ||
    lowerText.includes("projekt")
  ) {
    return "work";
  }

  if (
    lowerText.includes("dom") ||
    lowerText.includes("home") ||
    lowerText.includes("sprząt")
  ) {
    return "home";
  }

  return "other";
}