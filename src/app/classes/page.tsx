import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getDbClasses, getDbSettings } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "Tuition Classes & Batches | Genius Tuition Classes Koradi",
  description:
    "Explore coaching batches for Class 5th to 12th in Koradi, Nagpur. Small batches of 15-18 students, weekly tests, personal attention by Akram Sir.",
};

export default async function ClassesPage() {
  const [classes, settings] = await Promise.all([getDbClasses(), getDbSettings()]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero Header */}
        <section className="relative py-16 md:py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  Offline Coaching Batches • Koradi, Nagpur
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Academic Classes &amp; Curriculum
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Tailored offline batches for <strong>Classes 5th to 12th</strong> designed around Maharashtra State Board and CBSE curriculum. Strictly capped at 15–18 students per batch.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Max 15–18 Students</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Weekly Board Tests</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>100% Board Syllabus</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <Image
                    src="/images/hero-study-desk.jpg"
                    alt="Study desk textbooks and notes at Genius Tuition Classes"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="font-bold text-white">Full Study Kit &amp; Question Banks</div>
                    <div className="text-[11px] text-slate-400">Included with all admissions at Koradi Center</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Classes Section with Filter Tabs */}
        <ClassesSection classes={classes} settings={settings} />

        {/* Batch Timing Matrix */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Weekly Schedule
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Daily Batch Timings &amp; Routine
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Disciplined daily schedules designed so students balance school, homework, and self-study effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-slate-800 p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Morning Batches</h3>
                  <p className="text-xs text-slate-400">Ideal for early risers &amp; evening sports students</p>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Class 10th Target:</span>
                    <span className="font-mono text-blue-400">6:45 AM - 8:45 AM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Class 9th Pre-Board:</span>
                    <span className="font-mono text-blue-400">7:00 AM - 9:00 AM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-white">Senior Secondary:</span>
                    <span className="font-mono text-blue-400">Flexible Slots</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-900 border-slate-800 p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Evening Batches</h3>
                  <p className="text-xs text-slate-400">Most popular after regular school dismissal</p>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Class 5th - 8th:</span>
                    <span className="font-mono text-emerald-400">4:30 PM - 6:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Class 9th:</span>
                    <span className="font-mono text-emerald-400">5:30 PM - 7:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-white">Class 10th Masterclass:</span>
                    <span className="font-mono text-emerald-400">6:00 PM - 8:00 PM</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-900 border-slate-800 p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sunday Test Series</h3>
                  <p className="text-xs text-slate-400">Simulated board examinations &amp; doubt clearing</p>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Mock Exam Test:</span>
                    <span className="font-mono text-amber-400">9:00 AM - 11:30 AM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="font-semibold text-white">Doubt Clinic:</span>
                    <span className="font-mono text-amber-400">11:30 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-white">Parent Briefing:</span>
                    <span className="font-mono text-amber-400">By Appointment</span>
                  </div>
                </div>
              </Card>
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
