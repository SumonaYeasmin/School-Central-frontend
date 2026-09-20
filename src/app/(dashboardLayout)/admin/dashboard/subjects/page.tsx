"use client";

import { useEffect, useState, useCallback } from "react";
import { SubjectsHeader } from "@/src/components/dashboard/admin/subjects/SubjectsHeader";
import { SubjectsStats } from "@/src/components/dashboard/admin/subjects/SubjectsStats";
import { SubjectsTable } from "@/src/components/dashboard/admin/subjects/SubjectsTable";
import { AddSubjectModal } from "@/src/components/dashboard/admin/subjects/AddSubjectModal";
import { getSubjects, getClasses, createSubject } from "@/src/services/academicService";
import { Loader2 } from "lucide-react";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [subjectsData, classesData] = await Promise.all([
        getSubjects(),
        getClasses(),
      ]);
      setSubjects(subjectsData || []);
      setClasses(classesData || []);
    } catch (error) {
      console.error("Failed to fetch subjects or classes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddSubject = async (subjectData: {
    name: string;
    code?: string;
    classId: string;
  }) => {
    await createSubject(subjectData);
    await fetchData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Subject Button */}
      <SubjectsHeader onAddSubject={() => setIsAddModalOpen(true)} />

      {/* 2. Top Summary KPI Stats (3 cards: Subjects, Core, Optional) */}
      <SubjectsStats subjects={subjects} />

      {/* 3. Subjects Table or Loading Spinner */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading subjects from database...</p>
        </div>
      ) : (
        <SubjectsTable
          subjects={subjects}
          availableClasses={classes}
          onRefresh={fetchData}
        />
      )}

      {/* 4. Add Subject Modal */}
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableClasses={classes}
        onAdd={handleAddSubject}
      />
    </div>
  );
}
