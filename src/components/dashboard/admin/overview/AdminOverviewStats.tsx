import { Users, GraduationCap, School, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface AdminOverviewStatsProps {
  totalStudents?: number;
  totalTeachers?: number;
  totalClasses?: number;
  totalSections?: number;
  totalSubjects?: number;
  activeDepartments?: number;
}

export function AdminOverviewStats({
  totalStudents = 0,
  totalTeachers = 0,
  totalClasses = 0,
  totalSections = 0,
  totalSubjects = 0,
  activeDepartments = 0,
}: AdminOverviewStatsProps) {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      subtext: totalStudents > 0 ? "Enrolled & active" : "No students",
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
    },
    {
      title: "Active Teachers",
      value: totalTeachers.toLocaleString(),
      subtext: activeDepartments > 0 ? `${activeDepartments} departments` : "Faculty members",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "Classes & Sections",
      value: `${totalClasses} Classes`,
      subtext: `${totalSections} active sections`,
      icon: School,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      title: "Curriculum Subjects",
      value: `${totalSubjects} Subjects`,
      subtext: "Across all classes",
      icon: BookOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="bg-white border-slate-200/90 rounded-2xl shadow-xs hover:border-slate-300 transition-all"
        >
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{stat.subtext}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
