"use client";

import { MOCK_SUBJECTS_STATS } from "./mockSubjects";

interface SubjectsStatsProps {
  totalSubjects?: number;
  coreSubjects?: number;
  optionalSubjects?: number;
}

export function SubjectsStats({
  totalSubjects = MOCK_SUBJECTS_STATS.totalSubjects,
  coreSubjects = MOCK_SUBJECTS_STATS.coreSubjects,
  optionalSubjects = MOCK_SUBJECTS_STATS.optionalSubjects,
}: SubjectsStatsProps) {
  const statCards = [
    {
      title: "Subjects",
      value: totalSubjects,
      subtext: "4 core groups",
    },
    {
      title: "Core subjects",
      value: coreSubjects,
      subtext: "Across all grades",
    },
    {
      title: "Optional subjects",
      value: optionalSubjects,
      subtext: "Student choice",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {stat.title}
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
