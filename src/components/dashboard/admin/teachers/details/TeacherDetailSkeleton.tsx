"use client";

import { Skeleton } from "@/src/components/ui/skeleton";

export function TeacherDetailSkeleton() {
  return (
    <div className="space-y-6  mx-auto animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-48 rounded-lg bg-slate-200" />
        <Skeleton className="h-8 w-28 rounded-xl bg-slate-200" />
      </div>

      {/* Hero Profile Card Skeleton */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Skeleton className="h-20 w-20 rounded-2xl bg-slate-200 shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-60 rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-40 rounded-lg bg-slate-200" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-12 w-24 rounded-2xl bg-slate-200" />
            <Skeleton className="h-12 w-24 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Cards Skeleton Grid */}
      <div className="space-y-6">
        <Skeleton className="h-64 rounded-3xl bg-slate-200" />
        <Skeleton className="h-48 rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
