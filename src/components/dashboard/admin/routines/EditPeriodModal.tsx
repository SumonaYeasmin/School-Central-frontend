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
import { PeriodSlot } from "./mockRoutines";

interface EditPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: string;
  timeSlot: string;
  periodKey: "p1" | "p2" | "p3" | "p4" | "p5";
  sectionName: string;
  periodData?: PeriodSlot;
  onSave: (
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    updatedData: PeriodSlot
  ) => void;
}

const THEME_OPTIONS = [
  { id: "amber", label: "Amber", bg: "bg-amber-100 border-amber-300 text-amber-800" },
  { id: "blue", label: "Blue", bg: "bg-blue-100 border-blue-300 text-blue-800" },
  { id: "purple", label: "Purple", bg: "bg-purple-100 border-purple-300 text-purple-800" },
  { id: "emerald", label: "Emerald", bg: "bg-emerald-100 border-emerald-300 text-emerald-800" },
  { id: "rose", label: "Rose", bg: "bg-rose-100 border-rose-300 text-rose-800" },
];

export function EditPeriodModal({
  isOpen,
  onClose,
  day,
  timeSlot,
  periodKey,
  sectionName,
  periodData,
  onSave,
}: EditPeriodModalProps) {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [theme, setTheme] = useState<PeriodSlot["theme"]>("blue");

  useEffect(() => {
    if (periodData) {
      setSubject(periodData.subject || "");
      setTeacher(periodData.teacher || "");
      setRoom(periodData.room || "");
      setTheme(periodData.theme || "blue");
    }
  }, [periodData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onSave(day, periodKey, {
      subject: subject.trim(),
      teacher: teacher.trim() || "Unassigned",
      room: room.trim() || "Room TBD",
      theme,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-bold text-slate-900">
            Edit Routine Period
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {sectionName} · {day} ({timeSlot})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* 1. Subject Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Mathematics, Science, English"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-xl border border-slate-200 text-sm focus:border-blue-500"
            />
          </div>

          {/* 2. Teacher Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700">
              Teacher Name
            </label>
            <Input
              type="text"
              placeholder="e.g. Maya Chen, Jon Bell"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="rounded-xl border border-slate-200 text-sm focus:border-blue-500"
            />
          </div>

          {/* 3. Room / Lab */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700">
              Room / Lab
            </label>
            <Input
              type="text"
              placeholder="e.g. Room 12, Lab 02, Studio 01"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="rounded-xl border border-slate-200 text-sm focus:border-blue-500"
            />
          </div>

          {/* 4. Color Theme Selector */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-700">
              Card Color Accent
            </label>
            <div className="flex items-center gap-2">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id as any)}
                  className={`py-1 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    opt.bg
                  } ${
                    theme === opt.id
                      ? "ring-2 ring-slate-800 ring-offset-1 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
