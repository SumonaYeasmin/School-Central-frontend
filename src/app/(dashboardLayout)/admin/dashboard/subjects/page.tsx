
"use client";

import { SubjectsHeader } from "@/src/components/dashboard/admin/subjects/SubjectsHeader";
import { SubjectsStats } from "@/src/components/dashboard/admin/subjects/SubjectsStats";
import { SubjectsTable } from "@/src/components/dashboard/admin/subjects/SubjectsTable";
import { useEffect, useState } from "react";
import { getSubjects } from "@/src/services/academicService";
import { Loader2 } from "lucide-react";

export default function SubjectsPage() {

  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const data = await getSubjects();
        setSubjects(data || []);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Subject Button */}
      <SubjectsHeader />

      {/* 2. Top Summary KPI Stats (3 cards: Subjects, Core, Optional) */}
      <SubjectsStats subjects={subjects}/>

     {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading subjects from database...</p>
        </div>
      ) : (
        <SubjectsTable subjects={subjects} />
      )}
    </div>
  );
}
