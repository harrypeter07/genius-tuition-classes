import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { InquirySection } from "@/components/sections/InquirySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "Contact & Admissions | Genius Tuition Classes Koradi Nagpur",
  description:
    "Contact Akram Sir at Genius Tuition Classes in Koradi, Nagpur. Book a free 2-day demo class or visit our offline classroom center.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero Header */}
        <section className="relative py-16 md:py-20 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Koradi, Nagpur, Maharashtra
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Contact &amp; Visit Our Center
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                We welcome parents and students to visit our offline classrooms, meet <strong>Akram Sir</strong>, and schedule a <strong>Free 2-Day Demo Class</strong>.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Akram Sir ({INSTITUTE_DETAILS.phone})</span>
                </a>

                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Inquiry Form Section */}
        <InquirySection />

        {/* Center Location Map & Address Details */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Center Directions
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                How to Reach Genius Tuition Classes
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Conveniently located near the Koradi Devi Temple Road in Koradi, Nagpur.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Address & Timings Summary */}
              <div className="lg:col-span-5 space-y-4">
                <Card className="bg-slate-900 border-slate-800 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <span>Physical Address</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {INSTITUTE_DETAILS.address}
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                    <div><strong>Landmark:</strong> Near Koradi Power Station Colony / Koradi Devi Temple Road</div>
                    <div><strong>Area:</strong> Koradi, Nagpur, Maharashtra - 441111</div>
                  </div>
                </Card>

                <Card className="bg-slate-900 border-slate-800 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>Office Visiting Hours</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Morning Session:</span>
                      <span className="font-semibold text-white">{INSTITUTE_DETAILS.visitingHours.morning}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Evening Session:</span>
                      <span className="font-semibold text-white">{INSTITUTE_DETAILS.visitingHours.evening}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      {INSTITUTE_DETAILS.visitingHours.days}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Google Maps Embed for Koradi, Nagpur */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 h-[360px] sm:h-[400px] relative">
                  <iframe
                    title="Genius Tuition Classes Koradi Nagpur Map"
                    src="https://maps.google.com/maps?q=Koradi%2C%20Nagpur%2C%20Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
                    <span className="font-semibold text-white">Koradi, Nagpur</span> • Near Koradi Devi Temple Road
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQs */}
        <FaqSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
