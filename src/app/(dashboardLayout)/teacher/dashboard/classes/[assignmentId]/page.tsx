import { Metadata } from "next";
import { EnrolledStudentsView } from "@/src/components/dashboard/teacher/classes/EnrolledStudentsView";

export const metadata: Metadata = {
  title: "Enrolled Students | Faculty Portal - School Central",
  description: "View full student roster and parent contact details.",
};

interface PageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

export default async function EnrolledStudentsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <EnrolledStudentsView assignmentId={resolvedParams.assignmentId} />;
}
