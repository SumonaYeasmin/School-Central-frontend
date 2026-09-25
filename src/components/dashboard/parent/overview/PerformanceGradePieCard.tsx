"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieIcon, Sparkles } from "lucide-react";

interface GradeDistributionPoint {
  name: string;
  value: number;
  color: string;
  description: string;
}

const GRADE_DISTRIBUTION_DATA: GradeDistributionPoint[] = [
  { name: "Grade A+ (80-100%)", value: 6, color: "#6366f1", description: "Outstanding / Distinction" },
  { name: "Grade A (70-79%)", value: 1, color: "#3b82f6", description: "Excellent" },
  { name: "Grade A- (60-69%)", value: 0, color: "#10b981", description: "Very Good" },
  { name: "Grade B (50-59%)", value: 0, color: "#f59e0b", description: "Good" },
];

function CustomPieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data: GradeDistributionPoint = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 shadow-xl text-xs space-y-1">
        <div className="font-bold text-sm" style={{ color: data.color }}>
          {data.name}
        </div>
        <div className="text-slate-300">
          Total Subjects: <span className="font-extrabold text-white">{data.value}</span>
        </div>
        <div className="text-[11px] text-slate-400">{data.description}</div>
      </div>
    );
  }
  return null;
}

export function PerformanceGradePieCard() {
  const totalSubjects = GRADE_DISTRIBUTION_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <PieIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Grade Distribution Donut Chart
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown of subject letter grades across registered syllabus
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 self-start sm:self-auto">
          {totalSubjects} Major Exam Subjects
        </span>
      </div>

      {/* Pie Chart */}
      <div className="h-64 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "11px", fontWeight: "600" }}
            />
            <Pie
              data={GRADE_DISTRIBUTION_DATA}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {GRADE_DISTRIBUTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-xl font-black text-slate-900 leading-none">85.7%</div>
          <div className="text-[10px] text-slate-400 font-bold mt-0.5">A+ Rate</div>
        </div>
      </div>
    </div>
  );
}
