"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Megaphone,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  FileText,
  Sparkles,
  Calendar,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/src/types/user.interface";
import { Notice, NoticeCategory } from "@/src/types/notice";
import { getNotices } from "@/src/services/noticeService";
import { useSocket } from "@/src/hooks/useSocket";
import { api } from "@/src/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

interface NotificationBellProps {
  user: UserInfo;
}

export interface PersonalNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
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

export function NotificationBell({ user }: NotificationBellProps) {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [personalNotifs, setPersonalNotifs] = useState<PersonalNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Initialize real-time WebSocket connection
  const socket = useSocket({ userId: user?.id, role: user?.role });

  const storageKey = `read_notices_${user?.id || user?.email || user?.role || "guest"}`;

  // 2. Initial fetch of notices and personal notifications from database
  useEffect(() => {
    let isMounted = true;

    // Fetch broadcast notices
    getNotices()
      .then((data) => {
        if (isMounted && data) {
          const role = user?.role;
          const userNotices = data.filter((n) => {
            if (!n.isPublished) return false;
            if (role === "TEACHER") return n.targetAudience === "ALL" || n.targetAudience === "TEACHERS";
            if (role === "PARENT") return n.targetAudience === "ALL" || n.targetAudience === "PARENTS";
            return true;
          });

          setNotices(userNotices);

          const userStorageKey = `read_notices_${user?.id || user?.email || user?.role || "guest"}`;
          const readIds: string[] = JSON.parse(localStorage.getItem(userStorageKey) || "[]");
          const unreadNotices = userNotices.filter((n) => !readIds.includes(n.id)).length;
          setUnreadCount((prev) => prev + unreadNotices);
        }
      })
      .catch((err) => console.error("Failed to load initial notices:", err));

    // Fetch personal targeted notifications (e.g. routine reschedule alerts)
    if (user?.id) {
      api
        .get("/notifications/my-notifications", { params: { userId: user.id } })
        .then((res) => {
          if (isMounted && Array.isArray(res.data)) {
            setPersonalNotifs(res.data);
            const unreadPersonal = res.data.filter((n: PersonalNotification) => !n.isRead).length;
            setUnreadCount((prev) => prev + unreadPersonal);
          }
        })
        .catch(() => {
          // If not authenticated or endpoint returns empty, fail gracefully
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user?.id, user?.email, user?.role]);

  // 3. Listen for real-time WebSocket events (broadcast notices & personal notifications)
  useEffect(() => {
    if (!socket) return;

    // A. Broadcast Notice Event
    const handleNewNotice = (newNotice: Notice) => {
      const role = user?.role;
      const isRelevant =
        role === "ADMIN" ||
        newNotice.targetAudience === "ALL" ||
        (role === "TEACHER" && newNotice.targetAudience === "TEACHERS") ||
        (role === "PARENT" && newNotice.targetAudience === "PARENTS");

      if (isRelevant) {
        console.log("⚡ [Realtime] New notice received:", newNotice.title);
        setNotices((prev) => [newNotice, ...prev.filter((n) => n.id !== newNotice.id)]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    // B. Personal Notification Event (1-to-1 alert)
    const handlePersonalNotification = (newNotif: PersonalNotification) => {
      console.log("⚡ [Realtime] Personal targeted notification received:", newNotif.title);
      setPersonalNotifs((prev) => [newNotif, ...prev.filter((n) => n.id !== newNotif.id)]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("new_notice", handleNewNotice);
    socket.on("personal_notification", handlePersonalNotification);

    return () => {
      socket.off("new_notice", handleNewNotice);
      socket.off("personal_notification", handlePersonalNotification);
    };
  }, [socket, user?.role]);

  // 4. Toggle dropdown with auto-clear of unread count
  const handleToggleDropdown = () => {
    if (!isOpen) {
      setIsOpen(true);
      setUnreadCount(0);
      const allIds = notices.map((n) => n.id);
      localStorage.setItem(storageKey, JSON.stringify(allIds));

      if (user?.id) {
        api.patch("/notifications/mark-all-read", null, { params: { userId: user.id } }).catch(() => {});
      }
    } else {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle click on a broadcast notice
  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsOpen(false);

    const readIds: string[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!readIds.includes(notice.id)) {
      const updated = [...readIds, notice.id];
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
    setUnreadCount(0);
  };

  // Handle click on a personal targeted notification (routes to target link)
  const handlePersonalClick = (notif: PersonalNotification) => {
    setIsOpen(false);
    if (user?.id) {
      api.patch(`/notifications/${notif.id}/read`, null, { params: { userId: user.id } }).catch(() => {});
    }

    if (notif.link) {
      router.push(notif.link);
    }
  };


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={handleToggleDropdown}
        className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
          isOpen
            ? "bg-blue-50 text-blue-700 border-blue-200 shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200/80"
        }`}
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />

        {/* Real-time Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs animate-in zoom-in-50">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-blue-300">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-tight">
                  Notifications
                </h4>
                <p className="text-[10px] text-blue-200/70">
                  {notices.length} latest notices
                </p>
              </div>
            </div>

            {/* Close Cross (X) Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Notifications"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Notices Scroll Area */}
          <div className="max-h-84 overflow-y-auto divide-y divide-slate-100">
            {notices.length === 0 && personalNotifs.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Megaphone className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700">No notifications yet</p>
                <p className="text-[11px] text-slate-400">
                  New announcements and alerts will appear here in real-time.
                </p>
              </div>
            ) : (
              <>
                {/* 1. Personal Targeted Alerts (e.g. Routine updates, Assignments) */}
                {personalNotifs.map((notif) => {
                  const isRoutine = notif.type === "ROUTINE_UPDATE";
                  return (
                    <div
                      key={`personal-${notif.id}`}
                      onClick={() => handlePersonalClick(notif)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left group ${
                        !notif.isRead ? "bg-violet-50/40" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            isRoutine
                              ? "bg-violet-50 text-violet-700 border-violet-200"
                              : "bg-indigo-50 text-indigo-700 border-indigo-200"
                          }`}
                        >
                          {isRoutine ? <Calendar className="h-2.5 w-2.5" /> : <BookOpen className="h-2.5 w-2.5" />}
                          {isRoutine ? "Routine Alert" : "Assignment"}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="h-2.5 w-2.5" />
                          {new Date(notif.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1">
                        {notif.title}
                      </h5>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  );
                })}

                {/* 2. Broadcast School Notices */}
                {notices.slice(0, 8).map((notice) => {
                  const style = CATEGORY_STYLES[notice.category] || CATEGORY_STYLES.GENERAL;
                  const formattedDate = new Date(notice.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <div
                      key={notice.id}
                      onClick={() => handleNoticeClick(notice)}
                      className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border}`}
                        >
                          {style.label}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="h-2.5 w-2.5" />
                          {formattedDate}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {notice.title}
                      </h5>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {notice.content}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>


          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href={
                user?.role === "TEACHER"
                  ? "/teacher/dashboard/notices"
                  : user?.role === "PARENT"
                  ? "/dashboard/notices"
                  : "/admin/dashboard/notices"
              }
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors block py-1"
            >
              View Notice Board →
            </Link>
          </div>
        </div>
      )}

      {/* Notice Detail View Modal */}
      {selectedNotice && (
        <Dialog open={Boolean(selectedNotice)} onOpenChange={() => setSelectedNotice(null)}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-white tracking-tight">
                    {selectedNotice.title}
                  </DialogTitle>
                  <p className="text-xs text-blue-200/80 mt-0.5">
                    Published on {new Date(selectedNotice.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                    CATEGORY_STYLES[selectedNotice.category]?.bg || "bg-slate-100"
                  } ${CATEGORY_STYLES[selectedNotice.category]?.text || "text-slate-700"} ${
                    CATEGORY_STYLES[selectedNotice.category]?.border || "border-slate-200"
                  }`}
                >
                  {CATEGORY_STYLES[selectedNotice.category]?.label || "General"}
                </span>

                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg font-medium">
                  Audience: {selectedNotice.targetAudience}
                </span>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
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
                  <span>View Attached Document</span>
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
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
