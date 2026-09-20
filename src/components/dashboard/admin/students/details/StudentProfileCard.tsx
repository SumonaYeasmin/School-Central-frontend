"use client";

import { Student } from "@/src/types/student";

interface StudentProfileCardProps {
  student: Student;
}

export function StudentProfileCard({ student }: StudentProfileCardProps) {
  // Initials generator fallback
  const initials = student.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST";

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "INACTIVE":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "TRANSFERRED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      {/* Student Identity: Avatar, Name, ID, Roll */}
      <div className="flex items-center gap-5">
        {student.photo ? (
          <img
            src={student.photo}
            alt={student.name}
            className="h-20 w-20 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
          />
        ) : (
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/20 text-blue-700 flex items-center justify-center text-2xl font-bold border border-blue-200/80 shadow-xs">
            {initials}
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {student.name}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(
                student.status
              )}`}
            >
              {student.status || "ACTIVE"}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono mt-1.5 flex flex-wrap items-center gap-2">
            <span>
              Student ID:{" "}
              <strong className="text-slate-800 font-bold">
                {student.studentId}
              </strong>
            </span>
            <span className="text-slate-300">•</span>
            <span>
              Roll:{" "}
              <strong className="text-slate-800 font-bold">
                {student.roll}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Class & Section Highlight Badges */}
      <div className="flex items-center gap-3 self-stretch sm:self-auto">
        <div className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3 text-center min-w-[100px]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Class
          </span>
          <span className="text-sm font-bold text-slate-800">
            {student.class?.name || "N/A"}
          </span>
        </div>
        <div className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3 text-center min-w-[100px]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Section
          </span>
          <span className="text-sm font-bold text-slate-800">
            {student.section?.name || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
