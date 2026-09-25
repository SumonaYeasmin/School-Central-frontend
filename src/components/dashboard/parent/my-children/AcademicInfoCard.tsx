"use client";

import React from "react";
import { School, Layers, Hash, IdCard, BookOpen, User, CalendarDays, Calendar } from "lucide-react";
import { ParentChildInfo } from "@/src/services/parentService";

interface AcademicInfoCardProps {
  child: ParentChildInfo;
}

export function AcademicInfoCard({ child }: AcademicInfoCardProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <School className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Academic & Enrolment Information
            </h3>
            <p className="text-xs text-slate-500">
              Official admission records registered in School Central
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          Active Enrolment
        </span>
      </div>

      {/* Structured 2-column key-value grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <School className="h-3.5 w-3.5 text-indigo-500" />
            <span>Enrolled Class</span>
          </div>
          <div className="font-bold text-slate-900 text-sm">{child.class}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <Layers className="h-3.5 w-3.5 text-blue-500" />
            <span>Assigned Section</span>
          </div>
          <div className="font-bold text-slate-900 text-sm">{child.section}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <Hash className="h-3.5 w-3.5 text-amber-500" />
            <span>Class Roll Number</span>
          </div>
          <div className="font-bold text-indigo-600 text-sm">
            Roll #{child.roll}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <IdCard className="h-3.5 w-3.5 text-purple-500" />
            <span>Student ID</span>
          </div>
          <div className="font-bold text-slate-900 text-sm">{child.studentId}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
            <span>Academic Group</span>
          </div>
          <div className="font-bold text-slate-900 text-sm">
            {child.group || "General Curriculum"}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span>Gender</span>
          </div>
          <div className="font-bold text-slate-900 text-sm capitalize">
            {child.gender?.toLowerCase() || "Not specified"}
          </div>
        </div>

        {child.dateOfBirth && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
              <CalendarDays className="h-3.5 w-3.5 text-rose-500" />
              <span>Date of Birth</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">
              {new Date(child.dateOfBirth).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        )}

        {child.admissionDate && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-emerald-500" />
              <span>Admission Date</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">
              {new Date(child.admissionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
