"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  School,
  FileSpreadsheet,
  BarChart3,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { getMyAssignments } from "@/src/services/teacherService";
import { TeacherAssignment, Teacher } from "@/src/types/teacher";

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 font-sans animate-in fade-in duration-300">
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

          <div className="flex items-center gap-3">
            <Link
              href="/teacher/dashboard/classes"
              className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              <School className="h-4 w-4" />
              <span>My Classes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/teacher/dashboard/classes"
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all group hover:-translate-y-1 block"
        >
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <School className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>My Classes</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            View all assigned classroom sections and view student rosters.
          </p>
        </Link>

        <Link
          href="/teacher/dashboard/results/enter-marks"
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all group hover:-translate-y-1 block"
        >
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>Enter Marks</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Record term examination scores and assess students across subjects.
          </p>
        </Link>

        <Link
          href="/teacher/dashboard/results/my-student-results"
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all group hover:-translate-y-1 block"
        >
          <div className="h-12 w-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>Student Results</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review grade distribution and performance analytics for your students.
          </p>
        </Link>
      </div>
    </div>
  );
}
