"use client";

import { Teacher } from "@/src/types/teacher";
import { Button } from "@/src/components/ui/button";
import {
  Briefcase,
  Building2,
  Calendar,
  Edit3,
  Mail,
  Phone,
  Plus,
  BookOpen,
} from "lucide-react";

interface TeacherProfileCardProps {
  teacher: Teacher;
  onEdit?: () => void;
  onAssign?: () => void;
}

function getInitials(name: string) {
  if (!name) return "TC";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeacherProfileCard({
  teacher,
  onEdit,
  onAssign,
}: TeacherProfileCardProps) {
  const assignmentsCount = teacher.assignments?.length || 0;
  const uniqueClassesCount = new Set(
    teacher.assignments?.map((a) => a.classId) || []
  ).size;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      {/* Teacher Identity */}
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20 shrink-0">
          {getInitials(teacher.name)}
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {teacher.name}
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              {teacher.designation || "Teacher"}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-2">
            <span>
              ID: <strong className="text-slate-800 font-bold">{teacher.teacherId}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-600 font-sans">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {teacher.department || "General"}
            </span>
            {teacher.joiningDate && (
              <>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-500 font-sans">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Joined:{" "}
                  {new Date(teacher.joiningDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick KPI & Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
        {/* Classes taught count */}
        <div className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3 text-center min-w-[100px]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Classes
          </span>
          <span className="text-sm font-bold text-slate-800">
            {uniqueClassesCount}
          </span>
        </div>

        {/* Subjects taught count */}
        <div className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3 text-center min-w-[100px]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Subjects
          </span>
          <span className="text-sm font-bold text-slate-800">
            {assignmentsCount}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onAssign && (
            <Button
              onClick={onAssign}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Assign Subject</span>
            </Button>
          )}

          {onEdit && (
            <Button
              onClick={onEdit}
              variant="outline"
              className="flex-1 sm:flex-initial h-11 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="h-4 w-4 text-slate-500" />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
