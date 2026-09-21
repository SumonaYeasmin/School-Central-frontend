import { MyResultsView } from "@/src/components/dashboard/teacher/my-results/MyResultsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Student Results | Teacher Portal | School Central",
  description: "View and manage entered student examination marks and performance.",
};

export default function MyStudentResultsPage() {
  return <MyResultsView />;
}
