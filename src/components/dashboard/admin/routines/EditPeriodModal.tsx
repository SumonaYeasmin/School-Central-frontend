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
import { Layers, Sparkles, BookOpen, User, MapPin } from "lucide-react";
import { PeriodSlot, GroupSubjectEntry, GROUP_SUBJECT_PRESETS, AVAILABLE_ROOMS } from "./mockRoutines";

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
  { id: "blue", label: "Blue", bg: "bg-blue-100 border-blue-300 text-blue-800" },
  { id: "emerald", label: "Emerald", bg: "bg-emerald-100 border-emerald-300 text-emerald-800" },
  { id: "amber", label: "Amber", bg: "bg-amber-100 border-amber-300 text-amber-800" },
  { id: "purple", label: "Purple", bg: "bg-purple-100 border-purple-300 text-purple-800" },
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
  // Mode: "single" or "group"
  const [slotType, setSlotType] = useState<"single" | "group">("single");

  // Single Subject States
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [theme, setTheme] = useState<PeriodSlot["theme"]>("blue");

  // Group Elective States (Science, Arts, Commerce)
  const [scienceSubject, setScienceSubject] = useState("Physics");
  const [scienceTeacher, setScienceTeacher] = useState("Rafael Ortiz");
  const [scienceRoom, setScienceRoom] = useState("Physics Lab");

  const [artsSubject, setArtsSubject] = useState("History & Civics");
  const [artsTeacher, setArtsTeacher] = useState("Farhana Sultana");
  const [artsRoom, setArtsRoom] = useState("Room 201");

  const [commerceSubject, setCommerceSubject] = useState("Accounting");
  const [commerceTeacher, setCommerceTeacher] = useState("Robert Kiyosaki");
  const [commerceRoom, setCommerceRoom] = useState("Room 202");

  const scienceSubjectOptions = Array.from(
    new Set([...GROUP_SUBJECT_PRESETS.Science, scienceSubject].filter(Boolean))
  );
  const artsSubjectOptions = Array.from(
    new Set([...GROUP_SUBJECT_PRESETS.Arts, artsSubject].filter(Boolean))
  );
  const commerceSubjectOptions = Array.from(
    new Set([...GROUP_SUBJECT_PRESETS.Commerce, commerceSubject].filter(Boolean))
  );

  useEffect(() => {
    if (periodData && isOpen) {
      if (periodData.isGroupPeriod && periodData.groupSlots && periodData.groupSlots.length > 0) {
        setSlotType("group");
        
        // Populate Science
        const sci = periodData.groupSlots.find((g) => g.group.toLowerCase().includes("sci"));
        if (sci) {
          setScienceSubject(sci.subject || "Physics");
          setScienceTeacher(sci.teacher || "Teacher");
          setScienceRoom(sci.room || "Lab");
        }

        // Populate Arts
        const arts = periodData.groupSlots.find((g) => g.group.toLowerCase().includes("art") || g.group.toLowerCase().includes("hum"));
        if (arts) {
          setArtsSubject(arts.subject || "History");
          setArtsTeacher(arts.teacher || "Teacher");
          setArtsRoom(arts.room || "Room 201");
        }

        // Populate Commerce
        const com = periodData.groupSlots.find((g) => g.group.toLowerCase().includes("com") || g.group.toLowerCase().includes("bus"));
        if (com) {
          setCommerceSubject(com.subject || "Accounting");
          setCommerceTeacher(com.teacher || "Teacher");
          setCommerceRoom(com.room || "Room 202");
        }
      } else {
        setSlotType("single");
        setSubject(periodData.subject || "");
        setTeacher(periodData.teacher || "");
        setRoom(periodData.room || "");
        setTheme(periodData.theme || "blue");
      }
    }
  }, [periodData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (slotType === "group") {
      const groupSlots: GroupSubjectEntry[] = [
        {
          group: "Science",
          subject: scienceSubject.trim() || "Science Subject",
          teacher: scienceTeacher.trim() || "Science Faculty",
          room: scienceRoom.trim() || "Science Lab",
        },
        {
          group: "Arts",
          subject: artsSubject.trim() || "Arts Subject",
          teacher: artsTeacher.trim() || "Arts Faculty",
          room: artsRoom.trim() || "Arts Room",
        },
        {
          group: "Commerce",
          subject: commerceSubject.trim() || "Commerce Subject",
          teacher: commerceTeacher.trim() || "Commerce Faculty",
          room: commerceRoom.trim() || "Commerce Room",
        },
      ];

      onSave(day, periodKey, {
        subject: `Group Electives (${scienceSubject} / ${artsSubject} / ${commerceSubject})`,
        teacher: "Multi Faculty",
        room: "Labs & Rooms",
        theme: "blue",
        isGroupPeriod: true,
        groupSlots,
      });
    } else {
      if (!subject.trim()) return;

      onSave(day, periodKey, {
        subject: subject.trim(),
        teacher: teacher.trim() || "Unassigned",
        room: room.trim() || "Room TBD",
        theme,
        isGroupPeriod: false,
        groupSlots: undefined,
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Edit Routine Period</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            {sectionName} · {day} ({timeSlot})
          </DialogDescription>
        </DialogHeader>

        {/* 1. Slot Type Selector (Single Subject vs 3-Group Elective) */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl mt-3">
          <button
            type="button"
            onClick={() => setSlotType("single")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              slotType === "single"
                ? "bg-white text-blue-600 shadow-xs scale-100"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Single / Common Subject
          </button>
          <button
            type="button"
            onClick={() => setSlotType("group")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              slotType === "group"
                ? "bg-white text-blue-600 shadow-xs scale-100"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>3-Group Elective (Sci + Arts + Com)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-left">
          {slotType === "group" ? (
            /* ================= MULTI GROUP SECTION (Science + Arts + Commerce) ================= */
            <div className="space-y-3.5">
              <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium">
                💡 During this period, Science, Arts, and Commerce students have separate elective classes simultaneously in their designated rooms/labs.
              </div>

              {/* 1. Science Group */}
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
                    Science Group
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    {scienceSubjectOptions.length} Subjects
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject *</label>
                    <select
                      value={scienceSubject}
                      onChange={(e) => setScienceSubject(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-emerald-200 bg-white text-xs font-semibold focus:border-emerald-500 outline-none cursor-pointer"
                    >
                      {scienceSubjectOptions.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Teacher</label>
                    <Input
                      type="text"
                      placeholder="e.g. Rafael Ortiz"
                      value={scienceTeacher}
                      onChange={(e) => setScienceTeacher(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab *</label>
                    <select
                      value={scienceRoom}
                      onChange={(e) => setScienceRoom(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-emerald-200 bg-white text-xs font-semibold focus:border-emerald-500 outline-none cursor-pointer"
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

              {/* 2. Arts / Humanities Group */}
              <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-600 text-white uppercase tracking-wider">
                    Arts / Humanities Group
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700">
                    {artsSubjectOptions.length} Subjects
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject *</label>
                    <select
                      value={artsSubject}
                      onChange={(e) => setArtsSubject(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-amber-200 bg-white text-xs font-semibold focus:border-amber-500 outline-none cursor-pointer"
                    >
                      {artsSubjectOptions.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Teacher</label>
                    <Input
                      type="text"
                      placeholder="e.g. Farhana Sultana"
                      value={artsTeacher}
                      onChange={(e) => setArtsTeacher(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab *</label>
                    <select
                      value={artsRoom}
                      onChange={(e) => setArtsRoom(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-amber-200 bg-white text-xs font-semibold focus:border-amber-500 outline-none cursor-pointer"
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

              {/* 3. Commerce / Business Group */}
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
                    Commerce / Business Studies Group
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700">
                    {commerceSubjectOptions.length} Subjects
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject *</label>
                    <select
                      value={commerceSubject}
                      onChange={(e) => setCommerceSubject(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-blue-200 bg-white text-xs font-semibold focus:border-blue-500 outline-none cursor-pointer"
                    >
                      {commerceSubjectOptions.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Teacher</label>
                    <Input
                      type="text"
                      placeholder="e.g. Robert Kiyosaki"
                      value={commerceTeacher}
                      onChange={(e) => setCommerceTeacher(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab *</label>
                    <select
                      value={commerceRoom}
                      onChange={(e) => setCommerceRoom(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-blue-200 bg-white text-xs font-semibold focus:border-blue-500 outline-none cursor-pointer"
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
            </div>
          ) : (
            /* ================= SINGLE / COMMON SUBJECT SECTION ================= */
            <div className="space-y-4">
              {/* 1. Subject Name */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                  <span>Subject Name <span className="text-red-500">*</span></span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Bangla, English, Mathematics, ICT"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-xl border border-slate-200 text-xs sm:text-sm h-10 font-semibold"
                />
              </div>

              {/* 2. Teacher & Room */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    <span>Teacher Name</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter teacher name"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    className="rounded-xl border border-slate-200 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    <span>Room / Lab</span>
                  </label>
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none cursor-pointer"
                  >
                    {AVAILABLE_ROOMS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Color Theme Selector */}
              <div className="space-y-1.5 text-left pt-1">
                <label className="text-xs font-bold text-slate-700">Card Color Accent</label>
                <div className="flex items-center gap-2">
                  {THEME_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTheme(opt.id as any)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        opt.bg
                      } ${
                        theme === opt.id
                          ? "ring-2 ring-slate-900 ring-offset-1 scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs h-10 px-4 cursor-pointer font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs h-10 px-5 font-bold shadow-md shadow-blue-600/20 cursor-pointer"
            >
              Save Period
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
