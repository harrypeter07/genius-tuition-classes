import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Award,
  CheckCircle2,
  TrendingUp,
  FileText,
  Calendar,
  Building,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "Board Results & Academic Record | Akram's Genius Academy Koradi Nagpur",
  description:
    "See verified board preparation benchmarks, testing methodology, and offline coaching standards at Akram's Genius Academy in Koradi, Nagpur.",
};

export default function ResultsPage() {
  const preparationMilestones = [
    {
      stage: "Stage 01: Concept Mastery & Daily Homework",
      timing: "April – September",
      focus: "Comprehensive syllabus breakdown from grassroots fundamentals. Daily step-by-step notebook correction and formula derivation drills.",
      outcome: "Zero textbook backlog and 100% clarity in Maths & Science core theorems.",
    },
    {
      stage: "Stage 02: Chapter-Wise Rigorous Unit Tests",
      timing: "October – November",
      focus: "Every weekend timed unit tests modeled strictly on Maharashtra State Board and CBSE marking schemes.",
      outcome: "Weak-area identification and immediate 1-on-1 rectification with Akram Sir.",
    },
    {
      stage: "Stage 03: Full-Length Simulated Board Prelims",
      timing: "December – January",
      focus: "Minimum 12 full-syllabus prelim examinations under strict exam hall conditions with authentic answer booklets.",
      outcome: "Eradication of exam anxiety, refined presentation, and guaranteed speed.",
    },
    {
      stage: "Stage 04: Last-Mile Board Revision & Formula Drills",
      timing: "February – Board Exams",
      focus: "High-probability question banks, previous 10-year board paper solutions, and personalized answer sheet evaluation.",
      outcome: "Peak exam readiness aiming for 90%+ in state and CBSE board examinations.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero Header */}
        <section className="relative py-16 md:py-20 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  Academic Excellence &bull; Koradi, Nagpur
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Academic Track Record &amp; Board Methodology
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Real marks are not built through fake claims or online gimmicks—they are earned through disciplined classroom teaching, weekly physical tests, and dedicated mentorship by <strong>Akram Sir</strong>.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-blue-400">10+</div>
                    <div className="text-[11px] text-slate-400">Years in Koradi</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-emerald-400">850+</div>
                    <div className="text-[11px] text-slate-400">Students Guided</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-amber-400">100%</div>
                    <div className="text-[11px] text-slate-400">Board Pass Record</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <Image
                    src="/images/math-notes.jpg"
                    alt="Authentic handwritten formula practice and exam notes"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="font-bold text-white">Systematic Board Exam Preparation</div>
                    <div className="text-[11px] text-slate-400">Rigorous handwritten answer practice &amp; step-by-step grading</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Results Section Core */}
        <ResultsSection />

        {/* 4-Stage Preparation Methodology */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Roadmap to 90%+
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Our 4-Stage Board Preparation System
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                A proven year-round academic blueprint tested and refined over a decade of board coaching in Koradi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preparationMilestones.map((item, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-900 px-3 py-1 rounded-md">
                      {item.timing}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base sm:text-lg pt-1">
                    {item.stage}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.focus}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.outcome}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center pt-10">
              <Link href="/contact">
                <Button variant="default" size="lg" className="font-bold">
                  <span>Schedule Free Counseling &amp; Center Visit</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
