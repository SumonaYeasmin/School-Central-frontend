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
import {
  BookOpen,
  School,
  Layers,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Teacher, AssignTeacherDto } from "@/src/types/teacher";

interface AssignSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  classes?: any[];
  subjects?: any[];
  onAssign: (teacherId: string, data: AssignTeacherDto) => Promise<void>;
  onRemove: (assignmentId: string) => Promise<void>;
}

export function AssignSubjectModal({
  isOpen,
  onClose,
  teacher,
  classes = [],
  subjects = [],
  onAssign,
  onRemove,
}: AssignSubjectModalProps) {
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [isClassTeacher, setIsClassTeacher] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize selections when modal opens
  useEffect(() => {
    if (isOpen && classes.length > 0) {
      setError(null);
      const firstClass = classes[0];
      setClassId(firstClass.id);
      if (firstClass.sections && firstClass.sections.length > 0) {
        setSectionId(firstClass.sections[0].id);
      }
      if (subjects.length > 0) {
        setSubjectId(subjects[0].id);
      }
    }
  }, [isOpen, classes, subjects]);

  const handleClassChange = (selectedCId: string) => {
    setClassId(selectedCId);
    const cls = classes.find((c) => c.id === selectedCId);
    if (cls && cls.sections && cls.sections.length > 0) {
      setSectionId(cls.sections[0].id);
    } else {
      setSectionId("");
    }
  };

  const selectedClass = classes.find((c) => c.id === classId);
  const availableSections = selectedClass?.sections || [];

  // Filter subjects that belong to this class
  const availableSubjectsForClass = subjects.filter((sub) => {
    if (sub.classSubjects && sub.classSubjects.length > 0) {
      return sub.classSubjects.some((cs: any) => cs.classId === classId);
    }
    return true;
  });

  const handleClose = () => {
    if (!isSaving && !removingId) {
      setError(null);
      onClose();
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher) return;
    if (!classId || !sectionId || !subjectId) {
      setError("Please select a valid class, section, and subject.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await onAssign(teacher.id, {
        classId,
        sectionId,
        subjectId,
        isClassTeacher,
      });

      setIsClassTeacher(false);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to assign subject. The subject in this section may already be assigned to another teacher."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (assignmentId: string) => {
    try {
      setRemovingId(assignmentId);
      setError(null);
      await onRemove(assignmentId);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to remove assignment."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Subject & Class Assignments
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Assign teaching schedule for <strong>{teacher?.name}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* 1. Current Assignments List */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Active Teaching Assignments ({teacher?.assignments?.length || 0})
            </span>

            {!teacher?.assignments || teacher.assignments.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                No subjects currently assigned to this teacher.
              </div>
            ) : (
              <div className="space-y-2">
                {teacher.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xs shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {assignment.subject?.name}
                          </span>
                          {assignment.subject?.code && (
                            <span className="text-[10px] font-mono text-slate-400">
                              ({assignment.subject.code})
                            </span>
                          )}
                          {assignment.isClassTeacher && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-0.5">
                              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                              Class Teacher
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {assignment.class?.name} · {assignment.section?.name}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(assignment.id)}
                      disabled={removingId === assignment.id}
                      className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                      title="Remove assignment"
                    >
                      {removingId === assignment.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Form to Add New Assignment */}
          <form
            onSubmit={handleAssign}
            className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3.5"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5 text-blue-600" />
              Assign New Class & Subject
            </span>

            {/* Class & Section (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <School className="h-3 w-3 text-blue-600" />
                  Class
                </label>
                <select
                  value={classId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                  required
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="h-3 w-3 text-blue-600" />
                  Section
                </label>
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                  required
                >
                  {availableSections.length === 0 ? (
                    <option value="">No sections available</option>
                  ) : (
                    availableSections.map((sec: any) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-blue-600" />
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                required
              >
                {availableSubjectsForClass.length === 0 ? (
                  <option value="">No subjects assigned to this class</option>
                ) : (
                  availableSubjectsForClass.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} {sub.code ? `(${sub.code})` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Class Teacher Toggle */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isClassTeacherCheck"
                checked={isClassTeacher}
                onChange={(e) => setIsClassTeacher(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="isClassTeacherCheck"
                className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
              >
                Designate as Class Teacher for this section
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSaving || !classId || !sectionId || !subjectId}
              className="w-full h-9 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Assign Subject</span>
                </>
              )}
            </Button>
          </form>
        </div>

        <DialogFooter className="p-4 border-t border-slate-100 flex items-center justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="h-9 px-4 rounded-xl text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
