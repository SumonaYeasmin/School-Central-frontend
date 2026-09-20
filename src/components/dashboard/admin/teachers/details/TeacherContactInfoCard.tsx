"use client";

import { Teacher } from "@/src/types/teacher";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface TeacherContactInfoCardProps {
  teacher: Teacher;
}

export function TeacherContactInfoCard({
  teacher,
}: TeacherContactInfoCardProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <UserCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Contact & Employment Details
          </h3>
          <p className="text-xs text-slate-400">
            Official records and communication channels
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Phone */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-blue-600" />
            Contact Phone
          </span>
          <span className="text-sm font-semibold text-slate-900 font-mono block">
            {teacher.phone || "No phone provided"}
          </span>
        </div>

        {/* Email */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            Official Email
          </span>
          <span className="text-sm font-semibold text-slate-900 block truncate">
            {teacher.email || "No email assigned"}
          </span>
        </div>

        {/* Department */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-600" />
            Academic Department
          </span>
          <span className="text-sm font-bold text-slate-800 block">
            {teacher.department || "General Faculty"}
          </span>
        </div>

        {/* Designation */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-blue-600" />
            Official Designation
          </span>
          <span className="text-sm font-bold text-slate-800 block">
            {teacher.designation || "Teaching Staff"}
          </span>
        </div>

        {/* Joining Date */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            Joining Date
          </span>
          <span className="text-sm font-semibold text-slate-800 block">
            {teacher.joiningDate
              ? new Date(teacher.joiningDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not Specified"}
          </span>
        </div>

        {/* Status */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Staff Status
          </span>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-emerald-700">
              Active Faculty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
