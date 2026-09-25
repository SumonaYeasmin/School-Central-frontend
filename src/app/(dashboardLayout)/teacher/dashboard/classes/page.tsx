import { Metadata } from "next";
import { MyClassesView } from "@/src/components/dashboard/teacher/classes/MyClassesView";

export const metadata: Metadata = {
  title: "My Classes | Faculty Portal - School Central",
  description: "View assigned classes, sections, subjects, and student rosters.",
};

export default function MyClassesPage() {
  return <MyClassesView />;
}
