"use client";

import { Student } from "@/src/types/student";
import { Building2, Mail, Phone, Users } from "lucide-react";

interface StudentParentInfoProps {
  parents?: Student["parents"];
}

export function StudentParentInfo({ parents }: StudentParentInfoProps) {
  const getRelationBadge = (relation?: string) => {
    const rel = relation?.toUpperCase();
    if (rel === "FATHER") {
      return {
        label: "Father",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }
    if (rel === "MOTHER") {
      return {
        label: "Mother",
        className: "bg-rose-50 text-rose-700 border-rose-200",
      };
    }
    if (rel === "GUARDIAN") {
      return {
        label: "Guardian",
        className: "bg-purple-50 text-purple-700 border-purple-200",
      };
    }
    return {
      label: relation || "Parent",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Users className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Parent & Guardian Information
          </h3>
          <p className="text-xs text-slate-400">
            Emergency contacts & family links
          </p>
        </div>
      </div>

      {/* Parent Cards Grid */}
      {parents && parents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parents.map((p, idx) => {
            const badge = getRelationBadge(p.relation);

            return (
              <div
                key={p.id || idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3 hover:border-slate-300 transition-colors"
              >
                {/* Header: Name + Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {p.parent?.name}
                    </span>
                    {p.isPrimary && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md font-semibold">
                        Primary
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Contact details */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{p.parent?.phone || "No phone provided"}</span>
                  </div>

                  {p.parent?.email && (
                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{p.parent.email}</span>
                    </div>
                  )}

                  {p.parent?.address && (
                    <div className="text-xs text-slate-500 flex items-start gap-2 pt-0.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{p.parent.address}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs flex flex-col items-center justify-center gap-2 bg-slate-50/30">
          <Users className="h-6 w-6 text-slate-300" />
          <p>No parent or guardian information has been linked to this student yet.</p>
        </div>
      )}
    </div>
  );
}
