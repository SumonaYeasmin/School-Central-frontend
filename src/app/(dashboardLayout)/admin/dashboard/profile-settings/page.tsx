"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  School,
  Globe,
  Clock,
  Camera,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export default function AdminProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "school">("profile");

  // User Profile Form State
  const [name, setName] = useState("Dr. Mahmud Hasan");
  const [email, setEmail] = useState("admin@schoolcentral.edu");
  const [phone, setPhone] = useState("+880 1712-345678");
  const [adminId, setAdminId] = useState("ADM-2026-001");
  const [designation, setDesignation] = useState("Head Administrator / Principal");
  const [office, setOffice] = useState("Central Administration (Room 101)");
  const [joinedDate, setJoinedDate] = useState("September 26, 2026");
  const [photo, setPhoto] = useState("");

  // Password / Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // School Settings State
  const [schoolName, setSchoolName] = useState("Greenfield High School");
  const [academicYear, setAcademicYear] = useState("2026 - 2027");
  const [timezone, setTimezone] = useState("Asia/Dhaka (GMT+6:00)");
  const [language, setLanguage] = useState("English (US)");

  // UI state for save simulation
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setName(parsed.name);
        if (parsed?.email) setEmail(parsed.email);
        if (parsed?.phone) setPhone(parsed.phone);
        if (parsed?.avatar) setPhoto(parsed.avatar);
      }
    } catch {}
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 container mx-auto pb-12 max-w-5xl">
      {/* 1. Top Admin Profile Header Card */}
      <div className="relative bg-gradient-to-r from-slate-900 via-[#0f2c4a] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Camera Overlay */}
          <div className="relative group shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-extrabold overflow-hidden shadow-2xl">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <span>{name.charAt(0)}</span>
              )}
            </div>
            <button
              type="button"
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg border-2 border-slate-900 transition-transform active:scale-95 cursor-pointer"
              title="Change Profile Photo"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Profile Name & Metadata */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-400" />
                  Super Administrator
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  Verified
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/80">
              {designation} • {schoolName}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-mono">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                {email}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Shield className="h-3.5 w-3.5 text-blue-400" />
                ID: {adminId}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                Joined {joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "profile"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <User className="h-4 w-4 text-blue-600" />
          <span>Profile Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "security"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Lock className="h-4 w-4 text-emerald-600" />
          <span>Security</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("school")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "school"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <School className="h-4 w-4 text-indigo-600" />
          <span>School Info</span>
        </button>
      </div>

      {/* 3. Feedback Banner */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in-0 slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Profile and settings updated successfully!</span>
        </div>
      )}

      {/* 4. Tab 1: Personal & Profile Information */}
      {activeTab === "profile" && (
        <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Manage your personal admin profile credentials and contact details.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-blue-600" />
                      Email Address <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Verified
                    </span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-mono"
                    required
                  />
                </div>
              </div>

              {/* Row 2: System Role & Admin ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-blue-600" />
                      System Role
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Protected
                    </span>
                  </label>
                  <div className="h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-100/70 text-slate-700 text-sm font-bold flex items-center justify-between">
                    <span>ADMINISTRATOR</span>
                    <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-800 border-blue-200">
                      Primary Level
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="h-3.5 w-3.5 text-blue-600" />
                      Admin System ID
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Immutable
                    </span>
                  </label>
                  <Input
                    type="text"
                    value={adminId}
                    disabled
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-100/70 font-mono font-bold text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 3: Phone & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                    Designatory Title
                  </label>
                  <Input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              {/* Row 4: Office Location & Join Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-blue-600" />
                    Office / Department
                  </label>
                  <Input
                    type="text"
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    Account Registered Date
                  </label>
                  <Input
                    type="text"
                    value={joinedDate}
                    disabled
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-100/70 text-slate-700 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Discard Changes
                </Button>
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#0f2c4a] hover:bg-[#163e66] text-white shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Profile</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 5. Tab 2: Security & Password */}
      {activeTab === "security" && (
        <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              <span>Change Password & Security</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Ensure your account is protected with a strong, secure password.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-emerald-600" />
                  Current Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPass ? "text" : "password"}
                    placeholder="Enter existing password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white pr-10 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showNewPass ? "text" : "password"}
                    placeholder="Enter strong new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white pr-10 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  Confirm New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white pr-10 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password Guidelines Helper */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Password Guidelines:
                </p>
                <ul className="space-y-1 text-[11px] text-slate-500 list-disc list-inside">
                  <li>At least 8 characters in length</li>
                  <li>Include both uppercase and lowercase letters</li>
                  <li>Include at least one number (0-9) or symbol</li>
                </ul>
              </div>

              {/* Security Save */}
              <div className="pt-3 flex items-center gap-3">
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#0f2c4a] hover:bg-[#163e66] text-white shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Update Password</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 6. Tab 3: School & Institution Settings */}
      {activeTab === "school" && (
        <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <School className="h-5 w-5 text-indigo-600" />
              <span>School & Institution Preferences</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Basic school portal preferences and system localization.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <School className="h-3.5 w-3.5 text-indigo-600" />
                    School / Institute Name
                  </label>
                  <Input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                    Current Academic Session
                  </label>
                  <Input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-600" />
                    Timezone & Region
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 font-medium text-slate-800"
                  >
                    <option value="Asia/Dhaka (GMT+6:00)">Asia/Dhaka (GMT+6:00)</option>
                    <option value="Asia/Kolkata (GMT+5:30)">Asia/Kolkata (GMT+5:30)</option>
                    <option value="UTC (GMT+0:00)">UTC (GMT+0:00)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-indigo-600" />
                    Default Portal Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 font-medium text-slate-800"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#0f2c4a] hover:bg-[#163e66] text-white shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save School Preferences</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
