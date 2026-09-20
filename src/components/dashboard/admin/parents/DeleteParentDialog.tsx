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
import { Parent } from "@/src/types/parent";

interface DeleteParentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  onDelete: (id: string) => Promise<void>;
}

export function DeleteParentDialog({
  isOpen,
  onClose,
  parent,
  onDelete,
}: DeleteParentDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!isDeleting) {
      setError(null);
      onClose();
    }
  };

  const handleConfirm = async () => {
    if (!parent) return;
    try {
      setIsDeleting(true);
      setError(null);
      await onDelete(parent.id);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete parent profile."
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
              Delete Parent Profile
            </DialogTitle>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800">{parent?.name}</strong>? This will
              unlink associated children records.
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
