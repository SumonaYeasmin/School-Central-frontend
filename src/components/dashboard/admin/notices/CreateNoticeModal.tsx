"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Megaphone,
  Tag,
  Users,
  FileText,
  Link as LinkIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  CreateNoticeDto,
  NoticeCategory,
  NoticeAudience,
} from "@/src/types/notice";

interface CreateNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (noticeData: CreateNoticeDto) => Promise<void>;
}

const CATEGORIES: { value: NoticeCategory; label: string; color: string }[] = [
  { value: "GENERAL", label: "General Notice", color: "bg-slate-100 text-slate-700" },
  { value: "ACADEMIC", label: "Academic / Class", color: "bg-blue-100 text-blue-700" },
  { value: "EXAM", label: "Exam & Schedule", color: "bg-indigo-100 text-indigo-700" },
  { value: "HOLIDAY", label: "Holiday & Vacation", color: "bg-amber-100 text-amber-800" },
  { value: "EVENT", label: "School Event", color: "bg-purple-100 text-purple-700" },
  { value: "EMERGENCY", label: "Urgent / Emergency", color: "bg-rose-100 text-rose-700" },
];

const AUDIENCES: { value: NoticeAudience; label: string; desc: string }[] = [
  { value: "ALL", label: "Everyone (All)", desc: "Students, Teachers & Parents" },
  { value: "TEACHERS", label: "Teachers Only", desc: "Faculty members only" },
  { value: "PARENTS", label: "Parents Only", desc: "Guardians and Parents" },
];

export function CreateNoticeModal({
  isOpen,
  onClose,
  onAdd,
}: CreateNoticeModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoticeCategory>("GENERAL");
  const [targetAudience, setTargetAudience] = useState<NoticeAudience>("ALL");
  const [attachment, setAttachment] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("GENERAL");
    setTargetAudience("ALL");
    setAttachment("");
    setIsPublished(true);
    setError(null);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter notice title.");
      return;
    }

    if (!content.trim()) {
      setError("Please write the notice content.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateNoticeDto = {
        title: title.trim(),
        content: content.trim(),
        category,
        targetAudience,
        attachment: attachment.trim() || undefined,
        isPublished,
      };

      await onAdd(payload);
      resetForm();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create notice. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Publish New Notice
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Create a school notice for teachers, parents, or all members.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Notice Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              Notice Title <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. Summer Vacation Schedule & Guidelines"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium"
              required
            />
          </div>

          {/* 2. Category & Target Audience (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-blue-600" />
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium text-slate-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-blue-600" />
                Audience <span className="text-rose-500">*</span>
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as NoticeAudience)}
                className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium text-slate-800"
              >
                {AUDIENCES.map((aud) => (
                  <option key={aud.value} value={aud.value}>
                    {aud.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Notice Content (Textarea) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              Notice Description / Content <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Write the full notice announcement here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-normal text-slate-800 leading-relaxed resize-y"
              required
            />
          </div>

          {/* 4. Optional Attachment Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-blue-600" />
              Attachment URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://example.com/notice-document.pdf"
              value={attachment}
              onChange={(e) => setAttachment(e.target.value)}
              className="h-10 text-xs rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-mono"
            />
          </div>

          {/* 5. Publish Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between cursor-pointer" onClick={() => setIsPublished(!isPublished)}>
            <div className="flex items-center gap-2.5">
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${isPublished ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {isPublished ? "Publish Immediately" : "Save as Draft"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isPublished ? "Visible to target audience on notice board" : "Only admin can see this"}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4.5 w-4.5 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Modal Footer (shadcn DialogFooter) */}
          <DialogFooter className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#0f2c4a] hover:bg-[#163e66] text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Megaphone className="h-3.5 w-3.5" />
                  <span>Publish Notice</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
