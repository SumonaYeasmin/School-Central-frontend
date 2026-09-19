import Link from "next/link";
import { Plus, School } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export function AdminOverviewHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Administration Overview</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-normal">
          Real-time analytics and management for students, faculty, and academic routines.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm h-10 px-4 gap-2 shadow-sm shadow-blue-600/20 cursor-pointer">
          <Link href="/admin/dashboard/students">
            <Plus className="h-4 w-4" />
            <span>Enroll Student</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-sm h-10 px-4 gap-2 shadow-2xs cursor-pointer">
          <Link href="/admin/dashboard/classes">
            <School className="h-4 w-4" />
            <span>Manage Classes</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
