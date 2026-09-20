"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStudentById } from "@/src/services/academicService";
import { Student } from "@/src/types/student";
import {
  StudentDetailsBreadcrumb,
  StudentProfileCard,
  StudentAcademicInfo,
  StudentPersonalInfo,
  StudentParentInfo,
  StudentDetailSkeleton,
  StudentNotFound,
} from "@/src/components/dashboard/admin/students/details";

export default function StudentDetailsPage() {
  const params = useParams();
  const studentId = params?.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudentDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getStudentById(studentId);
        setStudent(data);
      } catch (err: any) {
        console.error("Failed to load student details:", err);
        setError(err?.response?.data?.message || "Student details not found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (isLoading) {
    return <StudentDetailSkeleton />;
  }

  if (error || !student) {
    return <StudentNotFound error={error} />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Navigation & Breadcrumb */}
      <StudentDetailsBreadcrumb studentName={student.name} />

      {/* 2. Top Profile Hero Card */}
      <StudentProfileCard student={student} />

      {/* 3. Academic & Personal Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudentAcademicInfo student={student} />
        <StudentPersonalInfo student={student} />
      </div>

      {/* 4. Guardian & Parent Information Card */}
      <StudentParentInfo parents={student.parents} />
    </div>
  );
}
