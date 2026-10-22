"use client";

import React from "react";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  UserCheck,
  Sparkles,
  BookOpen,
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
            
            {/* Background Chalkboard & Classroom Lighting Aura */}
            <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-[#121c2e] via-[#0f172a] to-[#090f1d] border border-slate-700/60 shadow-2xl shadow-blue-950/50 group">
              
              {/* Blackboard Glow & Script text in the corner */}
              <div className="absolute top-4 right-6 text-right select-none pointer-events-none">
                <div className="font-serif italic text-slate-400/40 text-xl sm:text-2xl tracking-wider leading-tight">
                  Learn <br />
                  <span className="text-blue-300/40">Grow</span> <br />
                  <span className="text-amber-200/50">Succeed</span>
                </div>
              </div>

              {/* Decorative Subtle Grid / Graph paper hint */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Composition Container */}
              <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
                
                {/* Book Stack */}
                <div className="w-full max-w-[340px] flex flex-col items-center space-y-2.5">
                  
                  {/* Book 1: Maths */}
                  <div className="w-full transform -rotate-1 hover:rotate-0 transition-transform duration-300 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-lg px-5 py-3 shadow-lg shadow-blue-900/40 border-l-8 border-l-amber-400 border-r border-t border-b border-blue-400/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-mono font-bold">
                        ∑
                      </div>
                      <span className="font-bold text-base tracking-wide uppercase text-white drop-shadow-sm">
                        Maths
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-100 bg-white/15 px-2 py-0.5 rounded">
                      Formulas & Practice
                    </span>
                  </div>

                  {/* Book 2: Science */}
                  <div className="w-[96%] transform rotate-1 hover:rotate-0 transition-transform duration-300 bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 text-white rounded-lg px-5 py-3 shadow-lg shadow-teal-950/50 border-l-8 border-l-emerald-300 border-r border-t border-b border-teal-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-mono font-bold">
                        ⚗️
                      </div>
                      <span className="font-bold text-base tracking-wide uppercase text-white drop-shadow-sm">
                        Science
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-teal-100 bg-white/15 px-2 py-0.5 rounded">
                      Physics • Chem • Bio
                    </span>
                  </div>

                  {/* Book 3: English */}
                  <div className="w-[98%] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-950 text-white rounded-lg px-5 py-3 shadow-lg shadow-indigo-950/60 border-l-8 border-l-indigo-400 border-r border-t border-b border-indigo-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-mono font-bold">
                        ✍️
                      </div>
                      <span className="font-bold text-base tracking-wide uppercase text-white drop-shadow-sm">
                        English
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-200 bg-white/15 px-2 py-0.5 rounded">
                      Grammar & Writing
                    </span>
                  </div>

                  {/* Book 4: Social Studies */}
                  <div className="w-full transform rotate-0.5 hover:rotate-0 transition-transform duration-300 bg-gradient-to-r from-amber-900 via-amber-800 to-stone-800 text-white rounded-lg px-5 py-3 shadow-xl shadow-stone-950/70 border-l-8 border-l-orange-400 border-r border-t border-b border-amber-600/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-mono font-bold">
                        🌍
                      </div>
                      <span className="font-bold text-base tracking-wide uppercase text-white drop-shadow-sm">
                        Social Studies
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-100 bg-white/15 px-2 py-0.5 rounded">
                      History • Civics • Geo
                    </span>
                  </div>

                </div>

                {/* Desk Base & Stationery Accessories representation */}
                <div className="w-full mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between px-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sm shadow">
                      ✏️
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">Daily Study Desk</div>
                      <div className="text-[10px] text-slate-400">Printed Notes & Tests</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/40 text-blue-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Koradi Center</span>
                  </div>
                </div>

              </div>

              {/* Floating Bottom Badge */}
              <div className="mt-3 bg-gradient-to-r from-blue-950/80 to-slate-900/90 border border-blue-500/20 rounded-2xl p-3 text-center shadow-lg">
                <span className="text-xs text-slate-300">
                  Admissions Open for <span className="font-bold text-white">2026-2027 Batches</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
