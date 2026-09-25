"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, AlertCircle, RefreshCw } from "lucide-react";
import { getMyChildren, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { MyChildrenHeader } from "@/src/components/dashboard/parent/my-children/MyChildrenHeader";
import { ChildSelectorTabs } from "@/src/components/dashboard/parent/my-children/ChildSelectorTabs";
import { StudentIdentityCard } from "@/src/components/dashboard/parent/my-children/StudentIdentityCard";
import { AcademicInfoCard } from "@/src/components/dashboard/parent/my-children/AcademicInfoCard";
import { ParentsGuardiansCard } from "@/src/components/dashboard/parent/my-children/ParentsGuardiansCard";
import { EnrolledSubjectsCard } from "@/src/components/dashboard/parent/my-children/EnrolledSubjectsCard";
import { RecordUpdateNote } from "@/src/components/dashboard/parent/my-children/RecordUpdateNote";

export default function MyChildrenPage() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [parentEmail, setParentEmail] = useState<string>("");

  const fetchChildren = async () => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await getUserInfo("PARENT");
      const email = userInfo?.email || "rafiqul@example.com";
      setParentEmail(email);

      const res = await getMyChildren(email);
      setData(res);
      if (res.children && res.children.length > 0) {
        setSelectedChildId(res.children[0].id);
      }
    } catch (err: any) {
      console.error("Failed to load children info:", err);
      setError(
        err?.response?.data?.message ||
          "Could not load children data. Please make sure you are logged in as a parent."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const selectedChild =
    data?.children.find((c) => c.id === selectedChildId) ||
    data?.children[0];

  return (
    <div className="space-y-6 container mx-auto font-sans">
      {/* 1. Top Header */}
      <MyChildrenHeader
        parentName={data?.parentName}
        phone={data?.phone}
        email={data?.email}
        address={data?.address}
        totalChildren={data?.totalChildren ?? 0}
        loading={loading}
        onRefresh={fetchChildren}
      />

      {/* 2. Loading State */}
      {loading && (
        <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 mb-4 animate-pulse">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Loading student information...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fetching records from school database for {parentEmail}
          </p>
        </div>
      )}

      {/* 3. Error State */}
      {error && !loading && (
        <div className="rounded-3xl bg-rose-50 border border-rose-200/80 p-8 text-center shadow-xs">
          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-rose-900">
            Unable to Load Student Records
          </h3>
          <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchChildren}
            className="mt-4 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 4. Main Content Layout */}
      {!loading && !error && data && (
        <div className="space-y-6">
          {/* Child Selector Tabs (if parent has multiple children) */}
          <ChildSelectorTabs
            childrenList={data.children}
            selectedChildId={selectedChild?.id || null}
            onSelectChild={(id) => setSelectedChildId(id)}
          />

          {/* If no children linked */}
          {data.children.length === 0 && (
            <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center shadow-xs">
              <div className="h-16 w-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No Children Linked Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                There are currently no student accounts linked to this parent profile in the school system.
                Please contact the school office to link your student.
              </p>
            </div>
          )}

          {/* 2-Column Dashboard Layout */}
          {selectedChild && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (6 cols): Student Card, Academic Info & Guardians */}
              <div className="lg:col-span-6 space-y-6">
                {/* Student Identity Card */}
                <StudentIdentityCard child={selectedChild} />

                {/* Academic & Enrolment Information Card */}
                <AcademicInfoCard child={selectedChild} />

                {/* Parents & Guardians Card */}
                <ParentsGuardiansCard child={selectedChild} parentData={data} />
              </div>

              {/* Right Column (6 cols): Enrolled Subjects & Helpdesk Note */}
              <div className="lg:col-span-6 space-y-6">
                {/* Enrolled Curriculum Subjects Card */}
                <EnrolledSubjectsCard child={selectedChild} />

                {/* Profile Record Update Helpdesk Note */}
                <RecordUpdateNote />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
