"use client";

interface ParentsStatsProps {
  parentAccounts?: number;
  guardiansLinked?: number;
  withEmail?: number;
  unlinked?: number;
}

export function ParentsStats({
  parentAccounts = 0,
  guardiansLinked = 0,
  withEmail = 0,
  unlinked = 0,
}: ParentsStatsProps) {
  const emailRate =
    parentAccounts > 0
      ? `${Math.round((withEmail / parentAccounts) * 100)}% email active`
      : "0% active";

  const statCards = [
    {
      title: "Parent accounts",
      value: parentAccounts,
      subtext: parentAccounts > 0 ? "Live database" : "No records",
      subtextColor: "text-blue-600 font-semibold",
    },
    {
      title: "Guardians linked",
      value: guardiansLinked,
      subtext: "Total student connections",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Email & portal active",
      value: withEmail,
      subtext: emailRate,
      subtextColor: "text-emerald-600 font-semibold",
    },
    {
      title: "Unlinked parents",
      value: unlinked,
      subtext: unlinked > 0 ? "Need student assignment" : "All linked",
      subtextColor: unlinked > 0 ? "text-amber-700 font-medium" : "text-emerald-600 font-medium",
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
