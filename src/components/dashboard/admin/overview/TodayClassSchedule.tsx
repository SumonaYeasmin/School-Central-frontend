import Link from "next/link";
import { Clock, BookOpen, ArrowUpRight, CalendarOff, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface TodayClassScheduleProps {
  routines?: any[];
  isLoading?: boolean;
}

export function TodayClassSchedule({ routines = [], isLoading = false }: TodayClassScheduleProps) {
  const daysOrder = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const currentDayIndex = new Date().getDay();
  const currentDayName = daysOrder[currentDayIndex];

  // Try to find today's routines first, if none found, display first 5 from all routines
  const todayRoutines = routines.filter((r) => r.day?.toUpperCase() === currentDayName);
  const displayRoutines = (todayRoutines.length > 0 ? todayRoutines : routines).slice(0, 5);

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    // If it's already in "09:00 AM" format
    if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
    // If it's "HH:mm" 24h format
    const [h, m] = timeStr.split(":").map(Number);
    if (isNaN(h)) return timeStr;
    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    const formattedMinute = (m !== undefined && !isNaN(m)) ? String(m).padStart(2, "0") : "00";
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  return (
    <Card className="lg:col-span-2 bg-white border-slate-200/80 rounded-2xl shadow-xs">
      <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>
              {todayRoutines.length > 0 ? `Today's Schedule (${currentDayName})` : "Class Routine Schedule"}
            </span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            {todayRoutines.length > 0
              ? `${todayRoutines.length} classes scheduled for today`
              : "Active schedule slots across classes and faculty"}
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-xs">Loading class schedule...</span>
          </div>
        ) : displayRoutines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 gap-2">
            <CalendarOff className="h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">No scheduled classes found</p>
            <p className="text-xs text-slate-400 max-w-[260px]">
              Set up class routines and schedules to see active class periods here.
            </p>
          </div>
        ) : (
          displayRoutines.map((item, idx) => {
            const subjectName = item.subject?.name || "Subject";
            const subjectCode = item.subject?.code ? ` (${item.subject.code})` : "";
            const className = item.class?.name || "Class -";
            const sectionName = item.section?.name ? `Section ${item.section.name}` : "";
            const classText = [className, sectionName].filter(Boolean).join(" • ");
            const teacherName = item.teacher?.name || "Faculty Member";
            const roomText = item.roomNumber
              ? item.roomNumber.toLowerCase().includes("room")
                ? item.roomNumber
                : `Room ${item.roomNumber}`
              : "Room -";
            const timeText = `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`;

            return (
              <div 
                key={item.id || idx}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 hover:bg-slate-50 hover:border-slate-200 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-100/60 text-blue-600 shrink-0 mt-0.5 sm:mt-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {subjectName}{subjectCode}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {classText} • <span className="text-slate-700 font-semibold">{teacherName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right self-end sm:self-center">
                  {item.day && todayRoutines.length === 0 && (
                    <Badge variant="secondary" className="bg-slate-200/70 text-slate-700 text-xs px-2 py-0.5 capitalize">
                      {item.day.toLowerCase()}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-white text-slate-700 border-slate-200 text-xs px-2.5 py-0.5 font-medium shadow-2xs">
                    {roomText}
                  </Badge>
                  <span className="text-sm text-blue-600 font-bold whitespace-nowrap">{timeText}</span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
