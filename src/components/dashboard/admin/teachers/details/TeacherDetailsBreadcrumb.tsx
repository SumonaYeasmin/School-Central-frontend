"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface TeacherDetailsBreadcrumbProps {
  teacherName: string;
}

export function TeacherDetailsBreadcrumb({
  teacherName,
}: TeacherDetailsBreadcrumbProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 flex-wrap">
        <Link
          href="/admin/dashboard"
          className="hover:text-slate-600 transition-colors"
        >
          School office
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <Link
          href="/admin/dashboard/teachers"
          className="hover:text-slate-600 transition-colors"
        >
          Teachers
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-slate-800 font-semibold">{teacherName}</span>
      </div>

      {/* 2. Back button */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-8 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 self-start sm:self-auto cursor-pointer"
      >
        <Link href="/admin/dashboard/teachers" className="flex items-center gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Teachers</span>
        </Link>
      </Button>
    </div>
  );
}
