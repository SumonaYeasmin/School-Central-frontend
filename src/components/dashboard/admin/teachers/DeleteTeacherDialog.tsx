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
import { AlertTriangle, Loader2, Trash2, Mail, Phone, BookOpen, Building2 } from "lucide-react";
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

  if (!teacher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        <div className="p-6 text-center space-y-4">
          {/* Danger Alert Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-inner">
            <AlertTriangle className="h-7 w-7 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Delete Teacher Profile
            </DialogTitle>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800 font-semibold">{teacher.name}</strong>{" "}
              from the system? This action is permanent and will revoke system access.
            </p>
          </div>

          {/* Teacher Info Card Preview */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{teacher.name}</h4>
                <p className="text-xs text-slate-500">{teacher.designation || "Faculty Member"}</p>
              </div>
              <span className="text-xs font-mono font-bold bg-white text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                {teacher.teacherId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
              {teacher.department && (
                <div className="flex items-center gap-1.5 truncate">
                  <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.department}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>{teacher.assignments?.length || 0} Subject(s)</span>
              </div>
              {teacher.email && (
                <div className="flex items-center gap-1.5 col-span-2 truncate">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              )}
              {teacher.phone && (
                <div className="flex items-center gap-1.5 col-span-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{teacher.phone}</span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-left">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-0 flex flex-row items-center justify-end gap-2.5 bg-slate-50/50 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-100/80 cursor-pointer flex-1"
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
                <span>Delete Teacher</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
