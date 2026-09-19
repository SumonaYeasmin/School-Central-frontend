"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Plus, Search, Layers, School } from "lucide-react";

export function ClassesHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <School className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Classes & Sections
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Manage Grade 6–10 classes, active sections (Section A & B), and curriculum subjects.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search class or section..."
            className="pl-9 bg-slate-50/70 border-slate-200 focus-visible:bg-white text-sm rounded-xl h-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3.5 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold gap-1.5 rounded-xl cursor-pointer"
          >
            <Layers className="h-4 w-4 text-indigo-600" />
            <span>Add Section</span>
          </Button>

          <Button
            size="sm"
            className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1.5 shadow-sm shadow-blue-600/20 rounded-xl cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Class</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
