"use client";

import React from "react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Badge } from "../ui/badge";
import {
  ShieldCheck,
  CheckCircle2,
  Eye,
  PenTool,
  Clock,
  Sparkles,
  Award,
  Users2,
  HeartHandshake,
} from "lucide-react";

export function AboutSection() {
  const offlineBenefits = [
    {
      title: "100% Focused Offline Environment",
      desc: "No mobile screen fatigue, no app notifications. Just pure, undistracted face-to-face learning with experienced teachers.",
      icon: Eye,
    },
    {
      title: "Immediate Notebook & Step Correction",
      desc: "Akram Sir personally walks around the classroom to inspect your steps in Maths and Science derivations on the spot.",
      icon: PenTool,
    },
    {
      title: "Regular Sunday Physical Tests",
      desc: "Simulated exam conditions that build speed, handwriting neatness, and eradicate board exam anxiety.",
      icon: Clock,
    },
    {
      title: "Transparent Parent Communication",
      desc: "Direct access to Akram Sir on WhatsApp and during monthly Parent-Teacher meetings to review test sheets.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#091122]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Vision */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="default" className="text-blue-400 bg-blue-950/60 border-blue-500/30">
              Why Choose Genius Tuition Classes
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Why Offline Coaching with <br />
              <span className="text-blue-400">Akram Sir</span> Still Wins
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              In a world flooded with online video lectures where students easily zone out, <strong>Genius Tuition Classes</strong> provides the irreplaceable value of a disciplined, physical classroom in <strong>Koradi, Nagpur</strong>.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Founded and spearheaded by <strong>Akram Sir</strong>, our coaching philosophy focuses on small batches, zero backbench anonymity, and individual student care. We believe high marks are not born from cramming, but from clarity of basic principles and continuous practice.
            </p>

            {/* Quick points list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Safe and easily accessible location in Koradi, Nagpur</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Individual attention guaranteed with strict batch size caps</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Specially designed simplified formula notes and question banks</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
                  10+
                </div>
                <div>
                  <div className="font-bold text-white text-base">Years in Koradi</div>
                  <div className="text-xs text-slate-400">Trusted by local parents & schools</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Offline Advantages Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offlineBenefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 space-y-3 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
