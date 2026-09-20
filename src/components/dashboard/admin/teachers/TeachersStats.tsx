"use client";

import { MOCK_TEACHERS_STATS } from "./mockTeachers";

interface TeachersStatsProps {
  totalStaff?: number;
  fullTime?: number;
  onLeave?: number;
  subjectsCovered?: number;
}

export function TeachersStats({
  totalStaff = MOCK_TEACHERS_STATS.totalStaff,
  fullTime = MOCK_TEACHERS_STATS.fullTime,
  onLeave = MOCK_TEACHERS_STATS.onLeave,
  subjectsCovered = MOCK_TEACHERS_STATS.subjectsCovered,
}: TeachersStatsProps) {
  const statCards = [
    {
      title: "Teaching staff",
      value: totalStaff,
      subtext: "+4 this year",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Full-time",
      value: fullTime,
      subtext: "81% of staff",
      subtextColor: "text-emerald-600 font-semibold",
    },
    {
      title: "On leave today",
      value: onLeave,
      subtext: "2 substitutions",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Subjects covered",
      value: subjectsCovered,
      subtext: "All grades",
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
