import { useTranslation } from "react-i18next";
import { Button } from "../../design-system/Button";
interface TasksPanelActionsProps {
  hideCompleted: boolean;
  allCompleted: boolean;
  hasUncompleted: boolean;
  onToggleHide: () => void;
  onCompleteAll: () => void;
}

export default function TasksPanelActions({
  hideCompleted,
  allCompleted,
  hasUncompleted,
  onToggleHide,
  onCompleteAll,
}: TasksPanelActionsProps) {
  const { t } = useTranslation();
  return (
    <>
      <Button variant="secondary" onClick={onToggleHide}>
        {hideCompleted ? t("showwCompleted") : t("hideCompleted")}
      </Button>

      <Button
        variant={allCompleted ? "ghost" : "secondary"}
        disabled={!hasUncompleted}
        onClick={onCompleteAll}
      >
        {allCompleted ? t("allCompleted") : t("completeAll")}
      </Button>
    </>
  );
}
