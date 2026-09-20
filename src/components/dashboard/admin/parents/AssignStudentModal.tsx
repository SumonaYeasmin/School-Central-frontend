"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import {
  GraduationCap,
  Loader2,
  Plus,
  Trash2,
  HeartHandshake,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { Parent, AssignStudentDto, ParentRelationType } from "@/src/types/parent";
import { Student } from "@/src/types/student";

interface AssignStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  availableStudents?: Student[];
  onAssign: (parentId: string, data: AssignStudentDto) => Promise<void>;
  onRemove: (parentId: string, studentId: string) => Promise<void>;
}

export function AssignStudentModal({
  isOpen,
  onClose,
  parent,
  availableStudents = [],
  onAssign,
  onRemove,
}: AssignStudentModalProps) {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [relation, setRelation] = useState<ParentRelationType>("FATHER");
  const [isPrimary, setIsPrimary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!isSaving && !removingId) {
      setSelectedStudentId("");
      setError(null);
      onClose();
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parent) return;
    if (!selectedStudentId) {
      setError("Please choose a student from the list.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onAssign(parent.id, {
        studentId: selectedStudentId,
        relation,
        isPrimary,
      });
      setSelectedStudentId("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to link student. Student may already be linked."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (studentId: string) => {
    if (!parent) return;
    try {
      setRemovingId(studentId);
      setError(null);
      await onRemove(parent.id, studentId);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to unlink student."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Filter out students who are already linked to this parent
  const linkedStudentIds = new Set(
    parent?.students?.map((s) => s.studentId || s.student?.id) || []
  );
  const unlinkedStudents = availableStudents.filter(
    (s) => !linkedStudentIds.has(s.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Manage Linked Students
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Link or unlink students for <strong>{parent?.name}</strong>
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

          {/* 1. Currently Linked Students List */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Currently Linked Children ({parent?.students?.length || 0})
            </span>

            {!parent?.students || parent.students.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                No students currently linked to this parent.
              </div>
            ) : (
              <div className="space-y-2">
                {parent.students.map((rel) => {
                  const student = rel.student;
                  const studentName = student?.name || "Unknown Student";
                  const sId = rel.studentId || student?.id || "";
                  const className = student?.class?.name || "No Class";
                  const sectionName = student?.section?.name
                    ? ` · ${student.section.name}`
                    : "";

                  return (
                    <div
                      key={rel.id || sId}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xs shrink-0">
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {studentName}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 capitalize">
                              {rel.relation?.toLowerCase()}
                            </span>
                            {rel.isPrimary && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-0.5">
                                <UserCheck className="h-2.5 w-2.5" />
                                Primary
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {student?.studentId} · {className}
                            {sectionName}
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(sId)}
                        disabled={removingId === sId}
                        className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                        title="Unlink student"
                      >
                        {removingId === sId ? (
                          <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Link Another Student Form */}
          <form
            onSubmit={handleAssign}
            className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3.5"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5 text-blue-600" />
              Link Another Student
            </span>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Select Student
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                required
              >
                <option value="">-- Choose from enrolled students --</option>
                {unlinkedStudents.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.name} ({stu.studentId} · {stu.class?.name || "No Class"})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Relation
                </label>
                <select
                  value={relation}
                  onChange={(e) =>
                    setRelation(e.target.value as ParentRelationType)
                  }
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                >
                  <option value="FATHER">Father</option>
                  <option value="MOTHER">Mother</option>
                  <option value="GUARDIAN">Guardian</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isAssignPrimaryCheck"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="isAssignPrimaryCheck"
                  className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                >
                  Primary Guardian
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSaving || !selectedStudentId}
              className="w-full h-9 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Linking student...</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Link to Parent</span>
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
