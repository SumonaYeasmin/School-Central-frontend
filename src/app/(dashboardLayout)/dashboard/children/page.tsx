import { Metadata } from "next";
import { MyChildrenView } from "@/src/components/dashboard/parent/MyChildrenView";

export const metadata: Metadata = {
  title: "My Children | Parent Portal - School Central",
  description: "View details of your linked children, enrolled classes, sections, roll numbers, and academic performance.",
};

export default function MyChildrenPage() {
  return <MyChildrenView />;
}
