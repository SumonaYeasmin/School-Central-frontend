import { Metadata } from "next";
import { ParentOverviewView } from "@/src/components/dashboard/parent/ParentOverviewView";

export const metadata: Metadata = {
  title: "Parent Overview | School Central",
  description: "Parent portal dashboard overview with student metrics, routines, results, and notices.",
};

export default function ParentOverviewPage() {
  return <ParentOverviewView />;
}

