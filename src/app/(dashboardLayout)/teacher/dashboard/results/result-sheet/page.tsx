import { MyResultsView } from "@/src/components/dashboard/teacher/my-results/MyResultsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result Sheet | Teacher Portal | School Central",
  description: "View and manage class result sheets and student examination performance.",
};

export default function ResultSheetPage() {
  return <MyResultsView />;
}
