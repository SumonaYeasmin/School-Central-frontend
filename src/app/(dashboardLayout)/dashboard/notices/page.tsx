"use client";

import { useEffect, useState, useMemo } from "react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Megaphone,
  Search,
  Calendar,
  Users,
  Tag,
  Loader2,
  FileText,
  ExternalLink,
  Clock,
} from "lucide-react";
import { getNotices } from "@/src/services/noticeService";
import { Notice, NoticeCategory } from "@/src/types/notice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";

const CATEGORY_CONFIG: Record<
  NoticeCategory,
  { label: string; bg: string; text: string; border: string }
> = {
  GENERAL: { label: "General", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
  ACADEMIC: { label: "Academic", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  EXAM: { label: "Exam", bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  HOLIDAY: { label: "Holiday", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  EVENT: { label: "Event", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  EMERGENCY: { label: "Urgent", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

export default function ParentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    async function loadNotices() {
      try {
        setIsLoading(true);
        const data = await getNotices();
        // Filter notices applicable for Parents (ALL or PARENTS) and only published
        const parentNotices = (data || []).filter(
          (n) => n.isPublished && (n.targetAudience === "ALL" || n.targetAudience === "PARENTS")
        );
        setNotices(parentNotices);
      } catch (err) {
        console.error("Failed to load parent notices:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadNotices();
  }, []);

  // Filtered notices by search and category
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory =
        selectedCategory === "ALL" || notice.category === selectedCategory;
      const matchesSearch =
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 container mx-auto">
      {/* 1. Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center border border-white/10 backdrop-blur-md shrink-0">
              <Megaphone className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Notice Board & Announcements
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Guardian Portal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-1">
                Stay updated with school holidays, exams, fee schedules, and important notices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs rounded-xl border-slate-200 bg-slate-50/60 focus:bg-white"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {["ALL", "GENERAL", "ACADEMIC", "EXAM", "HOLIDAY", "EVENT", "EMERGENCY"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0f2c4a] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {cat === "ALL" ? "All" : CATEGORY_CONFIG[cat as NoticeCategory]?.label || cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Notices Grid */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading school notices...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200">
            <Megaphone className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No notices available</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "ALL"
              ? "No notices matched your search filter."
              : "No notices have been published for guardians yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotices.map((notice) => {
            const cat = CATEGORY_CONFIG[notice.category] || CATEGORY_CONFIG.GENERAL;
            const formattedDate = new Date(notice.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Card
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="bg-white border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between"
              >
                <CardContent className="p-5 space-y-3">
                  {/* Category & Audience */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${cat.bg} ${cat.text} ${cat.border}`}
                    >
                      {cat.label}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {notice.targetAudience === "PARENTS" ? "Parents Only" : "All Members"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {notice.title}
                  </h3>

                  {/* Content Preview */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>

                  {/* Attachment tag */}
                  {notice.attachment && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50/70 px-2.5 py-1 rounded-lg">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Has Attached Document</span>
                    </div>
                  )}

                  {/* Footer info: Date */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {formattedDate}
                    </span>
                    <span className="text-blue-600 font-semibold hover:underline">
                      View Details →
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Notice Detail View Dialog */}
      {selectedNotice && (
        <Dialog open={Boolean(selectedNotice)} onOpenChange={() => setSelectedNotice(null)}>
          <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {selectedNotice.title}
                  </DialogTitle>
                  <p className="text-xs text-blue-200/80 mt-0.5">
                    Published on {new Date(selectedNotice.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                    CATEGORY_CONFIG[selectedNotice.category]?.bg || "bg-slate-100"
                  } ${CATEGORY_CONFIG[selectedNotice.category]?.text || "text-slate-700"} ${
                    CATEGORY_CONFIG[selectedNotice.category]?.border || "border-slate-200"
                  }`}
                >
                  {CATEGORY_CONFIG[selectedNotice.category]?.label || "General"}
                </span>

                <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg font-medium">
                  Audience: {selectedNotice.targetAudience === "PARENTS" ? "Parents Only" : "All Members"}
                </span>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedNotice.content}
              </div>

              {selectedNotice.attachment && (
                <a
                  href={selectedNotice.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
                >
                  <FileText className="h-4 w-4" />
                  <span>View / Download Attached Document</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100">
              <Button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="w-full h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close Notice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
