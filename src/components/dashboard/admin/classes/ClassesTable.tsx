"use client";

import { Badge } from "@/src/components/ui/badge";
import { BookOpen } from "lucide-react";
import { ClassTableActions } from "./ClassTableActions";

interface ClassRowData {
  id: string;
  name: string;
  gradeNumber: number;
  sections: string[];
  totalSubjects: number;
}

const defaultClasses: ClassRowData[] = [
  { id: "cls-6", name: "Class 6", gradeNumber: 6, sections: ["Section A", "Section B"], totalSubjects: 14 },
  { id: "cls-7", name: "Class 7", gradeNumber: 7, sections: ["Section A", "Section B"], totalSubjects: 14 },
  { id: "cls-8", name: "Class 8", gradeNumber: 8, sections: ["Section A", "Section B"], totalSubjects: 14 },
  { id: "cls-9", name: "Class 9", gradeNumber: 9, sections: ["Section A", "Section B"], totalSubjects: 17 },
  { id: "cls-10", name: "Class 10", gradeNumber: 10, sections: ["Section A", "Section B"], totalSubjects: 17 },
];

export function ClassesTable() {
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
            {defaultClasses.map((classItem) => (
              <tr
                key={classItem.id}
                className="group hover:bg-blue-50/30 transition-colors duration-150"
              >
                {/* 1. Class Name */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xs shrink-0">
                      {classItem.gradeNumber}
                    </div>
                    <span className="font-bold text-slate-900 text-base">
                      {classItem.name}
                    </span>
                  </div>
                </td>

                {/* 2. Sections */}
                <td className="py-4 px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {classItem.sections.map((secName, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-slate-50 border-slate-200/90 text-slate-800 text-xs font-semibold py-1 px-3 rounded-lg flex items-center gap-1.5"
                      >
                        <span>{secName}</span>
                      </Badge>
                    ))}
                  </div>
                </td>

                {/* 3. Curriculum / Subjects */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/60 py-1 px-2.5 rounded-lg w-fit">
                    <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                    <span>{classItem.totalSubjects} Subjects</span>
                  </div>
                </td>

                {/* 4. Action Buttons (Details, Update, Delete) */}
                <td className="py-4 px-6 text-right">
                  <ClassTableActions />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
