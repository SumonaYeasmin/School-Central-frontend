"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Coffee, Edit3, Calendar, Plus } from "lucide-react";
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
  onOpenAddRoutine?: () => void;
  onAddPeriodSlot?: (
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5"
  ) => void;
}

// Vibrant, modern theme styling
const THEME_STYLES: Record<string, string> = {
  amber: "bg-gradient-to-br from-amber-50 via-orange-50/70 to-yellow-50/50 border-amber-200 border-l-[4px] border-l-amber-500 text-amber-950 hover:border-amber-400 hover:shadow-sm",
  blue: "bg-gradient-to-br from-blue-50 via-sky-50/70 to-indigo-50/50 border-blue-200 border-l-[4px] border-l-blue-600 text-blue-950 hover:border-blue-400 hover:shadow-sm",
  purple: "bg-gradient-to-br from-purple-50 via-violet-50/70 to-indigo-50/50 border-purple-200 border-l-[4px] border-l-purple-600 text-purple-950 hover:border-purple-400 hover:shadow-sm",
  emerald: "bg-gradient-to-br from-emerald-50 via-teal-50/70 to-green-50/50 border-emerald-200 border-l-[4px] border-l-emerald-600 text-emerald-950 hover:border-emerald-400 hover:shadow-sm",
  rose: "bg-gradient-to-br from-rose-50 via-pink-50/70 to-red-50/50 border-rose-200 border-l-[4px] border-l-rose-500 text-rose-950 hover:border-rose-400 hover:shadow-sm",
  gray: "bg-slate-50 border-slate-200 border-l-[4px] border-l-slate-400 text-slate-800 hover:border-slate-300",
};

export function WeeklyTimetable({
  routine,
  onEditPeriod,
  onOpenFullEdit,
  onOpenAddRoutine,
  onAddPeriodSlot,
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

  // Filter periods (p1, p2, p3, p4, p5)
  const regularPeriods = TIME_SLOTS.filter((s) => !s.isBreak);
  const morningPeriods = regularPeriods.slice(0, 3); // p1, p2, p3
  const afternoonPeriods = regularPeriods.slice(3); // p4, p5

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* 1. Timetable Header with Add and Update Routine Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-blue-500" />
            <span>WEEKLY TIMETABLE SCHEDULE</span>
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h2 className="text-xl font-black text-slate-900">
              {routine.fullName || `${routine.grade} · ${routine.section}`}
            </h2>
          </div>
        </div>

        {/* Action Buttons: Add Routine & Update Routine */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={onOpenAddRoutine}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Add Routine</span>
          </Button>

          <Button
            type="button"
            onClick={onOpenFullEdit}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Update Routine</span>
          </Button>
        </div>
      </div>

      {/* 2. Horizontal Time / Vertical Weekday Schedule Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          {/* Columns Header (Time / Periods Horizontally) */}
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50/80 text-xs text-slate-700">
              {/* Vertical Day Header */}
              <th className="py-3 px-4 w-32 font-black uppercase tracking-wider text-slate-500">
                Weekday
              </th>

              {/* Morning Periods (p1, p2, p3) */}
              {morningPeriods.map((slot) => (
                <th key={slot.periodKey} className="py-3 px-3 text-center font-bold">
                  <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                </th>
              ))}

              {/* Tiffin Break Column */}
              <th className="py-3 px-2.5 text-center font-bold w-24 bg-amber-50/40 border-x border-amber-100">
                <div className="text-xs font-extrabold text-amber-800 flex items-center justify-center gap-1">
                  <Coffee className="h-3.5 w-3.5 text-amber-600" />
                  <span>Tiffin</span>
                </div>
                <div className="text-[11px] font-medium text-amber-600/80 mt-0.5">1:00–2:00</div>
              </th>

              {/* Afternoon Periods (p4, p5) */}
              {afternoonPeriods.map((slot) => (
                <th key={slot.periodKey} className="py-3 px-3 text-center font-bold">
                  <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows (Days of Week Vertically) */}
          <tbody className="divide-y divide-slate-100 bg-white">
            {DAYS_OF_WEEK.map((day) => {
              const daySchedule = routine?.schedule?.[day];

              return (
                <tr key={day} className="hover:bg-blue-50/15 transition-colors">
                  {/* Left Column: Day Label */}
                  <td className="py-3.5 px-4 font-black text-xs text-slate-800 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-extrabold text-slate-900">{day}</span>
                    </div>
                  </td>

                  {/* Morning Periods (p1, p2, p3) */}
                  {morningPeriods.map((slot) => {
                    const pKey = slot.periodKey!;
                    const period: PeriodSlot | undefined = daySchedule?.[pKey];

                    if (!period) {
                      return (
                        <td key={pKey} className="py-2 px-1.5 align-middle text-center">
                          <button
                            type="button"
                            onClick={() => onAddPeriodSlot?.(day, pKey)}
                            title={`Add routine for ${day} ${slot.label}`}
                            className="w-full min-h-[82px] bg-slate-50/60 hover:bg-blue-50/80 border border-dashed border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-blue-600 transition-all cursor-pointer group"
                          >
                            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-semibold">Add Slot</span>
                          </button>
                        </td>
                      );
                    }

                    const themeClass = THEME_STYLES[period.theme] || THEME_STYLES.blue;

                    return (
                      <td key={pKey} className="py-2 px-1.5 align-middle">
                        {period.isGroupPeriod && period.groupSlots && period.groupSlots.length > 0 ? (
                          <div
                            onClick={() => onEditPeriod?.(day, slot.time, pKey, period)}
                            title={`Click to edit Group Period (${period.groupSlots.length} Groups)`}
                            className="border border-blue-200/90 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/60 rounded-xl p-2 transition-all duration-150 shadow-2xs hover:shadow-md hover:border-blue-400 hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between min-h-[88px] text-left cursor-pointer space-y-1"
                          >
                            <div className="space-y-1 w-full">
                              {period.groupSlots.map((grp, idx) => {
                                const isSci = grp.group.toLowerCase().includes("sci");
                                const isArts = grp.group.toLowerCase().includes("art") || grp.group.toLowerCase().includes("hum");

                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-[11px] gap-1 bg-white/90 border border-slate-200/80 rounded-lg px-2 py-0.5 shadow-2xs"
                                  >
                                    <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                                      <span
                                        className={`text-[9px] font-black px-1.5 py-0.2 rounded shrink-0 uppercase tracking-wider ${
                                          isSci
                                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                            : isArts
                                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                                            : "bg-blue-100 text-blue-800 border border-blue-200"
                                        }`}
                                      >
                                        {grp.group.slice(0, 3)}
                                      </span>
                                      <span className="font-extrabold text-slate-900 truncate text-[11px]">
                                        {grp.subject}
                                      </span>
                                      <span className="text-slate-400 text-[10px] truncate hidden md:inline">
                                        • {grp.teacher}
                                      </span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold shrink-0 border border-slate-200/60">
                                      {grp.room}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => onEditPeriod?.(day, slot.time, pKey, period)}
                            title={`Click to edit ${period.subject}`}
                            className={`border rounded-xl p-3 transition-all duration-150 shadow-2xs flex flex-col justify-between min-h-[82px] text-left cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.99] ${themeClass}`}
                          >
                            <div className="font-extrabold text-slate-900 text-xs truncate">
                              {period.subject}
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-medium opacity-90 mt-1">
                              <span className="truncate pr-1 font-semibold text-slate-700">
                                {period.teacher}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 shrink-0 font-bold text-slate-800">
                                {period.room}
                              </span>
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}

                  {/* Tiffin Break Column Separator */}
                  <td className="py-2 px-1.5 text-center align-middle bg-amber-50/20 border-x border-amber-100">
                    <div className="py-2 px-1 text-[11px] font-bold text-amber-700/80 bg-amber-50/60 border border-amber-200/60 rounded-lg">
                      Break
                    </div>
                  </td>

                  {/* Afternoon Periods (p4, p5) */}
                  {afternoonPeriods.map((slot) => {
                    const pKey = slot.periodKey!;
                    const period: PeriodSlot | undefined = daySchedule?.[pKey];

                    if (!period) {
                      return (
                        <td key={pKey} className="py-2 px-1.5 align-middle text-center">
                          <button
                            type="button"
                            onClick={() => onAddPeriodSlot?.(day, pKey)}
                            title={`Add routine for ${day} ${slot.label}`}
                            className="w-full min-h-[82px] bg-slate-50/60 hover:bg-blue-50/80 border border-dashed border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-blue-600 transition-all cursor-pointer group"
                          >
                            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-semibold">Add Slot</span>
                          </button>
                        </td>
                      );
                    }

                    const themeClass = THEME_STYLES[period.theme] || THEME_STYLES.blue;

                    return (
                      <td key={pKey} className="py-2 px-1.5 align-middle">
                        {period.isGroupPeriod && period.groupSlots && period.groupSlots.length > 0 ? (
                          <div
                            onClick={() => onEditPeriod?.(day, slot.time, pKey, period)}
                            title={`Click to edit Group Period (${period.groupSlots.length} Groups)`}
                            className="border border-blue-200/90 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/60 rounded-xl p-2 transition-all duration-150 shadow-2xs hover:shadow-md hover:border-blue-400 hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between min-h-[88px] text-left cursor-pointer space-y-1"
                          >
                            <div className="space-y-1 w-full">
                              {period.groupSlots.map((grp, idx) => {
                                const isSci = grp.group.toLowerCase().includes("sci");
                                const isArts = grp.group.toLowerCase().includes("art") || grp.group.toLowerCase().includes("hum");

                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-[11px] gap-1 bg-white/90 border border-slate-200/80 rounded-lg px-2 py-0.5 shadow-2xs"
                                  >
                                    <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                                      <span
                                        className={`text-[9px] font-black px-1.5 py-0.2 rounded shrink-0 uppercase tracking-wider ${
                                          isSci
                                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                            : isArts
                                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                                            : "bg-blue-100 text-blue-800 border border-blue-200"
                                        }`}
                                      >
                                        {grp.group.slice(0, 3)}
                                      </span>
                                      <span className="font-extrabold text-slate-900 truncate text-[11px]">
                                        {grp.subject}
                                      </span>
                                      <span className="text-slate-400 text-[10px] truncate hidden md:inline">
                                        • {grp.teacher}
                                      </span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold shrink-0 border border-slate-200/60">
                                      {grp.room}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => onEditPeriod?.(day, slot.time, pKey, period)}
                            title={`Click to edit ${period.subject}`}
                            className={`border rounded-xl p-3 transition-all duration-150 shadow-2xs flex flex-col justify-between min-h-[82px] text-left cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.99] ${themeClass}`}
                          >
                            <div className="font-extrabold text-slate-900 text-xs truncate">
                              {period.subject}
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-medium opacity-90 mt-1">
                              <span className="truncate pr-1 font-semibold text-slate-700">
                                {period.teacher}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 shrink-0 font-bold text-slate-800">
                                {period.room}
                              </span>
                            </div>
                          </div>
                        )}
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
