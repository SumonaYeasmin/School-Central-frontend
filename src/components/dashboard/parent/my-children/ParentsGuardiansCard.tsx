"use client";

import React from "react";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { ParentChildInfo, MyChildrenResponse } from "@/src/services/parentService";

interface ParentsGuardiansCardProps {
  child: ParentChildInfo;
  parentData: MyChildrenResponse;
}

export function ParentsGuardiansCard({
  child,
  parentData,
}: ParentsGuardiansCardProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <Heart className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Parents & Guardians
          </h3>
          <p className="text-xs text-slate-500">
            Registered family contacts & emergency info
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {child.guardians && child.guardians.length > 0 ? (
          child.guardians.map((g) => (
            <div
              key={g.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 text-sm">{g.name}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-slate-200">
                  {g.relation}
                </span>
              </div>

              <div className="space-y-1 text-slate-500 text-[11px] pt-1 border-t border-slate-200/60">
                {g.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-indigo-500" />
                    <span className="font-medium text-slate-700">{g.phone}</span>
                  </div>
                )}
                {g.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-blue-500" />
                    <span>{g.email}</span>
                  </div>
                )}
                {g.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-emerald-500" />
                    <span>{g.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-sm">{parentData.parentName}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-slate-200">
                {child.relation}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-600 text-xs pt-1 border-t border-slate-200/60">
              <Phone className="h-3 w-3 text-indigo-500" />
              <span className="font-medium">{parentData.phone}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
