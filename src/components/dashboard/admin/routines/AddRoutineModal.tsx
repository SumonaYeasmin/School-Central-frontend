"use client";

import { useState, useEffect, useMemo } from "react";
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
import { AlertCircle, CheckCircle2, Loader2, Sparkles, Clock, MapPin, User, BookOpen, Layers } from "lucide-react";
import { createRoutine } from "@/src/services/routineService";
import { SectionRoutine, DAYS_OF_WEEK, TIME_SLOTS, PeriodSlot, GroupSubjectEntry } from "./mockRoutines";

interface AddRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routines?: SectionRoutine[];
  dbClasses?: any[];
  dbTeachers?: any[];
  dbSubjects?: any[];
  initialClassId?: string;
  initialSectionId?: string;
  initialDay?: string;
  initialPeriodKey?: "p1" | "p2" | "p3" | "p4" | "p5";
  onAdd?: (
    sectionId: string,
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    data: PeriodSlot,
    createdDbItem?: any
  ) => void;
}

const PERIOD_PRESETS = [
  { key: "p1" as const, label: "Period 1", start: "10:00", end: "11:00", display: "10:00 AM – 11:00 AM" },
  { key: "p2" as const, label: "Period 2", start: "11:00", end: "12:00", display: "11:00 AM – 12:00 PM" },
  { key: "p3" as const, label: "Period 3", start: "12:00", end: "13:00", display: "12:00 PM – 1:00 PM" },
  { key: "p4" as const, label: "Period 4", start: "14:00", end: "15:00", display: "2:00 PM – 3:00 PM" },
  { key: "p5" as const, label: "Period 5", start: "15:00", end: "16:00", display: "3:00 PM – 4:00 PM" },
];

const THEME_OPTIONS: Array<{ id: PeriodSlot["theme"]; label: string; bg: string }> = [
  { id: "blue", label: "Blue", bg: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "emerald", label: "Emerald", bg: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: "amber", label: "Amber", bg: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: "purple", label: "Purple", bg: "bg-purple-100 text-purple-800 border-purple-300" },
  { id: "rose", label: "Rose", bg: "bg-rose-100 text-rose-800 border-rose-300" },
];

export function AddRoutineModal({
  isOpen,
  onClose,
  routines = [],
  dbClasses = [],
  dbTeachers = [],
  dbSubjects = [],
  initialClassId,
  initialSectionId,
  initialDay,
  initialPeriodKey,
  onAdd,
}: AddRoutineModalProps) {
  // Slot type state: "single" or "group"
  const [slotType, setSlotType] = useState<"single" | "group">("single");

  // Form selection states
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [day, setDay] = useState<string>("Monday");
  const [periodPresetKey, setPeriodPresetKey] = useState<"p1" | "p2" | "p3" | "p4" | "p5">("p1");
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("11:00");
  
  // Single Subject States
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [customSubjectName, setCustomSubjectName] = useState<string>("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [customTeacherName, setCustomTeacherName] = useState<string>("");
  const [room, setRoom] = useState<string>("Room 101");
  const [theme, setTheme] = useState<PeriodSlot["theme"]>("blue");

  // Group Electives States (Science, Arts, Commerce)
  const [scienceSubject, setScienceSubject] = useState<string>("Physics");
  const [scienceTeacher, setScienceTeacher] = useState<string>("Rafael Ortiz");
  const [scienceRoom, setScienceRoom] = useState<string>("Physics Lab");

  const [artsSubject, setArtsSubject] = useState<string>("History & Civics");
  const [artsTeacher, setArtsTeacher] = useState<string>("Farhana Sultana");
  const [artsRoom, setArtsRoom] = useState<string>("Room 201");

  const [commerceSubject, setCommerceSubject] = useState<string>("Accounting");
  const [commerceTeacher, setCommerceTeacher] = useState<string>("Robert Kiyosaki");
  const [commerceRoom, setCommerceRoom] = useState<string>("Room 202");

  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Initialize dropdowns when modal opens
  useEffect(() => {
    if (isOpen) {
      setConflictError(null);

      // Pre-set Day and Period Preset if passed
      if (initialDay) {
        setDay(initialDay);
      }
      if (initialPeriodKey) {
        setPeriodPresetKey(initialPeriodKey);
        const preset = PERIOD_PRESETS.find((p) => p.key === initialPeriodKey);
        if (preset) {
          setStartTime(preset.start);
          setEndTime(preset.end);
        }
      }

      // Default class & section
      if (initialClassId) {
        setSelectedClassId(initialClassId);
      } else if (dbClasses.length > 0) {
        const firstClass = dbClasses[0];
        setSelectedClassId(firstClass.id);
        const firstSec = firstClass.sections?.[0];
        setSelectedSectionId(initialSectionId || firstSec?.id || "");
      } else if (routines.length > 0) {
        setSelectedClassId(routines[0].grade);
        setSelectedSectionId(initialSectionId || routines[0].id);
      }

      if (initialSectionId) {
        setSelectedSectionId(initialSectionId);
      }

      // Default teacher
      if (dbTeachers.length > 0) {
        setSelectedTeacherId(dbTeachers[0].id);
      }

      // Default subject
      if (dbSubjects.length > 0) {
        setSelectedSubjectId(dbSubjects[0].id);
      }
    }
  }, [isOpen, dbClasses, dbTeachers, dbSubjects, routines, initialClassId, initialSectionId, initialDay, initialPeriodKey]);

  // Derived sections based on selected class
  const availableSections = useMemo(() => {
    if (dbClasses.length > 0 && selectedClassId) {
      const matchedClass = dbClasses.find((c) => c.id === selectedClassId);
      return matchedClass?.sections || [];
    }
    // Fallback to routines
    return routines.filter((r) => r.grade === selectedClassId);
  }, [dbClasses, selectedClassId, routines]);

  // Derived subjects based on selected class
  const availableSubjects = useMemo(() => {
    if (dbClasses.length > 0 && selectedClassId) {
      const matchedClass = dbClasses.find((c) => c.id === selectedClassId);
      if (matchedClass?.classSubjects && matchedClass.classSubjects.length > 0) {
        return matchedClass.classSubjects.map((cs: any) => cs.subject).filter(Boolean);
      }
      return dbSubjects;
    }
    return dbSubjects;
  }, [dbClasses, selectedClassId, dbSubjects]);

  // Handle Class change
  const handleClassChange = (newClassId: string) => {
    setSelectedClassId(newClassId);
    setConflictError(null);
    if (dbClasses.length > 0) {
      const matchedClass = dbClasses.find((c) => c.id === newClassId);
      const firstSec = matchedClass?.sections?.[0];
      setSelectedSectionId(firstSec?.id || "");
    } else {
      const firstSec = routines.find((r) => r.grade === newClassId);
      setSelectedSectionId(firstSec?.id || "");
    }
  };

  // Handle Period Preset change
  const handlePeriodPresetChange = (key: "p1" | "p2" | "p3" | "p4" | "p5") => {
    setPeriodPresetKey(key);
    const preset = PERIOD_PRESETS.find((p) => p.key === key);
    if (preset) {
      setStartTime(preset.start);
      setEndTime(preset.end);
    }
  };

  // Submit Handler with Database API integration & Conflict Handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setConflictError(null);

    // Prepare period slot data for frontend live state
    let periodData: PeriodSlot;

    if (slotType === "group") {
      const groupSlots: GroupSubjectEntry[] = [
        {
          group: "Science",
          subject: scienceSubject.trim() || "Physics",
          teacher: scienceTeacher.trim() || "Science Teacher",
          room: scienceRoom.trim() || "Science Lab",
        },
        {
          group: "Arts",
          subject: artsSubject.trim() || "History & Civics",
          teacher: artsTeacher.trim() || "Arts Teacher",
          room: artsRoom.trim() || "Room 201",
        },
        {
          group: "Commerce",
          subject: commerceSubject.trim() || "Accounting",
          teacher: commerceTeacher.trim() || "Commerce Teacher",
          room: commerceRoom.trim() || "Room 202",
        },
      ];

      periodData = {
        subject: `Group Electives (${scienceSubject} / ${artsSubject} / ${commerceSubject})`,
        teacher: "Multi Faculty",
        room: "Labs & Rooms",
        theme: "blue",
        isGroupPeriod: true,
        groupSlots,
      };
    } else {
      // Subject Name & ID
      const matchedSubject = dbSubjects.find((s) => s.id === selectedSubjectId);
      const finalSubjectName = matchedSubject?.name || customSubjectName.trim() || "Subject";

      // Teacher Name & ID
      const matchedTeacher = dbTeachers.find((t) => t.id === selectedTeacherId);
      const finalTeacherName = matchedTeacher?.name || customTeacherName.trim() || "Teacher";

      periodData = {
        subject: finalSubjectName,
        teacher: finalTeacherName,
        room: room.trim() || "Room 101",
        theme,
        isGroupPeriod: false,
        groupSlots: undefined,
      };
    }

    try {
      let createdDbItem: any = null;

      // If single mode and we have DB IDs, call backend API
      if (slotType === "single" && selectedClassId && selectedSectionId && selectedSubjectId && selectedTeacherId) {
        try {
          createdDbItem = await createRoutine({
            day: day.toUpperCase(),
            startTime,
            endTime,
            roomNumber: room.trim() || undefined,
            classId: selectedClassId,
            sectionId: selectedSectionId,
            subjectId: selectedSubjectId,
            teacherId: selectedTeacherId,
          });
        } catch (apiErr: any) {
          const errMsg =
            apiErr?.response?.data?.message ||
            apiErr?.message ||
            "Conflict detected in scheduling this class routine.";
          setConflictError(errMsg);
          setIsSubmitting(false);
          return;
        }
      }

      // Update frontend live timetable
      onAdd?.(selectedSectionId, day, periodPresetKey, periodData, createdDbItem);

      onClose();
    } catch (err: any) {
      console.error("Error creating routine slot:", err);
      setConflictError(err?.message || "Failed to create routine period slot.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Add / Assign Class Routine</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Schedule a single subject or 3-group combined elective slot for this class & section.
          </DialogDescription>
        </DialogHeader>

        {/* Conflict Error Alert */}
        {conflictError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 mt-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold">{conflictError}</div>
          </div>
        )}

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

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* 1. Class & Section Dropdowns */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                <span>Select Class *</span>
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => handleClassChange(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {dbClasses.length > 0
                  ? dbClasses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  : Array.from(new Set(routines.map((r) => r.grade))).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>Select Section *</span>
              </label>
              <select
                value={selectedSectionId}
                onChange={(e) => {
                  setSelectedSectionId(e.target.value);
                  setConflictError(null);
                }}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {availableSections.map((sec: any) => (
                  <option key={sec.id} value={sec.id}>
                    Section {sec.name || sec.section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Weekday & Period Slot */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-600" />
                <span>Day of Week *</span>
              </label>
              <select
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  setConflictError(null);
                }}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                <span>Time / Period *</span>
              </label>
              <select
                value={periodPresetKey}
                onChange={(e) => handlePeriodPresetChange(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none"
              >
                {PERIOD_PRESETS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label} ({p.display})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Conditional Input: 3-Group Elective vs Single Subject */}
          {slotType === "group" ? (
            /* ================= 3-GROUP ELECTIVE SECTION ================= */
            <div className="space-y-3.5 text-left">
              <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium">
                💡 Science, Arts, and Commerce students will attend their respective elective subjects simultaneously in separate rooms.
              </div>

              {/* Science Group */}
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider inline-block">
                  Science Group
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Physics, Chemistry"
                      value={scienceSubject}
                      onChange={(e) => setScienceSubject(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
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
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab</label>
                    <Input
                      type="text"
                      placeholder="e.g. Physics Lab"
                      value={scienceRoom}
                      onChange={(e) => setScienceRoom(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Arts Group */}
              <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-600 text-white uppercase tracking-wider inline-block">
                  Arts / Humanities Group
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. History, Civics, Geography"
                      value={artsSubject}
                      onChange={(e) => setArtsSubject(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
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
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab</label>
                    <Input
                      type="text"
                      placeholder="e.g. Room 201"
                      value={artsRoom}
                      onChange={(e) => setArtsRoom(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Commerce Group */}
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider inline-block">
                  Commerce / Business Studies Group
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Subject</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Accounting, Finance"
                      value={commerceSubject}
                      onChange={(e) => setCommerceSubject(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
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
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Room / Lab</label>
                    <Input
                      type="text"
                      placeholder="e.g. Room 202"
                      value={commerceRoom}
                      onChange={(e) => setCommerceRoom(e.target.value)}
                      className="bg-white rounded-xl text-xs h-9 font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= SINGLE / COMMON SUBJECT SECTION ================= */
            <div className="space-y-4">
              {/* Subject Selector */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                  <span>Subject *</span>
                </label>
                {availableSubjects.length > 0 ? (
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => {
                      setSelectedSubjectId(e.target.value);
                      setConflictError(null);
                    }}
                    required
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none"
                  >
                    {availableSubjects.map((sub: any) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} {sub.code ? `(${sub.code})` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Mathematics, Bangla, Physics"
                    value={customSubjectName}
                    onChange={(e) => setCustomSubjectName(e.target.value)}
                    className="rounded-xl border border-slate-200 text-xs sm:text-sm h-10"
                  />
                )}
              </div>

              {/* Teacher & Room */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    <span>Assigned Teacher *</span>
                  </label>
                  {dbTeachers.length > 0 ? (
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => {
                        setSelectedTeacherId(e.target.value);
                        setConflictError(null);
                      }}
                      required
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none"
                    >
                      {dbTeachers.map((t: any) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.designation || "Teacher"})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type="text"
                      placeholder="e.g. Maya Chen"
                      value={customTeacherName}
                      onChange={(e) => setCustomTeacherName(e.target.value)}
                      className="rounded-xl border border-slate-200 text-xs sm:text-sm h-10"
                    />
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    <span>Room / Lab *</span>
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Room 101, Lab 02"
                    value={room}
                    onChange={(e) => {
                      setRoom(e.target.value);
                      setConflictError(null);
                    }}
                    className="rounded-xl border border-slate-200 text-xs sm:text-sm h-10 font-semibold"
                  />
                </div>
              </div>

              {/* Theme Color Selector */}
              <div className="space-y-1.5 text-left pt-1">
                <label className="text-xs font-bold text-slate-700">Card Color Theme</label>
                <div className="flex items-center gap-2">
                  {THEME_OPTIONS.map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setTheme(th.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        th.bg
                      } ${
                        theme === th.id
                          ? "ring-2 ring-slate-900 ring-offset-1 scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dialog Footer */}
          <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl text-xs h-10 px-4 cursor-pointer font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs h-10 px-5 font-bold shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save to Routine</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
