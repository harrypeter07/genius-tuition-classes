"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { BookDemoModal } from "../BookDemoModal";

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-950 border-b border-slate-800/80"
      >
        {/* Subtle background grid pattern - authentic, not neon ai blobs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Authentic Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Admissions Open 2025–26</span>
                <span className="text-slate-600">•</span>
                <span className="text-blue-400">Koradi, Nagpur</span>
              </div>

              {/* Main Headline - Natural, High Trust */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Where Every Student Matters &amp;{" "}
                  <span className="text-blue-500">Marks Follow Understanding</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
                  Premier <strong>offline classroom coaching</strong> for Classes 5th to 12th under the dedicated personal guidance of <strong>Akram Sir</strong>. We strictly cap batches at 15–18 students so no child gets lost in the crowd.
                </p>
              </div>

              {/* Key Trust Signals Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl pt-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Max 15–18 per Batch</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Weekly Sunday Tests</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Daily Doubt Clearing</span>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-2">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setDemoOpen(true)}
                  className="w-full sm:w-auto shadow-lg shadow-blue-600/30 text-base"
                >
                  <Sparkles className="w-4 h-4 mr-1 text-amber-300" />
                  <span>Book Free 2-Day Demo</span>
                </Button>

                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto text-base"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>WhatsApp Akram Sir</span>
                  </Button>
                </a>

                <Link href="/classes" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base"
                  >
                    <span>View Batches</span>
                    <ArrowRight className="w-4 h-4 ml-1 text-slate-400" />
                  </Button>
                </Link>
              </div>

              {/* Offline Location & Contact Banner */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80 w-full max-w-xl">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Near Koradi Devi Temple Road, Nagpur</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`tel:${INSTITUTE_DETAILS.phoneRaw}`} className="text-slate-300 hover:text-white font-mono">
                    +91 91756 91457
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Real Classroom Photography & Authentic Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/90 shadow-2xl bg-slate-900 group">
                
                {/* Main Real Educational Photo */}
                <div className="relative w-full h-[380px] sm:h-[430px]">
                  <Image
                    src="/images/hero-classroom.jpg"
                    alt="Authentic offline coaching classroom at Genius Tuition Classes Koradi Nagpur"
                    fill
                    priority
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Natural subtle gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Metric 1: Board Score */}
                  <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">96.4% Top Score</div>
                        <div className="text-[10px] text-slate-400">Class 10th Board 2024</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Metric 2: Mentor Badge */}
                  <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-xl text-right">
                    <div className="text-[11px] font-bold text-amber-300">10+ Years Trust</div>
                    <div className="text-[10px] text-slate-400">Akram Sir Mentorship</div>
                  </div>

                  {/* Bottom Strip: Real Highlights */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-xl p-3 text-xs shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">Small Batch Guarantee</div>
                          <div className="text-[11px] text-slate-400">Strictly 15–18 students per class</div>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5">
                        Admissions Open
                      </Badge>
                    </div>
                  </div>

                </div>

              </div>

              {/* Mini thumbnails strip highlighting study environment */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                <div className="relative h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image
                    src="/images/offline-classroom.jpg"
                    alt="Classroom study desks"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-1.5">
                    <span className="text-[10px] font-semibold text-white drop-shadow">Classroom</span>
                  </div>
                </div>

                <div className="relative h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image
                    src="/images/math-notes.jpg"
                    alt="Handwritten math notes and practice"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-1.5">
                    <span className="text-[10px] font-semibold text-white drop-shadow">Formula Notes</span>
                  </div>
                </div>

                <div className="relative h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image
                    src="/images/doubt-session.jpg"
                    alt="1-on-1 teacher doubt session"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-1.5">
                    <span className="text-[10px] font-semibold text-white drop-shadow">1-on-1 Doubts</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Demo Class Modal */}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
