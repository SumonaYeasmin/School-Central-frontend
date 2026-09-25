"use client";

import React, { useState, useEffect } from "react";
import { getMyChildren, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { ParentOverviewHeader } from "@/src/components/dashboard/parent/overview/ParentOverviewHeader";
import { ParentMetricCards } from "@/src/components/dashboard/parent/overview/ParentMetricCards";
import { AttendanceRechartsCard } from "@/src/components/dashboard/parent/overview/AttendanceRechartsCard";
import { SubjectMarksRechartsCard } from "@/src/components/dashboard/parent/overview/SubjectMarksRechartsCard";
import { PerformanceGradePieCard } from "@/src/components/dashboard/parent/overview/PerformanceGradePieCard";
import { RefreshCw, AlertCircle, Sparkles } from "lucide-react";

export function ParentOverviewView() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await getUserInfo("PARENT");
      const email = userInfo?.email || "rafiqul@example.com";
      const res = await getMyChildren(email);
      setData(res);
      if (res.children && res.children.length > 0) {
        setSelectedChildId((prev) => prev || res.children[0].id);
      }
    } catch (err: any) {
      console.error("Error loading parent overview data:", err);
      setError("Unable to load parent portal records. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentData();
  }, []);

  const selectedChild =
    data?.children.find((c) => c.id === selectedChildId) || data?.children[0];

  // 1. Full Page Loading State
  if (loading && !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 font-sans container mx-auto">
        <div className="h-14 w-14 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm animate-pulse">
          <RefreshCw className="h-7 w-7 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Loading Dashboard Overview...</h3>
          <p className="text-xs text-slate-500">Fetching student statistics and academic records</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error && !data) {
    return (
      <div className="container mx-auto font-sans py-8">
        <div className="rounded-3xl bg-rose-50 border border-rose-200 p-8 text-center space-y-3 max-w-lg mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-rose-900">Failed to Load Overview</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <button
            onClick={fetchParentData}
            className="mt-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-all shadow-xs"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // 3. Complete Loaded View
  return (
    <div className="space-y-6 container mx-auto font-sans">
      {/* Top Header Banner with Session, Date, Actions & Child Switcher */}
      <ParentOverviewHeader
        parentName={data?.parentName}
        childrenList={data?.children || []}
        selectedChild={selectedChild}
        onSelectChild={(id) => setSelectedChildId(id)}
        loading={loading}
        onRefresh={fetchParentData}
      />

      {/* Visual Metric Cards */}
      <ParentMetricCards child={selectedChild} />

      {/* Recharts Graphical Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Graph (7 cols): Weekly Attendance Recharts Bar Graph */}
        <div className="lg:col-span-7">
          <AttendanceRechartsCard />
        </div>

        {/* Right Graph (5 cols): Grade Distribution Donut Chart */}
        <div className="lg:col-span-5">
          <PerformanceGradePieCard />
        </div>

        {/* Bottom Full Width Graph (12 cols): Subject Marks & Trend Curve */}
        <div className="lg:col-span-12">
          <SubjectMarksRechartsCard />
        </div>
      </div>
    </div>
  );
}
