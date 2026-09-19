"use client";

import { Button } from "@/src/components/ui/button";
import { Eye, Edit2, Trash2 } from "lucide-react";

export function ClassTableActions() {
  return (
    <div className="flex items-center justify-end gap-1.5">
      {/* 1. View Details (Eye icon) */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="View Details"
        className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 cursor-pointer transition-colors"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {/* 2. Update / Edit Class (Edit2 icon) */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Edit Class"
        className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 border border-amber-200/60 cursor-pointer transition-colors"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      {/* 3. Delete Class (Trash2 icon) */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Delete Class"
        className="h-8 w-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200/60 cursor-pointer transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
