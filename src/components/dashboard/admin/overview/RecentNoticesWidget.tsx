"use client";

import Link from "next/link";
import { Megaphone, ArrowUpRight, Loader2, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Notice, NoticeCategory } from "@/src/types/notice";

interface RecentNoticesWidgetProps {
  notices?: Notice[];
  isLoading?: boolean;
}

const CATEGORY_STYLES: Record<
  NoticeCategory,
  { bg: string; text: string; border: string; label: string }
> = {
  GENERAL: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", label: "General" },
  ACADEMIC: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Academic" },
  EXAM: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", label: "Exam" },
  HOLIDAY: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", label: "Holiday" },
  EVENT: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: "Event" },
  EMERGENCY: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", label: "Urgent" },
};

export function RecentNoticesWidget({
  notices = [],
  isLoading = false,
}: RecentNoticesWidgetProps) {
  const latestNotices = notices.slice(0, 5);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  return (
    <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs flex flex-col justify-between overflow-hidden">
      <CardHeader className="p-5 sm:p-6 pb-3 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Megaphone className="h-4 w-4" />
            </div>
            <span>Latest School Notices</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Active announcements & circulars ({notices.length} total)
          </CardDescription>
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 rounded-xl font-semibold cursor-pointer"
        >
          <Link href="/admin/dashboard/notices">
            <span>All</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-3 flex-1 space-y-2.5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-xs">Loading notices...</span>
          </div>
        ) : latestNotices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400 gap-2">
            <Megaphone className="h-7 w-7 text-slate-300" />
            <p className="text-xs font-semibold text-slate-700">No notices published yet</p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl text-xs mt-1"
            >
              <Link href="/admin/dashboard/notices">
                <Plus className="h-3 w-3 mr-1" />
                Publish Notice
              </Link>
            </Button>
          </div>
        ) : (
          latestNotices.map((notice) => {
            const style = CATEGORY_STYLES[notice.category] || CATEGORY_STYLES.GENERAL;

            return (
              <Link
                key={notice.id}
                href="/admin/dashboard/notices"
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start justify-between gap-3 hover:bg-blue-50/40 hover:border-blue-200 transition-all group block"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border}`}
                    >
                      {style.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Audience: {notice.targetAudience}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {notice.title}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                    {notice.content}
                  </p>
                </div>

                <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1 mt-0.5 font-mono">
                  <Clock className="h-2.5 w-2.5" />
                  {formatDate(notice.publishedAt)}
                </span>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
