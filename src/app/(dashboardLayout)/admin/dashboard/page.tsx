"use client";

import { useEffect, useState } from "react";
import { AdminOverviewHeader } from "@/src/components/dashboard/admin/overview/AdminOverviewHeader";
import { AdminOverviewStats } from "@/src/components/dashboard/admin/overview/AdminOverviewStats";
import { RecentAdmissions } from "@/src/components/dashboard/admin/overview/RecentAdmissions";
import { RecentNoticesWidget } from "@/src/components/dashboard/admin/overview/RecentNoticesWidget";
import { StudentEnrollmentChart } from "@/src/components/dashboard/admin/overview/charts/StudentEnrollmentChart";
import { WeeklyAttendanceChart } from "@/src/components/dashboard/admin/overview/charts/WeeklyAttendanceChart";
import { DepartmentDistributionChart } from "@/src/components/dashboard/admin/overview/charts/DepartmentDistributionChart";
import {
  getStudents,
  getClasses,
  getSubjects,
} from "@/src/services/academicService";
import { getTeachers } from "@/src/services/teacherService";
import { getNotices } from "@/src/services/noticeService";
import { Notice } from "@/src/types/notice";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        const [
          studentsRes,
          teachersRes,
          classesRes,
          subjectsRes,
          noticesRes,
        ] = await Promise.allSettled([
          getStudents(),
          getTeachers(),
          getClasses(),
          getSubjects(),
          getNotices(),
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
        if (noticesRes.status === "fulfilled" && Array.isArray(noticesRes.value)) {
          setNotices(noticesRes.value);
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
    <div className="space-y-6 sm:space-y-7 container mx-auto pb-10">
      {/* 1. Header with quick actions */}
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

      {/* 3. Recharts Analytics Grid (Row 1: Enrollment Bar Chart + Attendance Area Trend) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentEnrollmentChart
          students={students}
          classes={classes}
          isLoading={isLoading}
        />
        <WeeklyAttendanceChart isLoading={isLoading} />
      </div>

      {/* 4. Row 2: Department Share Donut + Recent Notices Widget + Recent Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Faculty Department Distribution Donut */}
        <DepartmentDistributionChart
          teachers={teachers}
          isLoading={isLoading}
        />

        {/* Col 2: Latest School Notices & Announcements */}
        <RecentNoticesWidget
          notices={notices}
          isLoading={isLoading}
        />

        {/* Col 3: Recent Admissions */}
        <RecentAdmissions
          students={students}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
