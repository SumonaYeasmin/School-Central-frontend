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
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

interface DeleteSubjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subject: any;
  onConfirm: (subjectId: string) => Promise<void>;
}

export function DeleteSubjectDialog({
  isOpen,
  onClose,
  subject,
  onConfirm,
}: DeleteSubjectDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!subject) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await onConfirm(subject.id);
      onClose();
    } catch (err: any) {
      console.error("Failed to delete subject:", err);
      setError(err?.message || "Failed to delete subject. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white flex flex-col">
        {/* Header */}
        <div className="bg-rose-50/70 border-b border-rose-100 p-6 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold text-slate-900">
              Delete Subject
            </DialogTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Are you sure you want to permanently delete this subject?
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-600">
          {error && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              {error}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <p className="text-slate-500 font-medium">Subject to remove:</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{subject.name}</span>
              {subject.code && (
                <span className="text-[11px] font-mono font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                  Code: {subject.code}
                </span>
              )}
            </div>
            {subject.classSubjects && subject.classSubjects.length > 0 && (
              <p className="text-[11px] text-slate-500 pt-1">
                Linked to {subject.classSubjects.length} classes.
              </p>
            )}
          </div>

          <p className="text-slate-500 leading-relaxed">
            This action cannot be undone. It will remove the subject from all assigned class curricula and routines.
          </p>
        </div>

        {/* Footer actions */}
        <DialogFooter className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border-slate-200 text-slate-700 text-xs px-4 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs px-5 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            <span>{isDeleting ? "Deleting..." : "Delete Subject"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
