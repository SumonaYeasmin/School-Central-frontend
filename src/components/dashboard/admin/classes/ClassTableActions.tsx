"use client";

import { Button } from "@/src/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface ClassTableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ClassTableActions({ onEdit, onDelete }: ClassTableActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* 1. Update / Edit Class */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Edit Class & Sections"
        onClick={onEdit}
        className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 border border-amber-200/60 cursor-pointer transition-colors"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      {/* 2. Delete Class */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Delete Class"
        onClick={onDelete}
        className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/60 cursor-pointer transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
