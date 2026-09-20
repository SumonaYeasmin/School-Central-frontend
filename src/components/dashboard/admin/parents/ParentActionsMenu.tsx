"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { MoreHorizontal, Edit3, HeartHandshake, Trash2 } from "lucide-react";
import { Parent } from "@/src/types/parent";

interface ParentActionsMenuProps {
  parent: Parent;
  onEdit: (parent: Parent) => void;
  onManageStudents: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

export function ParentActionsMenu({
  parent,
  onEdit,
  onManageStudents,
  onDelete,
}: ParentActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open parent menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-200">
        <DropdownMenuItem
          onClick={() => onEdit(parent)}
          className="cursor-pointer text-xs font-semibold py-2 text-slate-700 flex items-center gap-2"
        >
          <Edit3 className="h-3.5 w-3.5 text-blue-600" />
          <span>Edit Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onManageStudents(parent)}
          className="cursor-pointer text-xs font-semibold py-2 text-slate-700 flex items-center gap-2"
        >
          <HeartHandshake className="h-3.5 w-3.5 text-blue-600" />
          <span>Manage Children</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(parent)}
          className="cursor-pointer text-xs font-semibold py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50 flex items-center gap-2"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Profile</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
