"use client";

import { useState } from "react";
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
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Loader2,
  UserPlus,
  HeartHandshake,
  Check,
} from "lucide-react";
import { CreateParentDto, AssignStudentDto, ParentRelationType } from "@/src/types/parent";
import { Student } from "@/src/types/student";

interface AddParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    parentData: CreateParentDto,
    studentAssignData?: AssignStudentDto
  ) => Promise<void>;
  availableStudents?: Student[];
}

export function AddParentModal({
  isOpen,
  onClose,
  onAdd,
  availableStudents = [],
}: AddParentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Optional Student Assignment
  const [enableStudentLink, setEnableStudentLink] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [relation, setRelation] = useState<ParentRelationType>("FATHER");
  const [isPrimary, setIsPrimary] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setEnableStudentLink(false);
    setSelectedStudentId("");
    setRelation("FATHER");
    setIsPrimary(true);
    setError(null);
  };

  const handleClose = () => {
    if (!isSaving) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter the parent/guardian full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter a valid contact phone number.");
      return;
    }

    if (enableStudentLink && !selectedStudentId) {
      setError("Please select a student to link or disable the student link.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const parentPayload: CreateParentDto = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() ? email.trim() : undefined,
        address: address.trim() ? address.trim() : undefined,
      };

      const studentAssignPayload: AssignStudentDto | undefined =
        enableStudentLink && selectedStudentId
          ? {
              studentId: selectedStudentId,
              relation,
              isPrimary,
            }
          : undefined;

      await onAdd(parentPayload, studentAssignPayload);
      resetForm();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create parent. Please check connection and try again."
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
                Add New Parent / Guardian
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Register parent contact and optionally link to an enrolled student.
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

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              Full Name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. Rafiqul Islam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all font-medium"
              required
            />
          </div>

          {/* 2. Phone & Email (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="e.g. 01712345678"
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
                placeholder="e.g. parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* 3. Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              Residential Address
            </label>
            <Input
              type="text"
              placeholder="e.g. House 12, Road 4, Dhanmondi, Dhaka"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-10 text-sm rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          {/* 4. Link Enrolled Student Accordion / Toggle */}
          <div className="pt-2">
            <div
              onClick={() => setEnableStudentLink(!enableStudentLink)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Link to an Enrolled Student
                </span>
              </div>
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                  enableStudentLink
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {enableStudentLink && <Check className="h-3 w-3" />}
              </div>
            </div>

            {enableStudentLink && (
              <div className="mt-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3.5">
                {/* Select Student */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                    Select Student <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                    required={enableStudentLink}
                  >
                    <option value="">-- Choose a Student --</option>
                    {availableStudents.map((stu) => (
                      <option key={stu.id} value={stu.id}>
                        {stu.name} ({stu.studentId} · {stu.class?.name || "No Class"})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Relation & IsPrimary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Relation
                    </label>
                    <select
                      value={relation}
                      onChange={(e) => setRelation(e.target.value as ParentRelationType)}
                      className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
                    >
                      <option value="FATHER">Father</option>
                      <option value="MOTHER">Mother</option>
                      <option value="GUARDIAN">Guardian</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isPrimaryCheck"
                      checked={isPrimary}
                      onChange={(e) => setIsPrimary(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor="isPrimaryCheck"
                      className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                    >
                      Primary Guardian
                    </label>
                  </div>
                </div>
              </div>
            )}
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
                  <span>Save Parent</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
