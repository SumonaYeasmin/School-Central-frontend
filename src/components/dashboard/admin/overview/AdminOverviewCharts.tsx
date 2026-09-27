"use client";

import { StudentEnrollmentChart } from "./charts/StudentEnrollmentChart";
import { WeeklyAttendanceChart } from "./charts/WeeklyAttendanceChart";
import { DepartmentDistributionChart } from "./charts/DepartmentDistributionChart";

interface AdminOverviewChartsProps {
  students: any[];
  teachers: any[];
  classes: any[];
  isLoading?: boolean;
}

export function AdminOverviewCharts({
  students = [],
  teachers = [],
  classes = [],
  isLoading = false,
}: AdminOverviewChartsProps) {
  return (
    <div className="space-y-6">
      {/* Top 2 Primary Charts: Enrollment (Bar) & Attendance Trends (Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentEnrollmentChart
          students={students}
          classes={classes}
          isLoading={isLoading}
        />
        <WeeklyAttendanceChart isLoading={isLoading} />
      </div>

      {/* Secondary Chart: Faculty Department Share (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DepartmentDistributionChart
            teachers={teachers}
            isLoading={isLoading}
          />
        </div>
        {/* Placeholder slot for right widgets */}
      </div>
    </div>
  );
}
