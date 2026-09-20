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
import { Badge } from "@/src/components/ui/badge";
import { School, Layers, Plus, X, Loader2, Edit2 } from "lucide-react";

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: any;
  onSave: (updatedData: {
    id: string;
    name: string;
    sections: string[];
  }) => Promise<void>;
}

export function EditClassModal({
  isOpen,
  onClose,
  classItem,
  onSave,
}: EditClassModalProps) {
  const [name, setName] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [newSectionInput, setNewSectionInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (classItem) {
      setName(classItem.name || "");
      const existingSections = (classItem.sections || []).map((s: any) => s.name);
      setSections(existingSections.length > 0 ? existingSections : ["A"]);
      setError(null);
      setNewSectionInput("");
    }
  }, [classItem]);

  if (!classItem) return null;

  const handleAddSection = () => {
    const trimmed = newSectionInput.trim().toUpperCase();
    if (!trimmed) return;
    if (sections.includes(trimmed)) {
      setError(`Section "${trimmed}" already exists.`);
      return;
    }
    setSections([...sections, trimmed]);
    setNewSectionInput("");
    setError(null);
  };

  const handleRemoveSection = (secToRemove: string) => {
    if (sections.length <= 1) {
      setError("A class must have at least one section.");
      return;
    }
    setSections(sections.filter((s) => s !== secToRemove));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Class name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onSave({
        id: classItem.id,
        name: name.trim(),
        sections,
      });
      onClose();
    } catch (err: any) {
      console.error("Failed to update class:", err);
      setError(err?.message || "Failed to save class changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white flex flex-col">
        {/* Header */}
        <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shadow-xs shrink-0">
              <Edit2 className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Edit Class & Sections
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Update class name and manage sections
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

          {/* 1. Class Name */}
          <div className="space-y-1.5">
            <label htmlFor="className" className="text-xs font-bold text-slate-700 block">
              Class Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <School className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="className"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Class 6"
                className="pl-10 text-sm rounded-xl border-slate-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* 2. Sections Management */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-blue-600" />
              <span>Sections</span>
            </label>

            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl min-h-[52px]">
              {sections.map((sec) => (
                <Badge
                  key={sec}
                  variant="outline"
                  className="bg-white border-slate-200 text-slate-800 text-xs font-semibold py-1 px-2.5 rounded-lg flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Section {sec}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(sec)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                    title="Remove section"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add New Section Input */}
            <div className="flex items-center gap-2 pt-1">
              <Input
                type="text"
                placeholder="New section name (e.g. D or Rose)"
                value={newSectionInput}
                onChange={(e) => setNewSectionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSection();
                  }
                }}
                className="text-xs rounded-xl border-slate-200 focus:border-blue-500"
              />
              <Button
                type="button"
                onClick={handleAddSection}
                variant="outline"
                className="rounded-xl border-slate-200 text-xs px-3 font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-blue-600" />
                <span>Add</span>
              </Button>
            </div>
          </div>

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
              className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs px-5 shadow-xs flex items-center gap-1.5 cursor-pointer"
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
