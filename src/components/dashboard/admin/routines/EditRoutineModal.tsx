"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { SectionRoutine, DAYS_OF_WEEK, TIME_SLOTS, PeriodSlot, GROUP_SUBJECT_PRESETS, AVAILABLE_ROOMS } from "./mockRoutines";

interface EditRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine?: SectionRoutine;
  onSaveRoutine: (updatedRoutine: SectionRoutine) => void;
}

export function EditRoutineModal({
  isOpen,
  onClose,
  routine,
  onSaveRoutine,
}: EditRoutineModalProps) {
  const [activeDay, setActiveDay] = useState<(typeof DAYS_OF_WEEK)[number]>("Monday");
  const [formData, setFormData] = useState<SectionRoutine | undefined>(routine);

  // Sync state when routine or modal opens
  useEffect(() => {
    if (routine) {
      setFormData(routine);
    }
  }, [routine, isOpen]);

  if (!routine || !formData) return null;

  const handlePeriodChange = (
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    field: keyof PeriodSlot,
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          [activeDay]: {
            ...prev.schedule?.[activeDay],
            [periodKey]: {
              ...prev.schedule?.[activeDay]?.[periodKey],
              [field]: value,
            },
          },
        },
      };
    });
  };

  const handleGroupSlotChange = (
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    groupIndex: number,
    field: "subject" | "teacher" | "room",
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const currentPeriod = prev.schedule?.[activeDay]?.[periodKey];
      if (!currentPeriod?.groupSlots) return prev;

      const updatedGroups = [...currentPeriod.groupSlots];
      updatedGroups[groupIndex] = {
        ...updatedGroups[groupIndex],
        [field]: value,
      };

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          [activeDay]: {
            ...prev.schedule?.[activeDay],
            [periodKey]: {
              ...currentPeriod,
              groupSlots: updatedGroups,
            },
          },
        },
      };
    });
  };

  const handleSave = () => {
    if (formData) {
      onSaveRoutine(formData);
    }
    onClose();
  };

  const currentDaySchedule = formData?.schedule?.[activeDay];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>✏️ Update Routine Schedule</span>
            <span className="text-blue-600 font-extrabold text-base bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
              {routine.fullName || `${routine.grade} · ${routine.section}`}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Select a weekday below and update the subject, teacher, and room for each period slot.
          </DialogDescription>
        </DialogHeader>

        {/* 1. Day Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mt-3 overflow-x-auto">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeDay === day
                  ? "bg-white text-blue-600 shadow-xs scale-100"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* 2. Period Editors for Selected Day */}
        <div className="space-y-3.5 mt-4">
          {TIME_SLOTS.map((slot) => {
            if (slot.isBreak) {
              return (
                <div
                  key="tiffin"
                  className="bg-amber-50/80 border border-dashed border-amber-200 rounded-xl p-3 text-center text-xs font-bold text-amber-800"
                >
                  ☕ Tiffin Break (1:00 PM – 2:00 PM) · Scheduled Daily
                </div>
              );
            }

            const pKey = slot.periodKey!;
            const period = currentDaySchedule?.[pKey];

            if (period?.isGroupPeriod && period?.groupSlots && period.groupSlots.length > 0) {
              return (
                <div
                  key={pKey}
                  className="bg-blue-50/30 border border-blue-200/80 rounded-2xl p-3.5 space-y-2.5 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 bg-white border border-blue-200 py-0.5 px-2.5 rounded-lg shadow-2xs">
                      {slot.label} ({slot.time}) · 3-Group Electives
                    </span>
                  </div>

                  <div className="space-y-2">
                    {period.groupSlots.map((grp, gIdx) => {
                      const groupKey =
                        grp.group.toLowerCase().includes("sci")
                          ? "Science"
                          : grp.group.toLowerCase().includes("art") ||
                            grp.group.toLowerCase().includes("hum")
                          ? "Arts"
                          : "Commerce";

                      const groupPresetList = GROUP_SUBJECT_PRESETS[groupKey] || [];
                      const subjectOptions = Array.from(
                        new Set([...groupPresetList, grp.subject].filter(Boolean))
                      );

                      return (
                        <div
                          key={gIdx}
                          className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-white border border-slate-200/70 p-2 rounded-xl"
                        >
                          <span className="text-xs font-bold text-slate-800 sm:col-span-1">
                            {grp.group}:
                          </span>
                          <select
                            value={grp.subject}
                            onChange={(e) =>
                              handleGroupSlotChange(pKey, gIdx, "subject", e.target.value)
                            }
                            className="bg-slate-50 text-xs h-8 rounded-lg px-2 border border-slate-200 font-semibold focus:border-blue-500 outline-none cursor-pointer"
                          >
                            {subjectOptions.map((sub) => (
                              <option key={sub} value={sub}>
                                {sub}
                              </option>
                            ))}
                          </select>
                          <Input
                            type="text"
                            value={grp.teacher}
                            onChange={(e) =>
                              handleGroupSlotChange(pKey, gIdx, "teacher", e.target.value)
                            }
                            placeholder="Teacher"
                            className="bg-slate-50 text-xs h-8 rounded-lg"
                          />
                          <select
                            value={grp.room}
                            onChange={(e) =>
                              handleGroupSlotChange(pKey, gIdx, "room", e.target.value)
                            }
                            className="bg-slate-50 text-xs h-8 rounded-lg px-2 border border-slate-200 font-semibold focus:border-blue-500 outline-none cursor-pointer"
                          >
                            {AVAILABLE_ROOMS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={pKey}
                className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 py-0.5 px-2.5 rounded-lg shadow-2xs">
                    {slot.label} ({slot.time})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Subject
                    </label>
                    <Input
                      type="text"
                      value={period?.subject || ""}
                      onChange={(e) =>
                        handlePeriodChange(pKey, "subject", e.target.value)
                      }
                      className="bg-white rounded-xl text-xs h-8 font-semibold"
                      placeholder="Enter subject name"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Teacher
                    </label>
                    <Input
                      type="text"
                      value={period?.teacher || ""}
                      onChange={(e) =>
                        handlePeriodChange(pKey, "teacher", e.target.value)
                      }
                      className="bg-white rounded-xl text-xs h-8"
                      placeholder="Enter teacher name"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Room / Lab
                    </label>
                    <select
                      value={period?.room || "Room 101"}
                      onChange={(e) =>
                        handlePeriodChange(pKey, "room", e.target.value)
                      }
                      className="w-full bg-white rounded-xl text-xs h-8 px-2 border border-slate-200 font-semibold focus:border-blue-500 outline-none cursor-pointer"
                    >
                      {AVAILABLE_ROOMS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl text-xs h-9 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs h-9 font-semibold shadow-xs cursor-pointer"
          >
            Save All Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
