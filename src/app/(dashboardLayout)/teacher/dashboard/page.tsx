"use client";

import { useState, useEffect } from "react";
import {
  School,
  Users,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import { getMyAssignments } from "@/src/services/teacherService";
import { TeacherAssignment, Teacher } from "@/src/types/teacher";
import { TeacherPerformanceChart } from "@/src/components/dashboard/teacher/overview/TeacherPerformanceChart";
import { TeacherWeeklyWorkloadChart } from "@/src/components/dashboard/teacher/overview/TeacherWeeklyWorkloadChart";

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let userEmail = "";
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("userInfo");
          if (stored) {
            const parsed = JSON.parse(stored);
            userEmail = parsed.email || "";
          }
        } catch {}
      }

      const res = await getMyAssignments(userEmail || undefined);
      if (res && res.assignments) {
        setAssignments(res.assignments);
        if (res.teacher) setTeacher(res.teacher);
      } else if (Array.isArray(res)) {
        setAssignments(res);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueClasses = new Set(assignments.map((a) => a.class.id)).size;
  const uniqueSections = new Set(assignments.map((a) => `${a.class.id}-${a.section.id}`)).size;
  const uniqueSubjects = new Set(assignments.map((a) => a.subject.id)).size;

  return (
    <div className="p-4 sm:p-6 lg:p-8 container mx-auto space-y-6 sm:space-y-8 font-sans animate-in fade-in duration-300">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Welcome Back</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {teacher?.name ? `${teacher.name}'s Dashboard` : "Faculty Dashboard"}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl font-normal">
              Manage your teaching curriculum, view assigned classes and sections, and enter examination scores seamlessly.
            </p>
          </div>
        </div>
      </div>


      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Assigned Classes</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <School className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {uniqueClasses}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Active grade levels</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Class Sections</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {uniqueSections}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Assigned sections</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Subjects Taught</span>
            <div className="h-9 w-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {uniqueSubjects}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Curriculum subjects</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">System Status</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-black text-emerald-600">Active</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Term 2026</p>
          </div>
        </div>
      </div>

      {/* Visual Analytics & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherPerformanceChart
          assignments={assignments}
          isLoading={isLoading}
        />
        <TeacherWeeklyWorkloadChart isLoading={isLoading} />
      </div>
    </div>
  );
}

