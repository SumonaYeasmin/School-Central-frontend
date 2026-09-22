"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Coffee, CalendarOff, Edit3 } from "lucide-react";
import {
  SectionRoutine,
  TIME_SLOTS,
  DAYS_OF_WEEK,
  PeriodSlot,
} from "./mockRoutines";

interface WeeklyTimetableProps {
  routine?: SectionRoutine;
  onEditPeriod?: (
    day: string,
    timeSlot: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    periodData: PeriodSlot
  ) => void;
  onOpenFullEdit?: () => void;
}

// Pastel theme mapping matching the screenshot exactly
const THEME_STYLES = {
  amber: "bg-[#fef8ee] border-[#faeedb] hover:border-amber-400 text-[#8a4b08]",
  blue: "bg-[#eff6ff] border-[#dbeafe] hover:border-blue-400 text-[#13519c]",
  purple: "bg-[#faf5ff] border-[#f3e8ff] hover:border-purple-400 text-[#652d90]",
  emerald: "bg-[#f0fdf4] border-[#dcfce7] hover:border-emerald-400 text-[#1b6b3e]",
  rose: "bg-[#fff1f2] border-[#ffe4e6] hover:border-rose-400 text-[#9c1833]",
  gray: "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700",
};

export function WeeklyTimetable({
  routine,
  onEditPeriod,
  onOpenFullEdit,
}: WeeklyTimetableProps) {
  if (!routine) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center shadow-xs">
        <p className="text-sm font-semibold text-slate-700">No Routine Selected</p>
        <p className="text-xs text-slate-400 mt-1">
          Please select a Class and Section above to view its timetable.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* 1. Timetable Header with Update Routine Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            WEEKLY TIMETABLE
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h2 className="text-xl font-bold text-slate-900">
              {routine.fullName || `${routine.grade} · ${routine.section}`}
            </h2>

            {/* UPDATE / EDIT BUTTON */}
            <Button
              type="button"
              onClick={onOpenFullEdit}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Update Routine</span>
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
            <span>
              Class Teacher:{" "}
              <strong className="text-slate-800 font-semibold">
                {routine.classTeacher || "Unassigned"}
              </strong>
            </span>
            <span>•</span>
            <span>
              Room:{" "}
              <strong className="text-slate-800 font-semibold">
                {routine.room || "Room 101"}
              </strong>
            </span>
            <span>•</span>
            <span>
              <strong className="text-slate-800 font-semibold">
                {routine.studentCount || 30}
              </strong>{" "}
              Students
            </span>
            <span>•</span>
            <span className="text-slate-400">Click any period card to edit individually</span>
          </p>
        </div>

        {/* Off day indicators */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-500 border-slate-200 text-xs font-medium py-1 px-3 rounded-xl flex items-center gap-1.5"
          >
            <CalendarOff className="h-3.5 w-3.5 text-slate-400" />
            <span>Saturday · Weekend</span>
          </Badge>
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-500 border-slate-200 text-xs font-medium py-1 px-3 rounded-xl flex items-center gap-1.5"
          >
            <CalendarOff className="h-3.5 w-3.5 text-slate-400" />
            <span>Sunday · Weekend</span>
          </Badge>
        </div>
      </div>

      {/* 2. Full Weekly Schedule Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-28">Time</th>
              {DAYS_OF_WEEK.map((day) => (
                <th
                  key={day}
                  className="py-3.5 px-3 text-center font-bold text-slate-700 text-xs"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TIME_SLOTS.map((slot, sIdx) => {
              // Handle Tiffin / Lunch Break
              if (slot.isBreak) {
                return (
                  <tr key={sIdx} className="bg-amber-50/20">
                    <td className="py-4 px-4 text-xs font-bold text-slate-400 whitespace-nowrap align-middle">
                      {slot.time}
                    </td>
                    <td colSpan={5} className="py-2.5 px-3">
                      <div className="bg-amber-50/80 border border-dashed border-amber-200 rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-center shadow-2xs">
                        <Coffee className="h-4 w-4 text-amber-600" />
                        <div>
                          <span className="font-bold text-amber-900 text-xs block sm:inline">
                            Tiffin break
                          </span>
                          <span className="text-[11px] text-amber-700 font-medium sm:ml-2">
                            · 1 hour (All Sections)
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }

              // Handle Regular Academic Periods
              return (
                <tr key={sIdx} className="hover:bg-slate-50/30 transition-colors">
                  {/* Time column */}
                  <td className="py-4 px-4 text-xs font-bold text-slate-400 whitespace-nowrap align-middle">
                    {slot.time}
                  </td>

                  {/* 5 Days columns */}
                  {DAYS_OF_WEEK.map((day) => {
                    const daySchedule = routine?.schedule?.[day];
                    const period: PeriodSlot | undefined =
                      daySchedule?.[slot.periodKey!];

                    if (!period) {
                      return (
                        <td key={day} className="py-2.5 px-2 text-center">
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs text-slate-300">
                            -
                          </div>
                        </td>
                      );
                    }

                    const themeClass =
                      THEME_STYLES[period.theme] || THEME_STYLES.blue;

                    return (
                      <td key={day} className="py-2.5 px-2 align-middle">
                        <div
                          onClick={() =>
                            onEditPeriod?.(
                              day,
                              slot.time,
                              slot.periodKey!,
                              period
                            )
                          }
                          title="Click to edit this period"
                          className={`group/period relative border rounded-2xl p-3.5 transition-all duration-150 shadow-2xs flex flex-col justify-between h-[88px] text-left cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-98 ${themeClass}`}
                        >
                          {/* Subject Title & Edit Button */}
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="font-bold text-slate-900 text-xs truncate">
                              {period.subject}
                            </span>
                            <div className="flex items-center justify-center h-5 w-5 rounded-md bg-white/90 border border-black/5 text-slate-600 hover:text-blue-600 shadow-2xs shrink-0">
                              <Edit3 className="h-3 w-3" />
                            </div>
                          </div>

                          {/* Teacher Name & Room */}
                          <div className="flex items-center justify-between text-[11px] font-medium opacity-90 mt-1">
                            <span className="truncate pr-1">
                              {period.teacher}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 shrink-0 font-semibold">
                              {period.room}
                            </span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
