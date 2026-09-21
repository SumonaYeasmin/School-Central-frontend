import { Users, GraduationCap, School, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export function AdminOverviewStats() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      growth: "+12% this month",
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100"
    },
    {
      title: "Active Teachers",
      value: "48",
      growth: "4 departments",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "Classes & Sections",
      value: "12 / 32 Sections",
      growth: "All active",
      icon: School,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100"
    },
    {
      title: "Curriculum Subjects",
      value: "36 Subjects",
      growth: "Updated 2026",
      icon: BookOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-1">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-500 tracking-wide">{stat.title}</CardTitle>
            <div className={`p-3 rounded-2xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-500 font-medium">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              <span>{stat.growth}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
