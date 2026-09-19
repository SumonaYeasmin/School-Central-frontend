import { Card, CardContent } from "@/src/components/ui/card";
import { School, Layers } from "lucide-react";

interface ClassesStatsProps {
  classes?: any[];
}

export function ClassesStats({ classes = [] }: ClassesStatsProps) {
  const totalClasses = classes.length;
  const totalSections = classes.reduce(
    (acc, curr) => acc + (curr.sections?.length || 0),
    0
  );

  const stats = [
    {
      title: "Total Classes",
      value: totalClasses.toString(),
      subtext: totalClasses > 0 ? "Grade 6 to Grade 10" : "No classes found",
      icon: School,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Sections",
      value: totalSections.toString(),
      subtext: "Active Sections (Section A & B)",
      icon: Layers,
      iconBg: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="bg-white border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500">{stat.subtext}</p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} shadow-xs shrink-0`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
