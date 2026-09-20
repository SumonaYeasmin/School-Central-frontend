import { Metadata } from "next";
import { StudentsHeader } from "@/src/components/dashboard/admin/students/StudentsHeader";
import { StudentsStats } from "@/src/components/dashboard/admin/students/StudentsStats";
import { StudentsTable } from "@/src/components/dashboard/admin/students/StudentsTable";

export const metadata: Metadata = {
  title: "Students Directory | School Central Admin",
  description: "A focused directory for enrollment, class placement, and academic follow-up.",
};

export default function StudentsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Student Button */}
      <StudentsHeader />

      {/* 2. Top Summary KPI Stats (4 Cards) */}
      <StudentsStats />

      {/* 3. Enrolled Students Table with Details Action Button */}
      <StudentsTable />
    </div>
  );
}
