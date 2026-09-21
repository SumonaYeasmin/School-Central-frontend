"use client";

import { Users, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface ClassSummaryProps {
  totalStudents: number;
  marksEntered: number;
  pendingCount: number;
  averageMarks: number;
}

export function ClassSummaryCard({
  totalStudents = 32,
  marksEntered = 28,
  pendingCount = 4,
  averageMarks = 78.5,
}: ClassSummaryProps) {
  const summaryMetrics = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50/90 border-blue-100/80",
      valueColor: "text-blue-950",
    },
    {
      title: "Marks Entered",
      value: marksEntered,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50/90 border-emerald-100/80",
      valueColor: "text-emerald-950",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50/90 border-amber-100/80",
      valueColor: "text-amber-950",
    },
    {
      title: "Average Marks",
      value: averageMarks > 0 ? averageMarks.toFixed(1) : "-",
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50/90 border-purple-100/80",
      valueColor: "text-purple-950",
    },
  ];

  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
      <CardHeader className="p-5 pb-3 border-b border-slate-100">
        <CardTitle className="text-sm font-bold text-slate-900">
          Class Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-3.5">
          {summaryMetrics.map((item) => (
            <div
              key={item.title}
              className={`p-3.5 rounded-xl border ${item.bg} flex items-center gap-3 transition-all`}
            >
              <div className={`p-2 rounded-lg bg-white/80 shadow-2xs ${item.color} shrink-0`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {item.title}
                </p>
                <p className={`text-lg sm:text-xl font-extrabold ${item.valueColor} tracking-tight`}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
