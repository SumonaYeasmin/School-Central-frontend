"use client";

import { Button } from "@/src/components/ui/button";
import { ArrowLeft, UserX } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudentNotFoundProps {
  error?: string | null;
  onBack?: () => void;
}

export function StudentNotFound({ error, onBack }: StudentNotFoundProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/admin/dashboard/students");
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
      <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100">
        <UserX className="h-7 w-7" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-800">Student Not Found</h2>
        <p className="text-sm text-slate-500 mt-1">
          {error || "The requested student could not be found or has been removed."}
        </p>
      </div>
      <Button
        onClick={handleBack}
        className="bg-[#0f2c4a] hover:bg-[#163e66] text-white rounded-xl px-5 py-2.5 cursor-pointer shadow-xs transition-all"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Students</span>
      </Button>
    </div>
  );
}
