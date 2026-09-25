"use client";

import { School, BookOpen, Users, Layers } from "lucide-react";
import { TeacherAssignment } from "@/src/types/teacher";

interface ClassOverviewStatsProps {
  assignments: TeacherAssignment[];
}

export function ClassOverviewStats({ assignments }: ClassOverviewStatsProps) {
  const uniqueClasses = new Set(assignments.map((a) => a.class.id)).size;
  const uniqueSections = new Set(assignments.map((a) => `${a.class.id}-${a.section.id}`)).size;
  const uniqueSubjects = new Set(assignments.map((a) => a.subject.id)).size;
  
  // Calculate total students across unique sections
  const sectionStudentMap: Record<string, number> = {};
  assignments.forEach((a) => {
    const key = `${a.class.id}-${a.section.id}`;
    if (a.studentCount !== undefined) {
      sectionStudentMap[key] = a.studentCount;
    }
  });
  const totalStudents = Object.values(sectionStudentMap).reduce((sum, val) => sum + val, 0);

  const stats = [
    {
      title: "Assigned Classes",
      value: uniqueClasses,
      subtitle: "Grade levels taught",
      icon: School,
      color: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Sections",
      value: uniqueSections,
      subtitle: "Classroom sections",
      icon: Layers,
      color: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Teaching Subjects",
      value: uniqueSubjects,
      subtitle: "Academic subjects",
      icon: BookOpen,
      color: "from-violet-600 to-purple-600",
      lightBg: "bg-violet-50 text-violet-600",
    },
    {
      title: "Total Students",
      value: totalStudents > 0 ? totalStudents : assignments.length > 0 ? "100+" : "0",
      subtitle: "Enrolled in your sections",
      icon: Users,
      color: "from-amber-600 to-orange-600",
      lightBg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
              <div className={`h-9 w-9 rounded-xl ${stat.lightBg} flex items-center justify-center`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                {stat.value}
              </span>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
