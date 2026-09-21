"use client";

import { useEffect, useState } from "react";
import { AdminOverviewHeader } from "@/src/components/dashboard/admin/overview/AdminOverviewHeader";
import { AdminOverviewStats } from "@/src/components/dashboard/admin/overview/AdminOverviewStats";
import { TodayClassSchedule } from "@/src/components/dashboard/admin/overview/TodayClassSchedule";
import { RecentAdmissions } from "@/src/components/dashboard/admin/overview/RecentAdmissions";
import {
  getStudents,
  getClasses,
  getSubjects,
  getRoutines,
} from "@/src/services/academicService";
import { getTeachers } from "@/src/services/teacherService";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [routines, setRoutines] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        const [
          studentsRes,
          teachersRes,
          classesRes,
          subjectsRes,
          routinesRes,
        ] = await Promise.allSettled([
          getStudents(),
          getTeachers(),
          getClasses(),
          getSubjects(),
          getRoutines(),
        ]);

        if (studentsRes.status === "fulfilled" && Array.isArray(studentsRes.value)) {
          setStudents(studentsRes.value);
        }
        if (teachersRes.status === "fulfilled" && Array.isArray(teachersRes.value)) {
          setTeachers(teachersRes.value);
        }
        if (classesRes.status === "fulfilled" && Array.isArray(classesRes.value)) {
          setClasses(classesRes.value);
        }
        if (subjectsRes.status === "fulfilled" && Array.isArray(subjectsRes.value)) {
          setSubjects(subjectsRes.value);
        }
        if (routinesRes.status === "fulfilled") {
          const val = routinesRes.value;
          const routineList = Array.isArray(val) ? val : val?.routines || [];
          setRoutines(routineList);
        }
      } catch (error) {
        console.error("Failed to load admin dashboard overview data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Compute aggregate statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalSections = classes.reduce(
    (acc, curr) => acc + (curr.sections?.length || 0),
    0
  );
  const totalSubjects = subjects.length;
  const activeDepartments = new Set(
    teachers.map((t) => t.department).filter(Boolean)
  ).size;

  return (
    <div className="space-y-6 container mx-auto">
      {/* 1. Header with action buttons */}
      <AdminOverviewHeader />

      {/* 2. Top Summary Metric Cards */}
      <AdminOverviewStats
        totalStudents={totalStudents}
        totalTeachers={totalTeachers}
        totalClasses={totalClasses}
        totalSections={totalSections}
        totalSubjects={totalSubjects}
        activeDepartments={activeDepartments}
      />

      {/* 3. Class Schedule and Recent Admissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayClassSchedule routines={routines} isLoading={isLoading} />
        <RecentAdmissions students={students} isLoading={isLoading} />
      </div>
    </div>
  );
}
