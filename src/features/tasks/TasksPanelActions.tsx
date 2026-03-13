import { FormattedMessage } from "react-intl";
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
  return (
    <>
      <Button variant="ghost" onClick={onToggleHide}>
        {hideCompleted ? (
          <FormattedMessage id="showCompleted" />
        ) : (
          <FormattedMessage id="hideCompleted" />
        )}
      </Button>

      <Button
        variant={allCompleted ? "secondary" : "ghost"}
        disabled={!hasUncompleted}
        onClick={onCompleteAll}
      >
        {allCompleted ? (
          <FormattedMessage id="allCompleted" />
        ) : (
          <FormattedMessage id="completeAll" />
        )}
      </Button>
    </>
  );
}