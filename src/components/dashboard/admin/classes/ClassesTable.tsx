"use client";

import { Badge } from "@/src/components/ui/badge";
import { BookOpen, School } from "lucide-react";
import { ClassTableActions } from "./ClassTableActions";

interface ClassesTableProps {
  classes: any[];
}

export function ClassesTable({ classes = [] }: ClassesTableProps) {
  if (classes.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
          <School className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No classes found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No classes are available in the database. You can add a new class using the button above.
        </p>
      </div>
    );
  }

  // Sort naturally (Class 6 -> Class 10)
  const sortedClasses = [...classes].sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.name.replace(/\D/g, ""), 10) || 0;
    if (numA !== numB) return numA - numB;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-6">Class Name</th>
              <th className="py-4 px-6">Sections</th>
              <th className="py-4 px-6">Curriculum</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedClasses.map((classItem) => {
              const gradeNumber =
                classItem.name.replace(/[^0-9]/g, "") || classItem.name.charAt(0);
              const subjectsCount =
                classItem.classSubjects?.length || classItem.totalSubjects || 0;

              return (
                <tr
                  key={classItem.id}
                  className="group hover:bg-blue-50/30 transition-colors duration-150"
                >
                  {/* 1. Class Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xs shrink-0">
                        {gradeNumber}
                      </div>
                      <span className="font-bold text-slate-900 text-base">
                        {classItem.name}
                      </span>
                    </div>
                  </td>

                  {/* 2. Sections (From Database) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {!classItem.sections || classItem.sections.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">No sections</span>
                      ) : (
                        classItem.sections.map((sec: any) => (
                          <Badge
                            key={sec.id}
                            variant="outline"
                            className="bg-slate-50 border-slate-200/90 text-slate-800 text-xs font-semibold py-1 px-3 rounded-lg flex items-center gap-1.5"
                          >
                            <span>{sec.name}</span>
                          </Badge>
                        ))
                      )}
                    </div>
                  </td>

                  {/* 3. Curriculum / Subjects Count */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/60 py-1 px-2.5 rounded-lg w-fit">
                      <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                      <span>{subjectsCount} Subjects</span>
                    </div>
                  </td>

                  {/* 4. Action Buttons (Details, Update, Delete) */}
                  <td className="py-4 px-6 text-right">
                    <ClassTableActions />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
