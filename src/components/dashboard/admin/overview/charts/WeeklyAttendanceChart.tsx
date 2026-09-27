"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ClipboardCheck, TrendingUp } from "lucide-react";

interface WeeklyAttendanceChartProps {
  isLoading?: boolean;
}

const ATTENDANCE_DATA = [
  { day: "Sat", students: 94.2, teachers: 98.0 },
  { day: "Sun", students: 96.5, teachers: 100.0 },
  { day: "Mon", students: 95.8, teachers: 96.5 },
  { day: "Tue", students: 97.4, teachers: 98.5 },
  { day: "Wed", students: 93.9, teachers: 97.0 },
  { day: "Thu", students: 98.2, teachers: 100.0 },
];

export function WeeklyAttendanceChart({
  isLoading = false,
}: WeeklyAttendanceChartProps) {
  return (
    <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
      <CardHeader className="p-5 sm:p-6 pb-2 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <ClipboardCheck className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900 tracking-tight">
              Weekly Attendance Trends
            </CardTitle>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time percentage turnout for students & faculty this week.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-xl text-emerald-700 text-xs font-bold">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          <span>96.0% Avg</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-4">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-xs text-slate-400">
            Loading attendance metrics...
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ATTENDANCE_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="teacherGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  domain={[80, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  unit="%"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-800">
                          <p className="font-bold text-slate-200">{label} Attendance</p>
                          <div className="flex items-center justify-between gap-4 text-blue-300">
                            <span>Students:</span>
                            <span className="font-mono font-bold">{payload[0]?.value}%</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-emerald-300">
                            <span>Teachers:</span>
                            <span className="font-mono font-bold">{payload[1]?.value}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  name="Students"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#studentGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="teachers"
                  name="Teachers"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#teacherGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
