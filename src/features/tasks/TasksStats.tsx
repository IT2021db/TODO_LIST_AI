import StatTile from "../../components/StatTile";

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

return(
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <StatTile
              label="Completed"
              value={completedCount}
              color="green"
              progress={completedProgress}
            />

            <StatTile
              label="In Progress"
              value={unCompletedCount}
              color="blue"
              progress={inProgress}
            />

            <StatTile
              label="Scheduled"
              value={totalCount}
              color="purple"
            />

            <StatTile label="High Priority" value={0} color="red" />
          </div>
);
}