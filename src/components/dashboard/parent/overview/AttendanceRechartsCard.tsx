"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { ClipboardCheck, Flame, TrendingUp } from "lucide-react";

interface WeeklyAttendancePoint {
  day: string;
  studentAttendance: number; // in %
  classAverage: number; // in %
  status: string;
  entryTime: string;
}

const ATTENDANCE_DATA: WeeklyAttendancePoint[] = [
  {
    day: "Sunday",
    studentAttendance: 100,
    classAverage: 92,
    status: "Present (On Time)",
    entryTime: "9:42 AM",
  },
  {
    day: "Monday",
    studentAttendance: 100,
    classAverage: 94,
    status: "Present (On Time)",
    entryTime: "9:48 AM",
  },
  {
    day: "Tuesday",
    studentAttendance: 100,
    classAverage: 90,
    status: "Present (On Time)",
    entryTime: "9:40 AM",
  },
  {
    day: "Wednesday",
    studentAttendance: 100,
    classAverage: 95,
    status: "Present (On Time)",
    entryTime: "9:51 AM",
  },
  {
    day: "Thursday",
    studentAttendance: 100,
    classAverage: 91,
    status: "Present (On Time)",
    entryTime: "9:45 AM",
  },
];

// Custom Tooltip for Recharts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data: WeeklyAttendancePoint = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700 shadow-xl text-xs space-y-1.5">
        <div className="font-extrabold text-sm text-indigo-300 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
            {data.status}
          </span>
        </div>
        <div className="text-slate-300 pt-1 border-t border-slate-800 space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Child Attendance:</span>
            <span className="font-bold text-emerald-400">{data.studentAttendance}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Class Average:</span>
            <span className="font-bold text-blue-300">{data.classAverage}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">School Entry:</span>
            <span className="font-medium text-slate-200">{data.entryTime}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function AttendanceRechartsCard() {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Weekly Attendance Comparison Graph (Recharts)
            </h3>
            <p className="text-xs text-slate-500">
              Comparing your child&apos;s daily presence with class average (Sunday to Thursday)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-emerald-600" />
            100% Present This Week
          </span>
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ATTENDANCE_DATA}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              domain={[60, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "12px", fontSize: "12px", fontWeight: "600" }}
            />
            <Bar
              name="Student Attendance"
              dataKey="studentAttendance"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              name="Class Average"
              dataKey="classAverage"
              fill="#93c5fd"
              radius={[8, 8, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center text-xs">
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Weekly Total</div>
          <div className="text-sm font-extrabold text-slate-900 mt-0.5">5/5 Working Days</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Avg. Arrival Time</div>
          <div className="text-sm font-extrabold text-emerald-600 mt-0.5">9:43 AM (On Time)</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Consistency</div>
          <div className="text-sm font-extrabold text-indigo-600 mt-0.5">100% Punctual</div>
        </div>
      </div>
    </div>
  );
}
