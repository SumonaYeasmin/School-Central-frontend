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
import { Input } from "@/src/components/ui/input";
import { BookOpen, Layers, Loader2, Plus, Sparkles } from "lucide-react";

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableClasses?: any[];
  onAdd: (subjectData: {
    name: string;
    code?: string;
    classIds: string[];
  }) => Promise<void>;
}

export function AddSubjectModal({
  isOpen,
  onClose,
  availableClasses = [],
  onAdd,
}: AddSubjectModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setCode("");
    setSelectedClassIds(availableClasses.map((c) => c.id));
    setError(null);
  };

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

    if (selectedClassIds.length === 0) {
      setError("Please select at least one class.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onAdd({
        name: name.trim(),
        code: code.trim() || undefined,
        classIds: selectedClassIds,
      });
      resetForm();
      onClose();
    } catch (err: any) {
      console.error("Failed to create subject:", err);
      setError(err?.message || "Failed to add subject. Please try again.");
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f2c4a] text-white font-bold shadow-xs shrink-0">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Add New Subject
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Create a new curriculum subject and link to academic classes
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
            <label htmlFor="addSubjectName" className="text-xs font-bold text-slate-700 block">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="addSubjectName"
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
            <label htmlFor="addSubjectCode" className="text-xs font-bold text-slate-700 block">
              SSC / Board Subject Code
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="addSubjectCode"
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

          {/* 3. Multi-Class Selection */}
          {availableClasses.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-blue-600" />
                  <span>Assign to Classes ({selectedClassIds.length} selected)</span>
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
              className="rounded-xl bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs px-5 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isSaving ? "Adding..." : "Add Subject"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
