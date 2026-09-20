"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface SubjectTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function SubjectTableActions({
  onEdit,
  onDelete,
}: SubjectTableActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer focus-visible:ring-1 focus-visible:ring-slate-300"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5 shadow-lg border border-slate-200">
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
          >
            <Pencil className="h-3.5 w-3.5 text-blue-600" />
            <span>Edit Subject</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-slate-100" />

          <DropdownMenuItem
            onClick={onDelete}
            className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 focus:bg-rose-50 rounded-lg cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-600" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
