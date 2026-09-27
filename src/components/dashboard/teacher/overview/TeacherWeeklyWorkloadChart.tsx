"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Clock, Calendar, Sparkles, BookOpen, Layers } from "lucide-react";

interface TeacherWeeklyWorkloadChartProps {
  isLoading?: boolean;
}

const SCHEDULE_DATA = [
  { day: "Sat", fullDay: "Saturday", hours: 3.5, classes: 4, theory: 3, practical: 1, topic: "Physics & Mechanics" },
  { day: "Sun", fullDay: "Sunday", hours: 5.0, classes: 5, theory: 4, practical: 1, topic: "Electromagnetism" },
  { day: "Mon", fullDay: "Monday", hours: 4.0, classes: 4, theory: 3, practical: 1, topic: "Optics & Light Lab" },
  { day: "Tue", fullDay: "Tuesday", hours: 5.5, classes: 5, theory: 3, practical: 2, topic: "Modern Physics & Lab" },
  { day: "Wed", fullDay: "Wednesday", hours: 3.0, classes: 3, theory: 2, practical: 1, topic: "Thermodynamics" },
  { day: "Thu", fullDay: "Thursday", hours: 4.5, classes: 4, theory: 3, practical: 1, topic: "Wave & Acoustics" },
];

export function TeacherWeeklyWorkloadChart({
  isLoading = false,
}: TeacherWeeklyWorkloadChartProps) {
  const [viewMode, setViewMode] = useState<"hours" | "classes">("hours");

  return (
    <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-5 sm:p-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
              <Clock className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900 tracking-tight">
              Weekly Teaching Workload
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500 mt-1">
            {viewMode === "hours"
              ? "Daily lecture hours and classroom commitment (Sat – Thu)."
              : "Distribution of Theory vs Practical lab sessions."}
          </CardDescription>
        </div>

        {/* Interactive View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("hours")}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === "hours"
                ? "bg-white text-violet-700 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Clock className="h-3 w-3" />
            <span>Hours</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("classes")}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === "classes"
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Classes</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-3 space-y-4">
        {isLoading ? (
          <div className="h-72 flex items-center justify-center text-xs text-slate-400">
            Loading teaching workload...
          </div>
        ) : (
          <>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {viewMode === "hours" ? (
                  <AreaChart
                    data={SCHEDULE_DATA}
                    margin={{ top: 12, right: 12, left: -22, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
                    />
                    <YAxis
                      domain={[0, 6]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      ticks={[0, 2, 4, 6]}
                      unit="h"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-slate-800 min-w-[180px]">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="font-bold text-slate-200">{data.fullDay}</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                  {data.classes} Classes
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-violet-300">
                                <span>Teaching Time:</span>
                                <span className="font-mono font-bold text-white">{data.hours} Hours</span>
                              </div>
                              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                                <span>Focus Topic:</span>
                                <span className="text-slate-200 font-medium">{data.topic}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={4.25}
                      stroke="#c084fc"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "Avg (4.25h)",
                        position: "insideTopRight",
                        fill: "#9333ea",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      name="Teaching Hours"
                      stroke="#7c3aed"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#hoursGradient)"
                      activeDot={{
                        r: 6,
                        stroke: "#7c3aed",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </AreaChart>
                ) : (
                  <BarChart
                    data={SCHEDULE_DATA}
                    margin={{ top: 12, right: 12, left: -22, bottom: 0 }}
                    barSize={32}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
                    />
                    <YAxis
                      domain={[0, 6]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      ticks={[0, 2, 4, 6]}
                      unit=" cls"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-slate-800 min-w-[170px]">
                              <p className="font-bold text-slate-200 border-b border-slate-800 pb-1">{data.fullDay}</p>
                              <div className="flex items-center justify-between text-indigo-300">
                                <span>Theory Sessions:</span>
                                <span className="font-mono font-bold text-indigo-400">{data.theory} cls</span>
                              </div>
                              <div className="flex items-center justify-between text-emerald-300">
                                <span>Practical / Lab:</span>
                                <span className="font-mono font-bold text-emerald-400">{data.practical} cls</span>
                              </div>
                              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800">
                                <span>Total Periods:</span>
                                <span className="font-mono font-bold text-white">{data.classes}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="theory"
                      name="Theory"
                      stackId="classes"
                      fill="#4f46e5"
                    />
                    <Bar
                      dataKey="practical"
                      name="Practical"
                      stackId="classes"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Bottom Workload Metrics */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100/90">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Weekly Time</span>
                <span className="text-xs font-bold text-slate-800">25.5 Hours</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-violet-50/70 border border-violet-100/70">
                <span className="text-[10px] text-violet-600 font-semibold block uppercase tracking-wider">Peak Tuesday</span>
                <span className="text-xs font-bold text-violet-900">5.5 Hours (5 cls)</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-100/70">
                <span className="text-[10px] text-indigo-600 font-semibold block uppercase tracking-wider">Total Sessions</span>
                <span className="text-xs font-bold text-indigo-900">25 Classes</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

