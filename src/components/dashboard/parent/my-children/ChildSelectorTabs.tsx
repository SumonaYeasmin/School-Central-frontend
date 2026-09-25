"use client";

import React from "react";
import { ParentChildInfo } from "@/src/services/parentService";

interface ChildSelectorTabsProps {
  childrenList: ParentChildInfo[];
  selectedChildId: string | null;
  onSelectChild: (id: string) => void;
}

export function ChildSelectorTabs({
  childrenList,
  selectedChildId,
  onSelectChild,
}: ChildSelectorTabsProps) {
  if (childrenList.length <= 1) return null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
      {childrenList.map((child) => {
        const isSelected = child.id === selectedChildId;
        return (
          <button
            key={child.id}
            onClick={() => onSelectChild(child.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer shrink-0 ${
              isSelected
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "bg-transparent hover:bg-slate-50 text-slate-700 font-medium"
            }`}
          >
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {child.name.charAt(0)}
            </div>
            <div className="text-xs">
              <div className="leading-tight">{child.name}</div>
              <div
                className={`text-[10px] ${
                  isSelected ? "text-indigo-100" : "text-slate-400"
                }`}
              >
                {child.class} • Roll #{child.roll}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
