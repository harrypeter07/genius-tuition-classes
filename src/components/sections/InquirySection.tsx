"use client";

import React, { useState } from "react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function InquirySection() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentPhone: "",
    grade: "Class 10th",
    subjects: "Maths & Science",
    batchPreference: "Evening Batch",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {}

    const msg = `*Genius Tuition Classes - Admission Inquiry*
---------------------------------------
• Student Name: ${formData.studentName || "Prospective Student"}
• Parent Phone: ${formData.parentPhone || "Not specified"}
• Grade/Class: ${formData.grade}
• Subjects: ${formData.subjects}
• Preferred Batch: ${formData.batchPreference}
• Notes/Queries: ${formData.notes || "None"}
---------------------------------------
Please share batch timings, seat availability, and 2-day demo class schedule.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${INSTITUTE_DETAILS.phoneRaw}?text=${encoded}`, "_blank");
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(json.error || "Failed to submit. Please call or WhatsApp directly.");
      }
    } catch {
      setSubmitError("Network error. Please WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 relative bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
            Admissions Open 2025–26
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Inquire for New Batches &amp; Free Demo Class
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Seats are strictly capped at 15 to 18 students per batch. Submit your details below or connect directly with Akram Sir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <Card className="p-6 sm:p-7 bg-slate-900 border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-semibold uppercase text-blue-400 tracking-wider">
                  Contact Person &amp; Director
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  AKRAM SIR
                </h3>
                <p className="text-xs text-slate-400">
                  {INSTITUTE_DETAILS.roleTitle} • Genius Tuition Classes
                </p>
              </div>

              {/* Phone Action Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-blue-400 font-semibold uppercase">
                    Call Directly
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">
                    {INSTITUTE_DETAILS.phone}
                  </div>
                </div>
                <a
                  href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                  className="p-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white shadow-md transition-transform active:scale-95"
                  aria-label="Call Akram Sir"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* WhatsApp Action Card */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-emerald-400 font-semibold uppercase">
                    Instant WhatsApp Chat
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200">
                    Get quick fee &amp; schedule details
                  </div>
                </div>
                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white shadow-md transition-transform active:scale-95"
                  aria-label="Chat with Akram Sir on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              {/* Visiting Hours */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Class &amp; Center Visiting Hours</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Morning Session:</span>
                    <span className="font-semibold text-white">{INSTITUTE_DETAILS.visitingHours.morning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Evening Session:</span>
                    <span className="font-semibold text-white">{INSTITUTE_DETAILS.visitingHours.evening}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    {INSTITUTE_DETAILS.visitingHours.days}
                  </div>
                </div>
              </div>

              {/* Location details */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Tuition Center Location</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {INSTITUTE_DETAILS.address}
                </p>
              </div>

            </Card>

          </div>

          {/* Right Column: Interactive Admission Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-slate-900 border-slate-800 shadow-xl relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Inquiry Received &amp; Saved!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.studentName}</strong>. Your inquiry has been sent to Akram Sir and logged into our management system. We will contact you at <strong>{formData.parentPhone}</strong>.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <a
                      href={INSTITUTE_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsapp">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat on WhatsApp Now
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleDirectSubmit}>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white">
                      Send Admission Inquiry
                    </h3>
                    <span className="text-xs text-blue-400 font-medium">
                      Offline Batches • Koradi
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Student Full Name *
                    </label>
                    <Input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  {/* Parent Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Parent / Guardian Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      name="parentPhone"
                      required
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  {/* Class and Preferred Batch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Class / Grade *
                      </label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <option value="Class 5th - 8th Foundation">Class 5th - 8th Foundation</option>
                        <option value="Class 9th Pre-Board">Class 9th Pre-Board</option>
                        <option value="Class 10th SSC / CBSE">Class 10th SSC / CBSE</option>
                        <option value="Class 11th - 12th Senior">Class 11th - 12th Senior</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Batch Preference
                      </label>
                      <select
                        name="batchPreference"
                        value={formData.batchPreference}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <option value="Evening Batch">Evening Batch (4:30 PM - 7:30 PM)</option>
                        <option value="Morning Batch">Morning Batch (6:45 AM - 8:45 AM)</option>
                        <option value="Weekend Batch">Weekend Intensive</option>
                      </select>
                    </div>
                  </div>

                  {/* Message/Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Message / Questions / School Name
                    </label>
                    <Textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Looking for Mathematics & Science coaching for 10th boards..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      variant="default"
                      isLoading={isSubmitting}
                      className="w-full sm:flex-1 font-bold h-11"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Submit Inquiry</span>
                    </Button>

                    <Button
                      type="button"
                      variant="whatsapp"
                      onClick={handleWhatsAppSubmit}
                      className="w-full sm:w-auto h-11"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>Send via WhatsApp</span>
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
