"use client";

import { useState } from "react";
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
import { SectionRoutine, DAYS_OF_WEEK, TIME_SLOTS } from "./mockRoutines";

interface AddRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routines: SectionRoutine[];
  onAdd: (
    sectionId: string,
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    data: { subject: string; teacher: string; room: string; theme: any }
  ) => void;
}

export function AddRoutineModal({
  isOpen,
  onClose,
  routines,
  onAdd,
}: AddRoutineModalProps) {
  const [selectedSectionId, setSelectedSectionId] = useState(routines[0]?.id || "g6-c");
  const [day, setDay] = useState<string>("Monday");
  const [periodKey, setPeriodKey] = useState<"p1" | "p2" | "p3" | "p4" | "p5">("p1");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAdd(selectedSectionId, day, periodKey, {
      subject: subject.trim(),
      teacher: teacher.trim() || "Unassigned",
      room: room.trim() || "Room 12",
      theme: "blue",
    });

    setSubject("");
    setTeacher("");
    setRoom("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-bold text-slate-900">
            Add / Assign Routine Period
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Schedule a subject period for a specific class and weekday.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Class Section Selection */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700">Class & Section</label>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none"
            >
              {routines.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.fullName} ({r.room})
                </option>
              ))}
            </select>
          </div>

          {/* Weekday & Period Slot */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Weekday</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Time Slot</label>
              <select
                value={periodKey}
                onChange={(e) => setPeriodKey(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none"
              >
                {TIME_SLOTS.filter((s) => !s.isBreak).map((s) => (
                  <option key={s.periodKey} value={s.periodKey}>
                    {s.label} ({s.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-xl border border-slate-200 text-sm focus:border-blue-500"
            />
          </div>

          {/* Teacher & Room */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Assigned Teacher</label>
              <Input
                type="text"
                placeholder="Enter teacher name"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Room / Lab</label>
              <Input
                type="text"
                placeholder="Enter room or lab number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="rounded-xl border border-slate-200 text-sm"
              />
            </div>
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
              type="submit"
              className="bg-[#0f2c4a] hover:bg-[#163e66] text-white rounded-xl text-xs h-9 font-semibold shadow-xs cursor-pointer"
            >
              Add to Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
