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
import { Teacher } from "@/src/types/teacher";

interface DeleteTeacherDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  onDelete: (id: string) => Promise<void>;
}

export function DeleteTeacherDialog({
  isOpen,
  onClose,
  teacher,
  onDelete,
}: DeleteTeacherDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!isDeleting) {
      setError(null);
      onClose();
    }
  };

  const handleConfirm = async () => {
    if (!teacher) return;
    try {
      setIsDeleting(true);
      setError(null);
      await onDelete(teacher.id);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete teacher profile."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        <div className="p-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-1.5">
            <DialogTitle className="text-lg font-bold text-slate-900">
              Delete Teacher Profile
            </DialogTitle>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800">{teacher?.name}</strong> (
              {teacher?.teacherId})? All assigned class routines and subject
              allocations will be unassigned.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-0 flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer flex-1"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Yes, Delete</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
