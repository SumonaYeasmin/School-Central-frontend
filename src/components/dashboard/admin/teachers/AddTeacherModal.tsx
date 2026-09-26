"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  User,
  Hash,
  Phone,
  Mail,
  Briefcase,
  Building2,
  Calendar,
  Loader2,
  UserPlus,
  RefreshCw,
  Camera,
  Upload,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import { CreateTeacherDto } from "@/src/types/teacher";

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (teacherData: CreateTeacherDto) => Promise<void>;
}

const DEPARTMENTS = [
  "Science",
  "Mathematics",
  "English",
  "Bengali",
  "Humanities",
  "Business Studies",
  "ICT & Computer Science",
  "General / Primary",
];

const DESIGNATIONS = [
  "Senior Teacher",
  "Assistant Teacher",
  "Head of Department",
  "Subject Specialist",
  "Lecturer",
  "Junior Teacher",
];

const compressImage = (file: File, maxWidth = 800, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export function AddTeacherModal({
  isOpen,
  onClose,
  onAdd,
}: AddTeacherModalProps) {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoInputType, setPhotoInputType] = useState<"upload" | "url">("upload");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("Senior Teacher");
  const [department, setDepartment] = useState("Science");
  const [joiningDate, setJoiningDate] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generator for Teacher ID
  const generateTeacherId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const year = new Date().getFullYear();
    setTeacherId(`TCH-${year}-${randomNum}`);
  };

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (!teacherId) {
        generateTeacherId();
      }
    }
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setTeacherId("");
    setPhoto("");
    setPhone("");
    setEmail("");
    setDesignation("Senior Teacher");
    setDepartment("Science");
    setJoiningDate("");
    setError(null);
  };

  const handleClose = () => {
    if (!isSaving) {
      resetForm();
      onClose();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB.");
        return;
      }
      try {
        const compressed = await compressImage(file);
        setPhoto(compressed);
        setError(null);
      } catch {
        setError("Failed to process image.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter the teacher's full name.");
      return;
    }
    if (!teacherId.trim()) {
      setError("Please enter or generate a Teacher ID.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const payload: CreateTeacherDto = {
        name: name.trim(),
        teacherId: teacherId.trim(),
        photo: photo.trim() || undefined,
        phone: phone.trim(),
        designation: designation.trim(),
        department: department.trim() || undefined,
        email: email.trim() ? email.trim() : undefined,
        joiningDate: joiningDate.trim() ? joiningDate.trim() : undefined,
      };

      await onAdd(payload);
      resetForm();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create teacher profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Add New Teacher
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Register a faculty member and assign department credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
              {error}
            </div>
          )}

          {/* 0. Teacher Photo Upload & Preview */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-blue-600" />
                Teacher Photo (Picture)
              </label>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPhotoInputType("upload")}
                  className={`px-2 py-0.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    photoInputType === "upload"
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  File Upload
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoInputType("url")}
                  className={`px-2 py-0.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    photoInputType === "url"
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Avatar Preview Box */}
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden bg-white border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 shadow-2xs group">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt="Teacher Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-1">
                    <User className="h-6 w-6 sm:h-7 sm:w-7 text-slate-300 mx-auto" />
                    <span className="text-[9px] text-slate-400 font-semibold mt-0.5 block leading-tight">
                      No Photo
                    </span>
                  </div>
                )}
              </div>

              {/* Upload or URL Controls */}
              <div className="flex-1 min-w-0 space-y-2">
                {photoInputType === "upload" ? (
                  <div>
                    <label className="inline-flex items-center gap-2 h-9 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-blue-600" />
                      <span>Choose Image from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-1">
                      JPG, PNG, WEBP (Max: 3MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Input
                      type="url"
                      placeholder="https://example.com/teacher-photo.jpg"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      className="h-9 text-xs rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <p className="text-[10px] text-slate-400">
                      Paste a direct image link from the web.
                    </p>
                  </div>
                )}

                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto("")}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              Full Name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. Dr. Mahmud Hasan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium"
              required
            />
          </div>

          {/* 2. Teacher ID & Designation (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-blue-600" />
                  Teacher ID <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateTeacherId}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  Auto
                </button>
              </div>
              <Input
                type="text"
                placeholder="e.g. TCH-2026-001"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-mono font-bold text-blue-900"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                Designation <span className="text-rose-500">*</span>
              </label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
              >
                {DESIGNATIONS.map((des) => (
                  <option key={des} value={des}>
                    {des}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Department & Joining Date (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
                Joining Date
              </label>
              <Input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* 4. Phone & Email (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="e.g. +880 1712-345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="e.g. teacher@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSaving}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#0f2c4a] hover:bg-[#163e66] text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Save Teacher</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
