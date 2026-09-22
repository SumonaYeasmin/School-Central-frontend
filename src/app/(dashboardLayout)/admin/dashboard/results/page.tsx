import { AdminResultsView } from "@/src/components/dashboard/admin/results/AdminResultsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result Management & Sheet | Admin Portal | School Central",
  description: "View, verify, and publish complete student examination result sheets across all classes.",
};

export default function AdminResultsPage() {
  return <AdminResultsView />;
}
