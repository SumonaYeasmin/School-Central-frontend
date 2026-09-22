"use client";

import { useState, useMemo } from "react";
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
  const [selectedClass, setSelectedClass] = useState<string>(routines[0]?.grade || "Class 6");
  const [selectedSectionId, setSelectedSectionId] = useState<string>(routines[0]?.id || "c6-a");
  const [day, setDay] = useState<string>("Monday");
  const [periodKey, setPeriodKey] = useState<"p1" | "p2" | "p3" | "p4" | "p5">("p1");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");

  // Unique Classes list
  const classesList = useMemo(() => {
    return Array.from(new Set(routines.map((r) => r.grade)));
  }, [routines]);

  // Sections of selected class
  const availableSections = useMemo(() => {
    return routines.filter((r) => r.grade === selectedClass);
  }, [routines, selectedClass]);

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    const firstSec = routines.find((r) => r.grade === newClass);
    if (firstSec) {
      setSelectedSectionId(firstSec.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAdd(selectedSectionId, day, periodKey, {
      subject: subject.trim(),
      teacher: teacher.trim() || "Unassigned",
      room: room.trim() || "Room 101",
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
            Schedule a subject period for a specific class and section.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Class & Section Selection */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none font-medium"
              >
                {classesList.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Section</label>
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none font-medium"
              >
                {availableSections.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.section} ({r.room})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weekday & Period Slot */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Weekday</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none font-medium"
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
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 outline-none font-medium"
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
              placeholder="e.g. Mathematics, Physics, English"
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
                placeholder="e.g. Maya Chen"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Room / Lab</label>
              <Input
                type="text"
                placeholder="e.g. Room 101, Lab 01"
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
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs h-9 font-semibold shadow-xs cursor-pointer"
            >
              Add to Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
