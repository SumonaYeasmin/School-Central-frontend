"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit3,
  BookOpen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/src/types/teacher";

interface TeacherActionsMenuProps {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onAssignSubject: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export function TeacherActionsMenu({
  teacher,
  onEdit,
  onAssignSubject,
  onDelete,
}: TeacherActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open teacher menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-200">
        <DropdownMenuItem asChild className="cursor-pointer text-xs font-semibold py-2 text-slate-700">
          <Link
            href={`/admin/dashboard/teachers/${teacher.id}`}
            className="flex items-center gap-2"
          >
            <Eye className="h-3.5 w-3.5 text-blue-600" />
            <span>View Full Details</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onAssignSubject(teacher)}
          className="cursor-pointer text-xs font-semibold py-2 text-slate-700 flex items-center gap-2"
        >
          <BookOpen className="h-3.5 w-3.5 text-blue-600" />
          <span>Assign Subject</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onEdit(teacher)}
          className="cursor-pointer text-xs font-semibold py-2 text-slate-700 flex items-center gap-2"
        >
          <Edit3 className="h-3.5 w-3.5 text-blue-600" />
          <span>Edit Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(teacher)}
          className="cursor-pointer text-xs font-semibold py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50 flex items-center gap-2"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Profile</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
