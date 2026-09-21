"use client";

import { useEffect, useState, useCallback } from "react";
import { getClasses } from "@/src/services/academicService";
import { ClassesHeader } from "@/src/components/dashboard/admin/classes/ClassesHeader";
import { ClassesStats } from "@/src/components/dashboard/admin/classes/ClassesStats";
import { ClassesTable } from "@/src/components/dashboard/admin/classes/ClassesTable";
import { Loader2 } from "lucide-react";

export default function ClassesSectionsPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getClasses();
      setClasses(data || []);
    } catch (error) {
      console.error("Failed to fetch classes from backend:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div className="space-y-6 container mx-auto">
      {/* 1. Header with Search and Action Buttons */}
      <ClassesHeader />

      {/* 2. Top Summary KPI Stats */}
      <ClassesStats classes={classes} />

      {/* 3. Main Data Table with Loading State */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading classes & sections from database...</p>
        </div>
      ) : (
        <ClassesTable classes={classes} onRefresh={fetchClasses} />
      )}
    </div>
  );
}
