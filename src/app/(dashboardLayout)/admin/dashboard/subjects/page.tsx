import { Metadata } from "next";
import { SubjectsHeader } from "@/src/components/dashboard/admin/subjects/SubjectsHeader";
import { SubjectsStats } from "@/src/components/dashboard/admin/subjects/SubjectsStats";
import { SubjectsTable } from "@/src/components/dashboard/admin/subjects/SubjectsTable";

export const metadata: Metadata = {
  title: "Subjects | School Central Admin",
  description: "A clear view of curriculum coverage and weekly teaching load.",
};

export default function SubjectsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Subject Button */}
      <SubjectsHeader />

      {/* 2. Top Summary KPI Stats (3 cards: Subjects, Core, Optional) */}
      <SubjectsStats />

      {/* 3. Subject Directory Table with Actions & Search */}
      <SubjectsTable />
    </div>
  );
}
