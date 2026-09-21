import Link from "next/link";
import { CalendarCheck, ArrowUpRight, UserX, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

interface RecentAdmissionsProps {
  students?: any[];
  isLoading?: boolean;
}

export function RecentAdmissions({ students = [], isLoading = false }: RecentAdmissionsProps) {
  // Sort latest first (by admissionDate or createdAt) and take top 5
  const sortedStudents = [...students]
    .sort((a, b) => {
      const dateA = new Date(a.admissionDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.admissionDate || b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  return (
    <Card className="bg-white border-slate-200/80 rounded-2xl shadow-xs flex flex-col">
      <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <CalendarCheck className="h-5 w-5 text-emerald-600" />
            <span>Recent Admissions</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Newly enrolled students ({students.length} total)
          </CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1 rounded-lg font-semibold cursor-pointer">
          <Link href="/admin/dashboard/students">
            <span>All</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-5 flex-1 space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span className="text-xs">Loading students...</span>
          </div>
        ) : sortedStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400 gap-2">
            <UserX className="h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">No recent admissions found</p>
            <p className="text-xs text-slate-400 max-w-[200px]">Enrolled students will appear here automatically.</p>
          </div>
        ) : (
          sortedStudents.map((student) => {
            const className = student.class?.name || "Class -";
            const sectionName = student.section?.name ? `Section ${student.section.name}` : "";
            const classInfo = [className, sectionName].filter(Boolean).join(" - ");

            return (
              <div 
                key={student.id || student.studentId}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-50 hover:border-slate-200 transition-all"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                    {student.name?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-slate-900 truncate">{student.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {classInfo} {student.roll ? `(Roll: ${student.roll})` : ""}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-medium shrink-0 ml-2">
                  {formatDate(student.admissionDate || student.createdAt)}
                </span>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
