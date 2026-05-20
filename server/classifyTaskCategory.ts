import type { TaskCategory } from "./types";
export function classifyTaskCategory(text: string): TaskCategory {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("pilne") ||
    lowerText.includes("ważne") ||
    lowerText.includes("urgent") ||
    lowerText.includes("asap") ||
    lowerText.includes("deadline")
  ) {
    return "urgent";
  }

  if (
    lowerText.includes("lekarz") ||
    lowerText.includes("badania") ||
    lowerText.includes("dentysta") ||
    lowerText.includes("apteka") ||
    lowerText.includes("zdrowie") ||
    lowerText.includes("doctor") ||
    lowerText.includes("health")
  ) {
    return "health";
  }

  if (
    lowerText.includes("kup") ||
    lowerText.includes("kupić") ||
    lowerText.includes("zakupy") ||
    lowerText.includes("sklep") ||
    lowerText.includes("mleko") ||
    lowerText.includes("chleb") ||
    lowerText.includes("buy") ||
    lowerText.includes("shopping")
  ) {
    return "shopping";
  }

  if (
    lowerText.includes("ogród") ||
    lowerText.includes("ogrod") ||
    lowerText.includes("podlej") ||
    lowerText.includes("podlać") ||
    lowerText.includes("kwiaty") ||
    lowerText.includes("trawnik") ||
    lowerText.includes("garden")
  ) {
    return "garden";
  }

  if (
    lowerText.includes("praca") ||
    lowerText.includes("projekt") ||
    lowerText.includes("meeting") ||
    lowerText.includes("spotkanie") ||
    lowerText.includes("mail") ||
    lowerText.includes("work")
  ) {
    return "work";
  }

  if (
    lowerText.includes("dom") ||
    lowerText.includes("sprząt") ||
    lowerText.includes("pranie") ||
    lowerText.includes("gotowanie") ||
    lowerText.includes("home")
  ) {
    return "home";
  }

  return "other";
}