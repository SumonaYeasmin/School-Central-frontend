"use client";

import { MockParent } from "./mockParents";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Eye, GraduationCap, Phone, Mail, UserCheck } from "lucide-react";

interface ParentCardProps {
  parent: MockParent;
  avatarColor: { bg: string; text: string };
  onView?: () => void;
}

export function ParentCard({ parent, avatarColor, onView }: ParentCardProps) {
  const isConnected = parent.portalStatus === "Connected";
  const isPending = parent.portalStatus === "Pending";

  return (
    <div className="bg-white border border-slate-200/90 hover:border-blue-300/80 hover:shadow-md transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
      {/* 1. Header: Avatar, Name, Relation, Portal Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${avatarColor.bg} ${avatarColor.text} font-bold text-sm shrink-0 shadow-2xs`}
          >
            {parent.initials}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              {parent.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-medium text-slate-400">
                {parent.relation}
              </span>
            </div>
          </div>
        </div>

        {/* Portal status badge */}
        <Badge
          variant="outline"
          className={`text-[11px] font-semibold py-0.5 px-2.5 rounded-full ${
            isConnected
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
              : isPending
              ? "bg-amber-50 text-amber-700 border-amber-200/80"
              : "bg-blue-50 text-blue-700 border-blue-200/80"
          }`}
        >
          {parent.portalStatus}
        </Badge>
      </div>

      {/* 2. Linked Student Card snippet */}
      <div className="bg-slate-50/90 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
          <GraduationCap className="h-4 w-4 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-800 truncate">
            {parent.linkedStudent}
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            {parent.studentClass}
          </div>
        </div>
      </div>

      {/* 3. Contact Info */}
      <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-medium truncate">{parent.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{parent.email}</span>
        </div>
      </div>

      {/* 4. Footer Actions (Details button) */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Parent</span>
        </span>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onView}
          className="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Details</span>
        </Button>
      </div>
    </div>
  );
}
