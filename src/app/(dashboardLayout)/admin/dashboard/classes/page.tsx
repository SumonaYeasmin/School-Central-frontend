import { Metadata } from "next";
import { ClassesView } from "@/src/components/dashboard/admin/classes/ClassesView";

export const metadata: Metadata = {
  title: "Classes & Sections | School Central Admin",
  description: "Manage academic classes, sections, and classroom allocations.",
};

export default function AdminClassesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ClassesView />
    </div>
  );
}
