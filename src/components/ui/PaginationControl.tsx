"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
  className?: string;
}

export function PaginationControl({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  itemLabel = "items",
  className = "",
}: PaginationProps) {
  if (totalItems === 0) return null;

  // Generate page numbers with ellipses
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // When near the start
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // When near the end
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // In the middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xs ${className}`}
    >
      {/* 1. Left: Page info (Page X of Y) */}
      <div className="flex items-center gap-2.5">
        <span className="text-xs sm:text-sm font-medium text-slate-600 flex items-center gap-1.5">
          <span>Page</span>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-black border border-blue-200 text-xs shadow-2xs">
            {currentPage}
          </span>
          <span>of</span>
          <span className="font-bold text-slate-900">{totalPages}</span>
        </span>

        {totalItems > 0 && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 hidden sm:inline">
            {totalItems} {itemLabel}
          </span>
        )}
      </div>

      {/* 2. Right: Segmented Pagination Group (Previous | 1 | 2 | ... | Next) */}
      <div className="inline-flex items-center rounded-xl border border-slate-200/90 bg-white divide-x divide-slate-200 overflow-hidden shadow-xs self-start sm:self-auto">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 flex items-center gap-1.5 transition-all cursor-pointer select-none"
        >
          <ChevronLeft className="h-4 w-4 text-blue-600" />
          <span>Previous</span>
        </button>

        {/* Page Number & Ellipsis Buttons */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2.5 py-1.5 text-xs sm:text-sm text-slate-400 font-bold bg-slate-50/50 flex items-center justify-center min-w-[34px] select-none tracking-widest"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onPageChange(Number(p))}
              className={`px-3 py-1.5 text-xs sm:text-sm min-w-[36px] transition-all cursor-pointer flex items-center justify-center ${
                currentPage === p
                  ? "bg-blue-600 text-white font-black shadow-inner"
                  : "text-slate-700 font-semibold hover:bg-blue-50 hover:text-blue-700 bg-white"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 flex items-center gap-1.5 transition-all cursor-pointer select-none"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4 text-blue-600" />
        </button>
      </div>
    </div>
  );
}
