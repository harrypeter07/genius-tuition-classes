"use client";

import React, { useState } from "react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
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
    // Also save in DB asynchronously
    try {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {}

    const msg = `*Genius Tuition Classes - Admission Inquiry*
---------------------------------------
• Student Name: ${formData.studentName || "Prospective Student"}
• Parent Phone: ${formData.parentPhone || "Not specified"}
• Grade/Class: ${formData.grade}
• Subjects: ${formData.subjects}
• Preferred Batch: ${formData.batchPreference}
• Notes/Queries: ${formData.notes || "None"}
---------------------------------------
Please share details on available seats, batch timings, and demo classes.`;

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
    } catch (err: any) {
      setSubmitError("Network error. Please WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="default" className="text-blue-400 bg-blue-950/60 border-blue-500/30">
            Admissions Open
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Inquire for New Batches & Free Demo Class
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Seats are strictly capped at 15 to 18 students per batch. Submit your details below or connect directly with Akram Sir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-semibold uppercase text-blue-400 tracking-wider">
                  Contact Person
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  AKRAM SIR
                </h3>
                <p className="text-xs text-slate-400">
                  {INSTITUTE_DETAILS.roleTitle} • Genius Tuition Classes
                </p>
              </div>

              {/* Phone Action Card */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-blue-300 font-semibold uppercase">
                    Call Directly
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white">
                    {INSTITUTE_DETAILS.phone}
                  </div>
                </div>
                <a
                  href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                  className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-md shadow-blue-600/30 transition-transform active:scale-95"
                  aria-label="Call Akram Sir"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* WhatsApp Action Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-emerald-300 font-semibold uppercase">
                    Instant WhatsApp Chat
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    Get quick fee & schedule details
                  </div>
                </div>
                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
                  aria-label="Chat with Akram Sir on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              {/* Visiting Hours */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Class & Office Visiting Hours</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Morning Session:</span>
                    <span className="font-semibold">{INSTITUTE_DETAILS.visitingHours.morning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Evening Session:</span>
                    <span className="font-semibold">{INSTITUTE_DETAILS.visitingHours.evening}</span>
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

            </div>

          </div>

          {/* Right Column: Interactive Admission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Inquiry Received & Saved!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.studentName}</strong>. Your inquiry has been sent to Akram Sir and logged into our management system. We will contact you at <strong>{formData.parentPhone}</strong>.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <a
                      href={INSTITUTE_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsapp" size="md">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat on WhatsApp Now
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleDirectSubmit}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">
                      Send Admission Inquiry
                    </h3>
                    <span className="text-xs text-blue-400 font-medium">
                      Offline Batches • Koradi
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Student Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  {/* Parent Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Parent / Guardian Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      required
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  {/* Class and Preferred Batch in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Class / Grade *
                      </label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      >
                        <option value="Class 5th">Class 5th</option>
                        <option value="Class 6th">Class 6th</option>
                        <option value="Class 7th">Class 7th</option>
                        <option value="Class 8th">Class 8th</option>
                        <option value="Class 9th">Class 9th</option>
                        <option value="Class 10th (SSC / CBSE)">Class 10th (SSC / CBSE)</option>
                        <option value="Class 11th">Class 11th</option>
                        <option value="Class 12th">Class 12th</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Preferred Batch *
                      </label>
                      <select
                        name="batchPreference"
                        value={formData.batchPreference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      >
                        <option value="Evening Batch">Evening Batch (After School)</option>
                        <option value="Morning Batch">Morning Batch (Early Hours)</option>
                        <option value="Weekend / Doubt Special">Weekend Special</option>
                      </select>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Subjects Needed
                    </label>
                    <select
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="All Core Subjects (Maths, Science, English, Social)">
                        All Core Subjects (Maths, Science, English, Social)
                      </option>
                      <option value="Mathematics & Science Only">
                        Mathematics & Science Only
                      </option>
                      <option value="Mathematics Special">
                        Mathematics Special Focus
                      </option>
                      <option value="Science Special">
                        Science (Physics, Chem, Bio)
                      </option>
                    </select>
                  </div>

                  {/* Questions / Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Any questions or specific requirements?
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Current marks in school, preferred timings, looking for 2-day demo class..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Action Buttons: 2 buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full sm:flex-1 rounded-xl font-bold py-3.5"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Inquiry
                    </Button>

                    <Button
                      type="button"
                      variant="whatsapp"
                      size="lg"
                      onClick={handleWhatsAppSubmit}
                      className="w-full sm:flex-1 rounded-xl font-bold py-3.5"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    🔒 Logged securely into Akram Sir&apos;s admission system.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
