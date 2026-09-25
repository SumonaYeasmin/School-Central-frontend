import { Metadata } from "next";
import { TeacherWeeklyRoutineView } from "@/src/components/dashboard/teacher/routine/TeacherWeeklyRoutineView";

export const metadata: Metadata = {
  title: "Weekly Routine | Teacher Portal - Greenfield High School",
  description: "View your weekly class schedule, daily lecture sequence, timings, and class locations.",
};

export default function TeacherRoutinePage() {
  return <TeacherWeeklyRoutineView />;
}
