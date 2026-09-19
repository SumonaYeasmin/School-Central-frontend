import { AdminOverviewHeader } from "@/src/components/dashboard/admin/overview/AdminOverviewHeader";
import { AdminOverviewStats } from "@/src/components/dashboard/admin/overview/AdminOverviewStats";
import { TodayClassSchedule } from "@/src/components/dashboard/admin/overview/TodayClassSchedule";
import { RecentAdmissions } from "@/src/components/dashboard/admin/overview/RecentAdmissions";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with action buttons */}
      <AdminOverviewHeader />

      {/* 2. Top Summary Metric Cards */}
      <AdminOverviewStats />

      {/* 3. Class Schedule and Recent Admissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayClassSchedule />
        <RecentAdmissions />
      </div>
    </div>
  );
}
