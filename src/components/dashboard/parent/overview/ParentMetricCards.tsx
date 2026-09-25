"use client";

import React from "react";
import {
  ClipboardCheck,
  Award,
  CalendarDays,
  BookOpen,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ParentChildInfo } from "@/src/services/parentService";

interface ParentMetricCardsProps {
  child: ParentChildInfo | undefined;
}

export function ParentMetricCards({ child }: ParentMetricCardsProps) {
  const subjectsCount = child?.subjects?.length ?? 0;
  const compulsoryCount = child?.subjects?.filter((s) => s.isCompulsory).length ?? 0;
  const optionalCount = subjectsCount - compulsoryCount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Attendance Rate Metric Card with Circular Progress Meter */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Overall Attendance
          </span>
          <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ClipboardCheck className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                96.4%
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" />
                +1.2%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              22 Days Present • 1 Leave
            </p>
          </div>

          {/* SVG Circular Progress Meter */}
          <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
            <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray="96.4, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[10px] font-black text-emerald-700">96%</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Monthly Consistency</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
            Active
          </span>
        </div>
      </div>

      {/* 2. Academic Performance & GPA Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Academic Standing
          </span>
          <div className="h-9 w-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Award className="h-4.5 w-4.5" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              4.88
            </span>
            <span className="text-xs font-bold text-slate-400">/ 5.00 GPA</span>
          </div>
          <p className="text-xs text-indigo-600 mt-0.5 font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-indigo-500" />
            <span>Grade A+ (Distinction)</span>
          </p>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400 truncate">
              {child ? `${child.class} — ${child.section}` : "Class Standing"}
            </span>
            <span className="font-bold text-slate-800 shrink-0">
              {child?.roll ? `Roll #${child.roll}` : "Enrolled"}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
              style={{ width: "94%" }}
            />
          </div>
        </div>
      </div>

      {/* 3. Class Routine Load Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Weekly Class Load
          </span>
          <div className="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarDays className="h-4.5 w-4.5" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              25
            </span>
            <span className="text-xs font-bold text-slate-400">Periods / Wk</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            5 Periods Daily (Sun – Thu)
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Daily Timing</span>
          <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 text-[11px]">
            10:00 AM – 4:00 PM
          </span>
        </div>
      </div>

      {/* 4. Enrolled Curriculum Subjects Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Curriculum Subjects
          </span>
          <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {subjectsCount}
            </span>
            <span className="text-xs font-bold text-slate-400">Enrolled</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {compulsoryCount} Compulsory {optionalCount > 0 ? `• ${optionalCount} Optional` : ""}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Syllabus Status</span>
          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 text-[11px]">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}

