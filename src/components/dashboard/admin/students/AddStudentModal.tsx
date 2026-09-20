"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  User,
  Hash,
  School,
  Layers,
  Calendar,
  Loader2,
  UserPlus,
  RefreshCw,
} from "lucide-react";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableClasses?: any[];
  onAdd: (studentData: {
    name: string;
    studentId: string;
    classId: string;
    sectionId: string;
    roll: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    dateOfBirth?: string;
    admissionDate?: string;
    status?: "ACTIVE" | "INACTIVE";
  }) => Promise<void>;
}

export function AddStudentModal({
  isOpen,
  onClose,
  availableClasses = [],
  onAdd,
}: AddStudentModalProps) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [roll, setRoll] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate unique student ID helper
  const generateStudentId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const year = new Date().getFullYear();
    setStudentId(`STU-${year}-${randomNum}`);
  };

  // Sync default class and section when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (!studentId) {
        generateStudentId();
      }
      if (availableClasses.length > 0) {
        const defaultClass = availableClasses[0];
        setClassId(defaultClass.id);
        if (defaultClass.sections && defaultClass.sections.length > 0) {
          setSectionId(defaultClass.sections[0].id);
        }
      }
    }
  }, [isOpen, availableClasses]);

  // When selected class changes, update available sections
  const handleClassChange = (selectedCId: string) => {
    setClassId(selectedCId);
    const cls = availableClasses.find((c) => c.id === selectedCId);
    if (cls && cls.sections && cls.sections.length > 0) {
      setSectionId(cls.sections[0].id);
    } else {
      setSectionId("");
    }
  };

  const selectedClass = availableClasses.find((c) => c.id === classId);
  const availableSections = selectedClass?.sections || [];

  const resetForm = () => {
    setName("");
    setStudentId("");
    setRoll("");
    setDateOfBirth("");
    setGender("MALE");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Student name is required.");
      return;
    }
    if (!studentId.trim()) {
      setError("Student ID is required.");
      return;
    }
    if (!classId) {
      setError("Please select a class.");
      return;
    }
    if (!sectionId) {
      setError("Please select a section.");
      return;
    }
    if (!roll.trim()) {
      setError("Roll number is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onAdd({
        name: name.trim(),
        studentId: studentId.trim(),
        classId,
        sectionId,
        roll: roll.trim(),
        gender,
        dateOfBirth: dateOfBirth || undefined,
        admissionDate: new Date().toISOString().split("T")[0],
        status: "ACTIVE",
      });
      resetForm();
      onClose();
    } catch (err: any) {
      console.error("Failed to add student:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to add student. Please check for duplicate Student ID or Roll number."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white flex flex-col">
        {/* Header */}
        <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f2c4a] text-white font-bold shadow-xs shrink-0">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Enroll New Student
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Add a new student profile and assign class & section
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              {error}
            </div>
          )}

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student's full name"
                className="pl-10 text-sm rounded-xl border-slate-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* 2. Student ID & Roll Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  Student ID <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateStudentId}
                  className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold cursor-pointer"
                  title="Generate new ID"
                >
                  <RefreshCw className="h-2.5 w-2.5" />
                  <span>Auto ID</span>
                </button>
              </div>
              <div className="relative">
                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID (or click Auto ID)"
                  className="pl-10 text-sm font-mono rounded-xl border-slate-200 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Class Roll Number <span className="text-rose-500">*</span>
              </label>
              <Input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="Enter class roll number"
                className="text-sm font-mono rounded-xl border-slate-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* 3. Class & Section Placement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <School className="h-3.5 w-3.5 text-blue-600" />
                <span>Class <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={classId}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-700"
                required
              >
                {availableClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>Section <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-700"
                required
                disabled={availableSections.length === 0}
              >
                {availableSections.length === 0 ? (
                  <option value="">No sections in this class</option>
                ) : (
                  availableSections.map((sec: any) => (
                    <option key={sec.id} value={sec.id}>
                      Section {sec.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* 4. Gender & Date of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Gender</label>
              <div className="flex items-center gap-2 pt-0.5">
                {(["MALE", "FEMALE", "OTHER"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      gender === g
                        ? "bg-[#0f2c4a] text-white border-[#0f2c4a] shadow-xs"
                        : "bg-slate-50/80 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {g === "MALE" ? "Male" : g === "FEMALE" ? "Female" : "Other"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Date of Birth</span>
              </label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="text-sm rounded-xl border-slate-200 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Footer actions */}
          <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border-slate-200 text-slate-700 text-xs px-4 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !name.trim() || !roll.trim() || !studentId.trim() || !sectionId}
              className="rounded-xl bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs px-5 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isSaving ? "Enrolling..." : "Enroll Student"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
