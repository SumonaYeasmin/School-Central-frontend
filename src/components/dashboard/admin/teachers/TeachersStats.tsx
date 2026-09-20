"use client";

interface TeachersStatsProps {
  totalStaff?: number;
  assignedTeachers?: number;
  subjectsCovered?: number;
  activeDepartments?: number;
}

export function TeachersStats({
  totalStaff = 0,
  assignedTeachers = 0,
  subjectsCovered = 0,
  activeDepartments = 0,
}: TeachersStatsProps) {
  const assignmentRate =
    totalStaff > 0
      ? `${Math.round((assignedTeachers / totalStaff) * 100)}% allocated`
      : "0% allocated";

  const statCards = [
    {
      title: "Teaching staff",
      value: totalStaff,
      subtext: totalStaff > 0 ? "Registered faculty" : "No records",
      subtextColor: "text-blue-600 font-semibold",
    },
    {
      title: "Active in classes",
      value: assignedTeachers,
      subtext: assignmentRate,
      subtextColor: "text-emerald-600 font-semibold",
    },
    {
      title: "Subjects covered",
      value: subjectsCovered,
      subtext: "Across all classes",
      subtextColor: "text-emerald-600 font-medium",
    },
    {
      title: "Departments",
      value: activeDepartments,
      subtext: "Academic wings",
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
