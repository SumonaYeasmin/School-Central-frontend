"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Info,
  Users,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { getMyChildren, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";

export default function ParentProfileSettingsPage() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const userInfo = await getUserInfo("PARENT");
        setUser(userInfo);
        const userEmail = userInfo?.email || "";
        const res = await getMyChildren(userEmail || undefined);
        setData(res);
      } catch (err) {
        console.error("Failed to load parent profile from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Dynamically resolve real data from database API, fallback to session user info
  const parentName = data?.parentName || user?.name || "Guardian Account";
  const parentId = data?.parentId 
    ? (data.parentId.startsWith("c") ? `PAR-${data.parentId.slice(-6).toUpperCase()}` : data.parentId)
    : (user?.id ? `PAR-${user.id.slice(-6).toUpperCase()}` : "PAR-2026-001");
  const phone = data?.phone || user?.phone || "Not Provided";
  const email = data?.email || user?.email || "parent@schoolcentral.edu";
  const address = data?.address || "Dhaka, Bangladesh";


  return (
    <div className="space-y-6 container mx-auto pb-12 max-w-5xl font-sans">
      {/* 1. Guardian Profile Hero Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-[#1e1b4b] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Icon */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-extrabold overflow-hidden shadow-2xl">
              <span>{parentName.charAt(0) || "P"}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-600 text-white shadow-md border-2 border-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Title & Badges */}
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                Verified Guardian
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 text-xs font-mono font-medium border border-slate-700">
                ID: {parentId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Active Account
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {parentName}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Official guardian record linked with student academic and attendance profiles.
            </p>
          </div>

          {/* Read Only Status Pill */}
          <div className="bg-white/5 border border-white/10 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs text-slate-300 self-center sm:self-start">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span className="font-semibold">Read-Only Profile</span>
          </div>
        </div>
      </div>

      {/* 2. Admin Managed Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-900">
        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-amber-950 block mb-0.5">
            Institutional Guardian Record Protected
          </span>
          <p className="text-amber-800/90 font-medium">
            To ensure student safety and authentic identity verification, guardian records cannot be edited directly from the portal. For contact number updates, address changes, or linked student modifications, please submit a request to the School Administration Office.
          </p>
        </div>
      </div>

      {/* 3. Guardian Profile Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Identity Details */}
        <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <CardHeader className="p-5 sm:p-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <User className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Guardian Identity
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Official identity details registered with the institution
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Full Legal Name
              </span>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{isLoading ? "Loading..." : parentName}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Guardian ID / Registration Code
              </span>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-mono font-semibold text-xs">
                <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>{isLoading ? "Loading..." : parentId}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Account Role / Relationship
              </span>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>Primary Guardian / Parent</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100">
                  Verified
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Institutional Campus
              </span>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Greenfield High School • Main Campus</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Residential Details */}
        <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <CardHeader className="p-5 sm:p-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Contact & Residence
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Verified communication numbers and permanent address
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Registered Phone Number
              </span>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isLoading ? "Loading..." : phone}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                  Primary SMS
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Official Email Address
              </span>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{isLoading ? "Loading..." : email}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Residential Address
              </span>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{isLoading ? "Loading..." : address || "Dhaka, Bangladesh"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Emergency Notification Channel
              </span>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 font-semibold text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>SMS Alerts & Portal Notices</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


