"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Megaphone,
  Plus,
  Calendar,
  Users,
  Tag,
  Loader2,
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { CreateNoticeModal } from "@/src/components/dashboard/admin/notices/CreateNoticeModal";
import { getNotices, createNotice } from "@/src/services/noticeService";
import { Notice, CreateNoticeDto, NoticeCategory } from "@/src/types/notice";

const CATEGORY_CONFIG: Record<
  NoticeCategory,
  { label: string; bg: string; text: string; border: string }
> = {
  GENERAL: {
    label: "General",
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  },
  ACADEMIC: {
    label: "Academic",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  EXAM: {
    label: "Exam",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  HOLIDAY: {
    label: "Holiday",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  EVENT: {
    label: "Event",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  EMERGENCY: {
    label: "Urgent",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch notices from backend
  const fetchNotices = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getNotices();
      setNotices(data || []);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // Handler: Create Notice
  const handleCreateNotice = async (noticeData: CreateNoticeDto) => {
    await createNotice(noticeData);
    await fetchNotices();
  };

  return (
    <div className="space-y-6 container mx-auto">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Megaphone className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Notice Board Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish announcements, exam schedules, holiday notices, and circulars.
            </p>
          </div>
        </div>

        {/* Publish Button */}
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-11 px-5 rounded-2xl bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Publish Notice</span>
        </Button>
      </div>

      {/* 2. Notices Feed / List */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading school notices...</p>
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200">
            <Megaphone className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No notices published yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Click the Publish Notice button above to create your first announcement for teachers or parents.
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            variant="outline"
            className="rounded-xl text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Publish First Notice
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice) => {
            const cat = CATEGORY_CONFIG[notice.category] || CATEGORY_CONFIG.GENERAL;
            const formattedDate = new Date(notice.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Card
                key={notice.id}
                className="bg-white border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5 space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${cat.bg} ${cat.text} ${cat.border}`}
                    >
                      {cat.label}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {notice.targetAudience === "ALL"
                          ? "All Members"
                          : notice.targetAudience === "TEACHERS"
                          ? "Teachers"
                          : "Parents"}
                      </span>

                      {notice.isPublished ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Published
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="h-3 w-3 text-amber-600" />
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {notice.title}
                  </h3>

                  {/* Content Body */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>

                  {/* Attachment (if exists) */}
                  {notice.attachment && (
                    <a
                      href={notice.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 border border-blue-100 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View Attached Document</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {/* Footer info: Date */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {formattedDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 3. Create Notice Modal (shadcn Dialog) */}
      <CreateNoticeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAdd={handleCreateNotice}
      />
    </div>
  );
}
