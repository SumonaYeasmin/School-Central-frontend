"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Award, Sparkles, BarChart3, LineChart as LineChartIcon } from "lucide-react";

interface SubjectPerformanceData {
  subject: string;
  obtainedMarks: number;
  highestMarks: number;
  passMarks: number;
  grade: string;
}

const SUBJECT_MARKS_DATA: SubjectPerformanceData[] = [
  {
    subject: "Math",
    obtainedMarks: 95,
    highestMarks: 98,
    passMarks: 40,
    grade: "A+",
  },
  {
    subject: "Science",
    obtainedMarks: 92,
    highestMarks: 94,
    passMarks: 40,
    grade: "A+",
  },
  {
    subject: "ICT",
    obtainedMarks: 96,
    highestMarks: 97,
    passMarks: 40,
    grade: "A+",
  },
  {
    subject: "Bangla",
    obtainedMarks: 88,
    highestMarks: 90,
    passMarks: 40,
    grade: "A+",
  },
  {
    subject: "English",
    obtainedMarks: 85,
    highestMarks: 89,
    passMarks: 40,
    grade: "A",
  },
  {
    subject: "BGS",
    obtainedMarks: 89,
    highestMarks: 92,
    passMarks: 40,
    grade: "A+",
  },
  {
    subject: "Religion",
    obtainedMarks: 94,
    highestMarks: 96,
    passMarks: 40,
    grade: "A+",
  },
];

function CustomSubjectTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data: SubjectPerformanceData = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700 shadow-xl text-xs space-y-1.5">
        <div className="font-extrabold text-sm text-indigo-300 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
            Grade {data.grade}
          </span>
        </div>
        <div className="text-slate-300 pt-1 border-t border-slate-800 space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Student Obtained:</span>
            <span className="font-bold text-indigo-400">{data.obtainedMarks} / 100</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Class Highest:</span>
            <span className="font-bold text-amber-300">{data.highestMarks} / 100</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Passing Benchmark:</span>
            <span className="font-medium text-slate-400">{data.passMarks} Marks</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function SubjectMarksRechartsCard() {
  const [chartType, setChartType] = useState<"BAR" | "AREA">("BAR");

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Subject Academic Marks & Performance Curve (Recharts)
            </h3>
            <p className="text-xs text-slate-500">
              Subject-wise marks vs class topper benchmark across curriculum subjects
            </p>
          </div>
        </div>

        {/* Chart View Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setChartType("BAR")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartType === "BAR"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Bar View</span>
          </button>
          <button
            onClick={() => setChartType("AREA")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartType === "AREA"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LineChartIcon className="h-3.5 w-3.5" />
            <span>Trend Curve</span>
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "BAR" ? (
            <BarChart
              data={SUBJECT_MARKS_DATA}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="subject"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip content={<CustomSubjectTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: "12px", fontSize: "12px", fontWeight: "600" }}
              />
              <Bar
                name="Student Obtained"
                dataKey="obtainedMarks"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
              <Bar
                name="Class Highest"
                dataKey="highestMarks"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={SUBJECT_MARKS_DATA}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="highestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="subject"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip content={<CustomSubjectTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: "12px", fontSize: "12px", fontWeight: "600" }}
              />
              <Area
                type="monotone"
                name="Student Obtained"
                dataKey="obtainedMarks"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#studentGradient)"
              />
              <Area
                type="monotone"
                name="Class Highest"
                dataKey="highestMarks"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#highestGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-center text-xs">
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Average Marks</div>
          <div className="text-sm font-extrabold text-indigo-600 mt-0.5">91.3 / 100</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Top Subject</div>
          <div className="text-sm font-extrabold text-slate-900 mt-0.5">ICT (96/100)</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Grade Points</div>
          <div className="text-sm font-extrabold text-emerald-600 mt-0.5">GPA 4.88</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl">
          <div className="text-slate-400 text-[11px] font-medium">Class Standing</div>
          <div className="text-sm font-extrabold text-amber-600 mt-0.5">Rank #01</div>
        </div>
      </div>
    </div>
  );
}
