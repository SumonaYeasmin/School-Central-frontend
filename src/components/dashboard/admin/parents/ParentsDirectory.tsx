"use client";

import { useState } from "react";
import {
  Search,
  UsersRound,
  LayoutGrid,
  Table as TableIcon,
  Plus,
  Phone,
  Mail,
  GraduationCap,
  X,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { ParentCard } from "./ParentCard";
import { ParentActionsMenu } from "./ParentActionsMenu";
import { Parent } from "@/src/types/parent";

interface ParentsDirectoryProps {
  parents?: Parent[];
  onEdit?: (parent: Parent) => void;
  onManageStudents?: (parent: Parent) => void;
  onDelete?: (parent: Parent) => void;
  onAddParent?: () => void;
}

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

function getInitials(name: string) {
  if (!name) return "P";
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ParentsDirectory({
  parents = [],
  onEdit = () => { },
  onManageStudents = () => { },
  onDelete = () => { },
  onAddParent = () => { },
}: ParentsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter parents by search query (name, phone, email, address, linked students)
  const filteredParents = parents.filter((parent) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = parent.name?.toLowerCase().includes(query);
    const emailMatch = parent.email?.toLowerCase().includes(query);
    const phoneMatch = parent.phone?.toLowerCase().includes(query);
    const addressMatch = parent.address?.toLowerCase().includes(query);

    const studentMatch = parent.students?.some((ps) => {
      const sName = ps.student?.name?.toLowerCase() || "";
      const sRoll = ps.student?.roll?.toLowerCase() || "";
      const sId = ps.student?.studentId?.toLowerCase() || "";
      const sClass = ps.student?.class?.name?.toLowerCase() || "";
      return (
        sName.includes(query) ||
        sRoll.includes(query) ||
        sId.includes(query) ||
        sClass.includes(query)
      );
    });

    return nameMatch || emailMatch || phoneMatch || addressMatch || studentMatch;
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
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-xl font-bold text-slate-900">
                Parents & guardians
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {filteredParents.length} registered
              </span>
            </div>
          </div>

          {/* View toggle (Grid / Table) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <Button
              type="button"
              size="sm"
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "grid"
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
              className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "table"
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
              placeholder="Search by name, phone, email, or child..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Main Content (Card Grid vs Table) */}
        {filteredParents.length === 0 ? (
          <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3 bg-slate-50/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
              <UsersRound className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {searchQuery ? "No parents matching search" : "No parents in database"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No parent profiles found matching "${searchQuery}". Try a different name, phone, or child name.`
                : "No parents have been added to the database yet. Get started by adding a parent."}
            </p>
            {!searchQuery && (
              <Button
                onClick={onAddParent}
                className="bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs font-semibold px-4 py-2 rounded-xl mt-2 cursor-pointer inline-flex items-center gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Parent</span>
              </Button>
            )}
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
                  onEdit={onEdit}
                  onManageStudents={onManageStudents}
                  onDelete={onDelete}
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
                  <th className="py-3.5 px-4">Linked Children</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Email / Address</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredParents.map((parent, index) => {
                  const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
                  const studentsCount = parent.students?.length || 0;

                  return (
                    <tr
                      key={parent.id || index}
                      className="group hover:bg-slate-50/70 transition-colors duration-150"
                    >
                      {/* 1. Parent Avatar + Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0 shadow-2xs`}
                          >
                            {getInitials(parent.name)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {parent.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {parent.address || "Address not provided"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Linked Children */}
                      <td className="py-4 px-4">
                        {studentsCount === 0 ? (
                          <span className="text-xs text-slate-400 italic">
                            None linked
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {parent.students!.map((ps) => {
                              const s = ps.student;
                              return (
                                <Badge
                                  key={ps.id || ps.studentId}
                                  variant="outline"
                                  className="bg-blue-50 text-blue-800 border-blue-200/80 text-[11px] font-semibold py-0.5 px-2 rounded-lg flex items-center gap-1"
                                >
                                  <GraduationCap className="h-3 w-3 text-blue-600" />
                                  <span>{s?.name || "Student"}</span>
                                  {s?.class?.name && (
                                    <span className="text-blue-500 font-normal">
                                      ({s.class.name}
                                      {s.section?.name
                                        ? ` · ${s.section.name.startsWith("Section") ? s.section.name : "Section " + s.section.name}`
                                        : ""}
                                      )
                                    </span>
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </td>

                      {/* 3. Phone */}
                      <td className="py-4 px-4">
                        <span className="text-xs font-semibold text-slate-700 font-mono flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {parent.phone}
                        </span>
                      </td>

                      {/* 4. Email */}
                      <td className="py-4 px-4">
                        {parent.email ? (
                          <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            {parent.email}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            No email
                          </span>
                        )}
                      </td>

                      {/* 5. Actions Menu */}
                      <td className="py-4 px-4 text-right">
                        <ParentActionsMenu
                          parent={parent}
                          onEdit={onEdit}
                          onManageStudents={onManageStudents}
                          onDelete={onDelete}
                        />
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
