"use client";

import { useEffect, useState, useCallback } from "react";
import { StudentsHeader } from "@/src/components/dashboard/admin/students/StudentsHeader";
import { StudentsStats } from "@/src/components/dashboard/admin/students/StudentsStats";
import { StudentsTable } from "@/src/components/dashboard/admin/students/StudentsTable";
import { AddStudentModal } from "@/src/components/dashboard/admin/students/AddStudentModal";
import { getStudents, getClasses, createStudent } from "@/src/services/academicService";
import { Student } from "@/src/types/student";
import { Loader2 } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [studentsData, classesData] = await Promise.all([
        getStudents(),
        getClasses().catch(() => []),
      ]);
      setStudents(studentsData || []);
      setClasses(classesData || []);
    } catch (error) {
      console.error("Failed to fetch students/classes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddStudent = async (studentData: {
    name: string;
    studentId: string;
    classId: string;
    sectionId: string;
    roll: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    dateOfBirth?: string;
    admissionDate?: string;
    status?: "ACTIVE" | "INACTIVE";
  }) => {
    await createStudent(studentData);
    await fetchData();
  };

  // Calculate live dynamic counts for stats
  const totalSections = classes.reduce(
    (acc, cls) => acc + (cls.sections?.length || 0),
    0
  );

  return (
    <div className="space-y-6 container mx-auto">
      {/* 1. Header with Breadcrumb and Add Student Button */}
      <StudentsHeader onAddStudent={() => setIsAddModalOpen(true)} />

      {/* 2. Top Summary KPI Stats */}
      <StudentsStats
        totalStudents={students.length}
        activeSections={totalSections > 0 ? totalSections : undefined}
      />

      {/* 3. Enrolled Students Table with Class / Section Pills & Search */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading students from database...</p>
        </div>
      ) : (
        <StudentsTable students={students} classesList={classes} />
      )}

      {/* 4. Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableClasses={classes}
        onAdd={handleAddStudent}
      />
    </div>
  );
}
