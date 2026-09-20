"use client";

import { Student } from "@/src/types/student";
import { User } from "lucide-react";

interface StudentPersonalInfoProps {
  student: Student;
}

export function StudentPersonalInfo({ student }: StudentPersonalInfoProps) {
  const formattedDob = student.dateOfBirth
    ? new Date(student.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <User className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Personal Information</h3>
          <p className="text-xs text-slate-400">Bio and identity records</p>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 text-sm">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Full Name</span>
          <span className="font-semibold text-slate-800">{student.name}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Gender</span>
          <span className="font-semibold text-slate-800 capitalize">
            {student.gender?.toLowerCase() || "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Date of Birth</span>
          <span className="font-semibold text-slate-800">{formattedDob}</span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-500">Enrollment Status</span>
          <span className="font-semibold text-emerald-600">
            {student.status || "ACTIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}
