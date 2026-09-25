"use client";

import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  School,
  BookOpen,
  Users,
  FileSpreadsheet,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { TeacherAssignment } from "@/src/types/teacher";

interface ClassCardProps {
  assignment: TeacherAssignment;
  onViewStudents: (assignment: TeacherAssignment) => void;
}

export function ClassCard({ assignment, onViewStudents }: ClassCardProps) {
  const { class: schoolClass, section, subject, studentCount } = assignment;

  // Color theme generator based on class name
  const getClassTheme = (name: string) => {
    if (name.includes("6")) return { bg: "from-blue-600 to-cyan-600", light: "bg-blue-50 text-blue-700 border-blue-200" };
    if (name.includes("7")) return { bg: "from-emerald-600 to-teal-600", light: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (name.includes("8")) return { bg: "from-indigo-600 to-violet-600", light: "bg-indigo-50 text-indigo-700 border-indigo-200" };
    if (name.includes("9")) return { bg: "from-amber-600 to-orange-600", light: "bg-amber-50 text-amber-700 border-amber-200" };
    return { bg: "from-rose-600 to-pink-600", light: "bg-rose-50 text-rose-700 border-rose-200" };
  };

  const theme = getClassTheme(schoolClass.name);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Top Banner & Header */}
      <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${theme.bg}`} />
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {schoolClass.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <Badge variant="outline" className={`font-bold text-xs px-2.5 py-0.5 border ${theme.light}`}>
                {section.name}
              </Badge>
              {subject.code && (
                <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Code: {subject.code}
                </span>
              )}
            </div>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <School className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1">
        {/* Subject Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Teaching Subject
            </span>
            <p className="text-sm font-bold text-slate-800 truncate">
              {subject.name}
            </p>
          </div>
        </div>

        {/* Student Enrollment Stat */}
        <div className="flex items-center justify-between px-1 py-0.5 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span>Enrolled Students</span>
          </span>
          <span className="font-bold text-slate-800 font-mono text-sm bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg border border-blue-200/60">
            {studentCount ?? "—"} Students
          </span>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="p-4 sm:p-5 pt-3 bg-slate-50/50 border-t border-slate-100 grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={() => onViewStudents(assignment)}
          variant="outline"
          className="w-full h-10 rounded-xl border-slate-300 hover:bg-white hover:border-blue-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Users className="h-3.5 w-3.5 text-blue-600" />
          <span>View Students</span>
        </Button>

        <Link
          href={`/teacher/dashboard/results/enter-marks?classId=${schoolClass.id}&sectionId=${section.id}&subjectId=${subject.id}`}
          className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 active:scale-[0.98]"
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>Enter Marks</span>
        </Link>
      </div>
    </div>
  );
}
