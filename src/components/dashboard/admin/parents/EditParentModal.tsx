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
import { User, Phone, Mail, MapPin, Loader2, Edit3 } from "lucide-react";
import { Parent, UpdateParentDto } from "@/src/types/parent";

interface EditParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  onUpdate: (id: string, parentData: UpdateParentDto) => Promise<void>;
}

export function EditParentModal({
  isOpen,
  onClose,
  parent,
  onUpdate,
}: EditParentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (parent && isOpen) {
      setName(parent.name || "");
      setPhone(parent.phone || "");
      setEmail(parent.email || "");
      setAddress(parent.address || "");
      setError(null);
    }
  }, [parent, isOpen]);

  const handleClose = () => {
    if (!isSaving) {
      setError(null);
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parent) return;

    if (!name.trim()) {
      setError("Please enter the parent/guardian full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter a valid contact phone number.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const payload: UpdateParentDto = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() ? email.trim() : undefined,
        address: address.trim() ? address.trim() : undefined,
      };

      await onUpdate(parent.id, payload);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update parent. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300 backdrop-blur-md border border-white/10">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Edit Parent Information
              </DialogTitle>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Update guardian profile and contact details.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          {/* 2. Phone & Email */}
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
                  <span>Saving changes...</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Update Parent</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
