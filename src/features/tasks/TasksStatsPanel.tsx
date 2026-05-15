import StatTile from "../../components/StatTile";
import { useTranslation } from "react-i18next";

interface TasksStatsProps {
  completedCount: number;
  unCompletedCount: number;
  totalCount: number;
  completedProgress: number;
  inProgress: number;
}

export default function TasksStats({
  completedCount,
  unCompletedCount,
  totalCount,
  completedProgress,
  inProgress,
}: TasksStatsProps){
  const { t, i18n } = useTranslation();

return(
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <StatTile
              label={t("completed")}
              value={completedCount}
              color="green"
              progress={completedProgress}
            />

            <StatTile
              label={t("inProgress")}
              value={unCompletedCount}
              color="blue"
              progress={inProgress}
            />

            <StatTile
              label={t("scheduled")}
              value={totalCount}
              color="purple"
            />

            <StatTile label={t("highPriority")} value={0} color="red" />
          </div>
);
}