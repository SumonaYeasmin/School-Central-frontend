import Link from "next/link";
import { CalendarCheck, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export function RecentAdmissions() {
  const recentAdmissions = [
    { id: "STU-2026-001", name: "Aarav Rahman", class: "Class 10 - Section A", roll: "01", date: "Today" },
    { id: "STU-2026-002", name: "Fatima Zahra", class: "Class 9 - Section B", roll: "05", date: "Yesterday" },
    { id: "STU-2026-003", name: "Tanvir Ahmed", class: "Class 8 - Section A", roll: "12", date: "2 days ago" },
    { id: "STU-2026-004", name: "Nusrat Jahan", class: "Class 10 - Section B", roll: "03", date: "3 days ago" },
  ];

  return (
    <Card className="bg-white border-slate-200/80 rounded-2xl shadow-xs flex flex-col">
      <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <CalendarCheck className="h-5 w-5 text-emerald-600" />
            <span>Recent Admissions</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Newly enrolled students
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
        {recentAdmissions.map((student) => (
          <div 
            key={student.id}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-50 hover:border-slate-200 transition-all"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-slate-900 truncate">{student.name}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{student.class} (Roll: {student.roll})</p>
              </div>
            </div>

            <span className="text-xs text-slate-400 font-medium shrink-0 ml-2">{student.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
