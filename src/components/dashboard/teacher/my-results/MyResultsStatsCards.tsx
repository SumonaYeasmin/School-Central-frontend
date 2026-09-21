"use client";

import { FileText, Check, Clock, BarChart3, Users } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

interface MyResultsStatsCardsProps {
  totalStudents: number;
  marksEntered: number;
  pendingCount: number;
  averageMarks: number;
}

export function MyResultsStatsCards({
  totalStudents = 32,
  marksEntered = 28,
  pendingCount = 4,
  averageMarks = 78.5,
}: MyResultsStatsCardsProps) {
  // Percentage calculations
  const enteredPercentage = totalStudents > 0 ? ((marksEntered / totalStudents) * 100).toFixed(1) : "0.0";
  const pendingPercentage = totalStudents > 0 ? ((pendingCount / totalStudents) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Total Students Card (Blue) */}
      <Card className="rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-white shadow-2xs">
        <CardContent className="p-4 sm:p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-600/15 text-blue-600 flex items-center justify-center shrink-0">
            <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Students</p>
            <p className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight mt-0.5">
              {totalStudents}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Marks Entered Card (Green) */}
      <Card className="rounded-2xl border border-emerald-100/80 bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-white shadow-2xs">
        <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-600/15 text-emerald-600 flex items-center justify-center shrink-0">
              <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Marks Entered</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight mt-0.5">
                {marksEntered}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-emerald-50/80 border border-emerald-100 px-2 py-1 rounded-lg self-end mb-1">
            <Users className="h-3 w-3 text-emerald-600" />
            <span className="text-emerald-700">{enteredPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Pending Card (Amber) */}
      <Card className="rounded-2xl border border-amber-100/80 bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white shadow-2xs">
        <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-600/15 text-amber-600 flex items-center justify-center shrink-0">
              <div className="h-7 w-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Clock className="h-4 w-4 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending</p>
              <p className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight mt-0.5">
                {pendingCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-amber-50/80 border border-amber-100 px-2 py-1 rounded-lg self-end mb-1">
            <Users className="h-3 w-3 text-amber-600" />
            <span className="text-amber-700">{pendingPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Average Marks Card (Purple) */}
      <Card className="rounded-2xl border border-purple-100/80 bg-gradient-to-br from-purple-50/80 via-purple-50/40 to-white shadow-2xs">
        <CardContent className="p-4 sm:p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-600/15 text-purple-600 flex items-center justify-center shrink-0">
            <div className="h-7 w-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Average Marks</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">
                {averageMarks > 0 ? averageMarks.toFixed(1) : "-"}
              </span>
              <span className="text-xs font-medium text-slate-400">/100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
