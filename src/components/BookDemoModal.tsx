"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle2, Phone, Sparkles, MessageCircle } from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export function BookDemoModal({
  isOpen,
  onClose,
  prefilledGrade,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefilledGrade?: string;
}) {
  const [formData, setFormData] = useState({
    studentName: "",
    parentPhone: "",
    grade: prefilledGrade || "Class 10th",
    schoolName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: formData.studentName,
          phone: formData.parentPhone,
          grade: formData.grade,
          message: `Free 2-Day Demo Class Request. School: ${formData.schoolName || "Not specified"}`,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        // Fallback to WhatsApp
        window.open(
          `https://wa.me/${INSTITUTE_DETAILS.phoneRaw}?text=Hello%20Akram%20Sir%2C%20I%20would%20like%20to%20book%20a%20Free%202-Day%20Demo%20Class%20for%20${encodeURIComponent(
            formData.studentName
          )}%20(${encodeURIComponent(formData.grade)}).%20Phone:%20${encodeURIComponent(
            formData.parentPhone
          )}`,
          "_blank"
        );
        setIsSuccess(true);
      }
    } catch {
      window.open(
        `https://wa.me/${INSTITUTE_DETAILS.phoneRaw}?text=Hello%20Akram%20Sir%2C%20I%20would%20like%20to%20book%20a%20Free%202-Day%20Demo%20Class%20for%20${encodeURIComponent(
          formData.studentName
        )}%20(${encodeURIComponent(formData.grade)}).%20Phone:%20${encodeURIComponent(
          formData.parentPhone
        )}`,
        "_blank"
      );
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            100% Free • No Obligation
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            Book a Free 2-Day Demo Class
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Experience Akram Sir&apos;s personal coaching in our Koradi classroom before taking admission.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Demo Seat Reserved!</h3>
              <p className="text-sm text-slate-300 mt-1">
                Akram Sir will call or WhatsApp you on <strong>{formData.parentPhone}</strong> with the batch schedule and center directions.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Student Full Name *</label>
              <Input
                required
                placeholder="e.g. Aryan Sharma"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Parent / Student Mobile Number *
              </label>
              <Input
                required
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Current Class *</label>
                <select
                  className="flex h-10 w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option value="Class 5th - 8th">Class 5th - 8th</option>
                  <option value="Class 9th">Class 9th</option>
                  <option value="Class 10th">Class 10th (SSC / CBSE)</option>
                  <option value="Class 11th - 12th">Class 11th - 12th</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">School / Board</label>
                <Input
                  placeholder="e.g. DPS / State Board"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                type="submit"
                variant="default"
                isLoading={isSubmitting}
                className="w-full h-11 text-base font-bold shadow-lg shadow-blue-600/30"
              >
                Confirm Free Demo Class
              </Button>

              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Or message directly on WhatsApp (+91 91756 91457)</span>
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
