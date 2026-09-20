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
import { BookOpen, Layers, Loader2, Pencil, Sparkles } from "lucide-react";

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: any;
  availableClasses?: any[];
  onSave: (updatedData: {
    id: string;
    name: string;
    code: string;
    classIds: string[];
    groupId?: string | null;
  }) => Promise<void>;
}

export function EditSubjectModal({
  isOpen,
  onClose,
  subject,
  availableClasses = [],
  onSave,
}: EditSubjectModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state when subject opens
  useEffect(() => {
    if (subject) {
      setName(subject.name || "");
      setCode(subject.code || "");
      const classIds = (subject.classSubjects || [])
        .map((cs: any) => cs.classId || cs.class?.id)
        .filter(Boolean);
      setSelectedClassIds(classIds);
      setError(null);
    }
  }, [subject]);

  if (!subject) return null;

  const handleToggleClass = (classId: string) => {
    setSelectedClassIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handleSelectAllClasses = () => {
    if (selectedClassIds.length === availableClasses.length) {
      setSelectedClassIds([]);
    } else {
      setSelectedClassIds(availableClasses.map((c) => c.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Subject name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onSave({
        id: subject.id,
        name: name.trim(),
        code: code.trim(),
        classIds: selectedClassIds,
      });
      onClose();
    } catch (err: any) {
      console.error("Failed to update subject:", err);
      setError(err?.message || "Failed to save subject changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white flex flex-col">
        {/* Header */}
        <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-xs shrink-0">
              <Pencil className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Edit Subject
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Update curriculum information and assigned classes
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              {error}
            </div>
          )}

          {/* 1. Subject Name */}
          <div className="space-y-1.5">
            <label htmlFor="subjectName" className="text-xs font-bold text-slate-700 block">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="subjectName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter subject name (Bangla / English)"
                className="pl-10 text-sm rounded-xl border-slate-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* 2. Board Code */}
          <div className="space-y-1.5">
            <label htmlFor="subjectCode" className="text-xs font-bold text-slate-700 block">
              SSC / Board Subject Code
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="subjectCode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter SSC board code"
                className="pl-10 text-sm font-mono rounded-xl border-slate-200 focus:border-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Official NCTB / SSC subject code for reporting and exams.
            </p>
          </div>

          {/* 3. Assigned Classes */}
          {availableClasses.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-blue-600" />
                  <span>Assigned Classes ({selectedClassIds.length} selected)</span>
                </label>
                <button
                  type="button"
                  onClick={handleSelectAllClasses}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  {selectedClassIds.length === availableClasses.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1.5 bg-slate-50/70 border border-slate-200/80 rounded-2xl">
                {availableClasses.map((cls) => {
                  const isChecked = selectedClassIds.includes(cls.id);
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => handleToggleClass(cls.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="truncate">{cls.name}</span>
                      <span
                        className={`h-4 w-4 rounded-md flex items-center justify-center text-[10px] ${
                          isChecked ? "bg-white text-blue-600 font-bold" : "border border-slate-300"
                        }`}
                      >
                        {isChecked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer actions */}
          <DialogFooter className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
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
              disabled={isSaving || !name.trim()}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
