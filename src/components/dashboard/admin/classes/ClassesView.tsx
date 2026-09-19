import { ClassesHeader } from "./ClassesHeader";
import { ClassesStats } from "./ClassesStats";
import { ClassesTable } from "./ClassesTable";

export function ClassesView() {
  return (
    <div className="space-y-6">
      {/* 1. Header with Search and Actions */}
      <ClassesHeader />

      {/* 2. Top 2 Summary KPI Cards */}
      <ClassesStats />

      {/* 3. Main Data Table View */}
      <ClassesTable />
    </div>
  );
}
