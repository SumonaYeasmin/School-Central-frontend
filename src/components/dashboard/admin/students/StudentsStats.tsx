"use client";

import { MOCK_STUDENTS_STATS } from "./mockStudents";

interface StudentsStatsProps {
  totalStudents?: number;
  newAdmissions?: number;
  activeSections?: number;
  avgAttendance?: string;
}

export function StudentsStats({
  totalStudents = MOCK_STUDENTS_STATS.totalStudents,
  newAdmissions = MOCK_STUDENTS_STATS.newAdmissions,
  activeSections = MOCK_STUDENTS_STATS.activeSections,
  avgAttendance = MOCK_STUDENTS_STATS.avgAttendance,
}: StudentsStatsProps) {
  const statCards = [
    {
      title: "Total students",
      value: totalStudents,
      subtext: "+18 this term",
      subtextColor: "text-slate-500 font-medium",
    },
    {
      title: "New admissions",
      value: newAdmissions,
      subtext: "Since January",
      subtextColor: "text-slate-500 font-medium",
    },
    {
      title: "Active sections",
      value: activeSections,
      subtext: "10 grade levels",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Avg. attendance",
      value: avgAttendance,
      subtext: "1.8% lower",
      subtextColor: "text-amber-700 font-medium",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
        >
          <span className="text-xs font-semibold text-slate-500 tracking-wide">
            {stat.title}
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </span>
            <span className={`text-xs ${stat.subtextColor}`}>
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
