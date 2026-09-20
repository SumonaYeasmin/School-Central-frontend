"use client";

import { Student } from "@/src/types/student";
import { GraduationCap } from "lucide-react";

interface StudentAcademicInfoProps {
  student: Student;
}

export function StudentAcademicInfo({ student }: StudentAcademicInfoProps) {
  const formattedAdmissionDate = student.admissionDate
    ? new Date(student.admissionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <GraduationCap className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Academic Details</h3>
          <p className="text-xs text-slate-400">Class placement & enrollment info</p>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 text-sm">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Student ID</span>
          <span className="font-semibold text-slate-800 font-mono">
            {student.studentId}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Class Roll</span>
          <span className="font-semibold text-slate-800 font-mono">
            {student.roll}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Enrolled Class</span>
          <span className="font-semibold text-slate-800">
            {student.class?.name || "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="text-slate-500">Assigned Section</span>
          <span className="font-semibold text-slate-800">
            {student.section?.name || "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-500">Admission Date</span>
          <span className="font-semibold text-slate-800">
            {formattedAdmissionDate}
          </span>
        </div>
      </div>
    </div>
  );
}
