"use client";

import { MOCK_PARENTS_STATS } from "./mockParents";

interface ParentsStatsProps {
  parentAccounts?: number;
  guardiansLinked?: number;
  newThisTerm?: number;
  pendingInvites?: number;
}

export function ParentsStats({
  parentAccounts = MOCK_PARENTS_STATS.parentAccounts,
  guardiansLinked = MOCK_PARENTS_STATS.guardiansLinked,
  newThisTerm = MOCK_PARENTS_STATS.newThisTerm,
  pendingInvites = MOCK_PARENTS_STATS.pendingInvites,
}: ParentsStatsProps) {
  const statCards = [
    {
      title: "Parent accounts",
      value: parentAccounts,
      subtext: "87% connected",
      subtextColor: "text-emerald-600 font-semibold",
    },
    {
      title: "Guardians linked",
      value: guardiansLinked,
      subtext: "All students",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "New this term",
      value: newThisTerm,
      subtext: "+8 this month",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Pending invites",
      value: pendingInvites,
      subtext: "Need follow-up",
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
