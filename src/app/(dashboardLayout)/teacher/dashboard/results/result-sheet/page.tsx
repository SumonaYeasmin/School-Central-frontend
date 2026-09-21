import { ResultSheetView } from "@/src/components/dashboard/teacher/result-sheet/ResultSheetView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result Sheet | Teacher Portal | School Central",
  description: "View complete result sheet of your assigned class and subject.",
};

export default function ResultSheetPage() {
  return <ResultSheetView />;
}
