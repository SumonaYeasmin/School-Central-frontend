import { Metadata } from "next";
import { TeachersHeader } from "@/src/components/dashboard/admin/teachers/TeachersHeader";
import { TeachersStats } from "@/src/components/dashboard/admin/teachers/TeachersStats";
import { TeachersTable } from "@/src/components/dashboard/admin/teachers/TeachersTable";

export const metadata: Metadata = {
  title: "Teaching Staff | School Central Admin",
  description: "See who teaches what, where, and how many students they support.",
};

export default function TeachersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Teacher Button */}
      <TeachersHeader />

      {/* 2. Top Summary KPI Stats (4 Cards) */}
      <TeachersStats />

      {/* 3. People Directory Table with Details Action Button */}
      <TeachersTable />
    </div>
  );
}
