import Link from "next/link";
import { Clock, BookOpen, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

export function TodayClassSchedule() {
  const todayClasses = [
    { subject: "Higher Mathematics", class: "Class 10 - A", time: "09:00 AM - 09:45 AM", teacher: "Mr. Rafiqul Islam", room: "Room 402" },
    { subject: "Physics", class: "Class 9 - B", time: "10:00 AM - 10:45 AM", teacher: "Dr. Anisur Rahman", room: "Lab 2" },
    { subject: "English Language", class: "Class 8 - A", time: "11:00 AM - 11:45 AM", teacher: "Ms. Farzana Haque", room: "Room 301" },
  ];

  return (
    <Card className="lg:col-span-2 bg-white border-slate-200/80 rounded-2xl shadow-xs">
      <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Today&apos;s Class Schedule</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Ongoing and upcoming scheduled periods across all classes
          </CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 rounded-lg font-semibold cursor-pointer">
          <Link href="/admin/dashboard/routines">
            <span>View All</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-5 space-y-3.5">
        {todayClasses.map((item, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 hover:bg-slate-50 hover:border-slate-200 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-100/60 text-blue-600 shrink-0 mt-0.5 sm:mt-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {item.class} • <span className="text-slate-700 font-semibold">{item.teacher}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right self-end sm:self-center">
              <Badge variant="outline" className="bg-white text-slate-700 border-slate-200 text-xs px-2.5 py-0.5 font-medium shadow-2xs">
                {item.room}
              </Badge>
              <span className="text-sm text-blue-600 font-bold">{item.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
