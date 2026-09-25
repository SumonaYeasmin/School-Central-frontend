import { Metadata } from "next";
import { ParentRoutineView } from "@/src/components/dashboard/parent/ParentRoutineView";

export const metadata: Metadata = {
  title: "Class Routine | Parent Portal - School Central",
  description: "Weekly period schedule and timetable for enrolled children.",
};

export default function ParentRoutinesPage() {
  return <ParentRoutineView />;
}
