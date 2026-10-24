"use client";

import React from "react";
import Link from "next/link";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  Building,
  ArrowRight,
} from "lucide-react";

export function ResultsSection() {
  const academicPillars = [
    {
      title: "12+ Simulated Board Prelims",
      description: "Students write full-length, timed mock board exams before the real board examinations to eliminate stress and build time management.",
      icon: FileCheck,
      stat: "12 Prelims",
    },
    {
      title: "Step-by-Step Board Paper Presentation",
      description: "Trained on exact state board and CBSE answer evaluation guidelines so students never lose marks on presentation or formula derivations.",
      icon: Award,
      stat: "Examiner Standards",
    },
    {
      title: "10-Year Question Bank Coverage",
      description: "Thorough revision of every question type, numerical variant, and theorem tested in past board examinations.",
      icon: BookOpen,
      stat: "100% Syllabus",
    },
    {
      title: "1-on-1 Daily Doubt Clinic",
      description: "Akram Sir personally clears every single calculation hurdle and weak-area concept so no child falls behind.",
      icon: ShieldCheck,
      stat: "Zero Doubts Left",
    },
  ];

  return (
    <section id="results" className="py-20 md:py-24 relative bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="accent" className="text-amber-300 bg-amber-950/80 border-amber-500/40">
            Real Academic Growth
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Proven Academic Results &amp; Board Focus
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Consistent 90%+ scores and remarkable score improvements in School and Board Examinations across Koradi and Nagpur.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {INSTITUTE_DETAILS.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars of Academic Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {academicPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-all duration-300 shadow-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base sm:text-lg">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-600/30 px-2.5 py-0.5 rounded-full">
                        {pillar.stat}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Authentic Center Verification Notice */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Genuine &amp; Verifiable Track Record</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Want to see previous year marksheets and board answer copies?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              We respect our students&apos; privacy and do not display personal photos or phone numbers online. Authentic scorecards, board topper certificates, and parent contact references are available for review in person at our Koradi center.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/results">
              <Button variant="outline" className="text-xs sm:text-sm">
                <span>View Results Methodology</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="default" className="text-xs sm:text-sm font-bold shadow-lg">
                <span>Visit Center</span>
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
