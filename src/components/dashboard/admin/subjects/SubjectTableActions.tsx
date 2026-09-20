"use client";

import { Button } from "@/src/components/ui/button";
import { Eye } from "lucide-react";

interface SubjectTableActionsProps {
  onView?: () => void;
}

export function SubjectTableActions({ onView }: SubjectTableActionsProps) {
  return (
    <div className="flex items-center justify-end">
      {/* View Details Button */}
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onView}
        className="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <Eye className="h-3.5 w-3.5" />
        <span>Details</span>
      </Button>
    </div>
  );
}
