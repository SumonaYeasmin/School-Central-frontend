"use client";

import { useState } from "react";
import { Search, UsersRound, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Eye } from "lucide-react";
import { ParentCard } from "./ParentCard";
import { MockParent, MOCK_PARENTS } from "./mockParents";

interface ParentsDirectoryProps {
  parents?: MockParent[];
}

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

export function ParentsDirectory({ parents = MOCK_PARENTS }: ParentsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter parents by search query
  const filteredParents = parents.filter((parent) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = parent.name?.toLowerCase().includes(query);
    const studentMatch = parent.linkedStudent?.toLowerCase().includes(query);
    const emailMatch = parent.email?.toLowerCase().includes(query);
    const phoneMatch = parent.phone?.toLowerCase().includes(query);
    return nameMatch || studentMatch || emailMatch || phoneMatch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Directory Section Header & Controls */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              FAMILY DIRECTORY
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Parents & guardians
            </h2>
          </div>

          {/* View toggle (Grid / Table) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <Button
              type="button"
              size="sm"
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-xs hover:bg-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Card Grid</span>
            </Button>
            <Button
              type="button"
              size="sm"
              variant={viewMode === "table" ? "default" : "ghost"}
              onClick={() => setViewMode("table")}
              className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-xs hover:bg-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Table</span>
            </Button>
          </div>
        </div>

        {/* 2. Controls / Search bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search parents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 3. Main Content (Card Grid vs Table) */}
        {filteredParents.length === 0 ? (
          <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
              <UsersRound className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No parents found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No parents matching "${searchQuery}". Try searching with another keyword.`
                : "No parent records available."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* CARD GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredParents.map((parent, index) => {
              const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
              return (
                <ParentCard
                  key={parent.id || index}
                  parent={parent}
                  avatarColor={avatar}
                />
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Parent / Guardian</th>
                  <th className="py-3.5 px-4">Linked Student</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Portal</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredParents.map((parent, index) => {
                  const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
                  return (
                    <tr
                      key={parent.id || index}
                      className="group hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0`}
                          >
                            {parent.initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {parent.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {parent.relation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800 text-xs">
                          {parent.linkedStudent}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {parent.studentClass}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-slate-600">
                          {parent.phone}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200/80 text-xs font-semibold py-0.5 px-2.5 rounded-full"
                        >
                          {parent.portalStatus}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors ml-auto"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Details</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
