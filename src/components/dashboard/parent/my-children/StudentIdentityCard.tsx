"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ParentChildInfo } from "@/src/services/parentService";

interface StudentIdentityCardProps {
  child: ParentChildInfo;
}

export function StudentIdentityCard({ child }: StudentIdentityCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 p-6 sm:p-7 text-white shadow-lg space-y-5 relative overflow-hidden">
      <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-400 p-0.5 shadow-md">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white text-2xl sm:text-3xl font-black overflow-hidden select-none">
                {child.photo && !child.photo.includes("example.com") ? (
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="h-full w-full object-cover rounded-[14px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span>{child.name.charAt(0)}</span>
                )}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-xs" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white truncate">
                {child.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                <span>{child.status}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="bg-white/10 px-2.5 py-0.5 rounded-md font-bold text-indigo-200">
                {child.class} — {child.section}
              </span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-md font-bold text-amber-300">
                Roll #{child.roll}
              </span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-md font-medium text-slate-300">
                ID: {child.studentId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Metrics in Student Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/10 text-center text-xs relative z-10">
        <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
          <div className="text-[11px] text-slate-400 font-medium">Session</div>
          <div className="text-sm font-black text-white mt-0.5">2026</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
          <div className="text-[11px] text-slate-400 font-medium">Subjects</div>
          <div className="text-sm font-black text-indigo-300 mt-0.5">
            {child.subjects?.length ?? 0} Enrolled
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
          <div className="text-[11px] text-slate-400 font-medium">Relation</div>
          <div className="text-sm font-black text-amber-300 capitalize mt-0.5 truncate">
            {child.relation?.toLowerCase() || "Child"}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
          <div className="text-[11px] text-slate-400 font-medium">Contact</div>
          <div className="text-sm font-black text-emerald-300 mt-0.5 truncate">
            {child.isPrimaryContact ? "Primary" : "Secondary"}
          </div>
        </div>
      </div>
    </div>
  );
}
