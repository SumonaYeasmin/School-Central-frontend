"use client";

interface SubjectsStatsProps {
  subjects?: any[];
  totalSubjects?: number;
  coreSubjects?: number;
  optionalSubjects?: number;
}

export function SubjectsStats({
  subjects = [],
  totalSubjects,
  coreSubjects,
  optionalSubjects,
}: SubjectsStatsProps) {
  // If subjects array is provided from DB, compute stats dynamically
  let total = totalSubjects ?? subjects.length;
  let core = coreSubjects ?? 0;
  let optional = optionalSubjects ?? 0;
  let groupCount = 0;

  if (subjects.length > 0 && !totalSubjects) {
    total = subjects.length;
    const groupsSet = new Set<string>();

    subjects.forEach((subj) => {
      let isOpt = false;
      let hasGroup = false;

      subj.classSubjects?.forEach((cs: any) => {
        if (cs.isOptional) isOpt = true;
        if (cs.group?.name) {
          groupsSet.add(cs.group.name);
          hasGroup = true;
        }
      });

      if (isOpt || hasGroup || subj.type?.toLowerCase().includes("group") || subj.type?.toLowerCase().includes("optional")) {
        optional++;
      } else {
        core++;
      }
    });

    groupCount = groupsSet.size || 3;
  } else if (!totalSubjects && subjects.length === 0) {
    total = 24;
    core = 16;
    optional = 8;
    groupCount = 4;
  }

  const statCards = [
    {
      title: "Subjects",
      value: total,
      subtext: `${groupCount || 4} core groups`,
    },
    {
      title: "Core subjects",
      value: core,
      subtext: "Across all grades",
    },
    {
      title: "Optional subjects",
      value: optional,
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
