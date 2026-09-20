import { Metadata } from "next";
import { ParentsHeader } from "@/src/components/dashboard/admin/parents/ParentsHeader";
import { ParentsStats } from "@/src/components/dashboard/admin/parents/ParentsStats";
import { ParentsDirectory } from "@/src/components/dashboard/admin/parents/ParentsDirectory";

export const metadata: Metadata = {
  title: "Parents & Guardians | School Central Admin",
  description: "Keep every family connection close to the classroom.",
};

export default function ParentsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Parent Button */}
      <ParentsHeader />

      {/* 2. Top Summary KPI Stats (4 Cards) */}
      <ParentsStats />

      {/* 3. Family Directory (Card Grid View & Table View) */}
      <ParentsDirectory />
    </div>
  );
}
