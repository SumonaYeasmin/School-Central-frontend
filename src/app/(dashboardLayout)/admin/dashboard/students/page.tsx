"use client";

import { useEffect, useState } from "react";
import { StudentsHeader } from "@/src/components/dashboard/admin/students/StudentsHeader";
import { StudentsStats } from "@/src/components/dashboard/admin/students/StudentsStats";
import { StudentsTable } from "@/src/components/dashboard/admin/students/StudentsTable";
import { getStudents } from "@/src/services/academicService";
import { Student } from "@/src/types/student";
import { Loader2 } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const data = await getStudents();
        setStudents(data || []);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Student Button */}
      <StudentsHeader />

      {/* 2. Top Summary KPI Stats */}
      <StudentsStats totalStudents={students.length} />

      {/* 3. Enrolled Students Table with Details Action Button */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading students from database...</p>
        </div>
      ) : (
        <StudentsTable students={students} />
      )}
    </div>
  );
}
