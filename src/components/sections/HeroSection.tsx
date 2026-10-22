"use client";

import React from "react";
import Image from "next/image";
import {
  MessageCircle,
  ArrowRight,
  UserCheck,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#060b17] via-[#091224] to-[#0d1830]"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#060b17] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Pill Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Better Learning <span className="text-blue-400">•</span> Brighter Future
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Genius <br />
                <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent">
                  Tuition Classes
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed">
              Quality education. Personal attention. Real progress.
            </p>

            {/* Guidance by Akram Sir Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/70 shadow-inner">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Guidance by <span className="text-blue-400 font-bold">Akram Sir</span>
              </span>
              <span className="hidden sm:inline-block text-xs bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded-md border border-blue-800/40">
                10+ Yrs Exp
              </span>
            </div>

            {/* Offline Coaching Location Callout */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Offline Classroom Coaching in <strong className="text-slate-200">Koradi, Nagpur</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-7 py-3.5 font-semibold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 text-base border border-blue-400/40 transition-all hover:scale-102"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Call / WhatsApp</span>
                </Button>
              </a>

              <a href="#classes" className="w-full sm:w-auto">
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3.5 font-medium text-slate-200 hover:text-white border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/80 flex items-center justify-center gap-2 text-base transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Button>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/60 w-full max-w-lg">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>100% Offline Focus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Max 15-18 per batch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Weekly Tests</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: Authentic Study Desk & Book Stack Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-blue-900/40 via-slate-900/60 to-slate-950 border border-slate-700/80 shadow-2xl shadow-blue-950/70 group">
              
              {/* Authentic Photo from image generation matching reference */}
              <div className="relative w-full h-[340px] sm:h-[400px] rounded-[22px] overflow-hidden">
                <Image
                  src="/images/hero-study-desk.jpg"
                  alt="Genius Tuition Classes study desk with Maths, Science, English and Social Studies textbooks"
                  fill
                  priority
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-black/20" />

                {/* Floating pill badges on the image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-lg">
                    📚 Complete Study Materials
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">Daily Offline Batches</div>
                    <div className="text-[11px] text-slate-400">Koradi Center, Nagpur</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] shadow-sm">
                    Admissions Open
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
