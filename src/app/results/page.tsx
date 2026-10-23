import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { getDbTestimonials, getDbSettings } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Award,
  Star,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "Board Results & Toppers | Genius Tuition Classes Koradi Nagpur",
  description:
    "See proven board exam results, student scorecards, and testimonials from Genius Tuition Classes in Koradi, Nagpur.",
};

export default async function ResultsPage() {
  const [testimonials, settings] = await Promise.all([
    getDbTestimonials(),
    getDbSettings(),
  ]);

  const scoreHighlights = [
    { student: "Rohan M.", grade: "Class 10th Board", score: "96.4%", subject: "Maths 99/100, Science 97/100", school: "Koradi School, Nagpur" },
    { student: "Ananya Deshmukh", grade: "Class 10th SSC", score: "94.8%", subject: "Maths 98/100", school: "Nagpur District School" },
    { student: "Ayush Verma", grade: "Class 9th", score: "89.2%", subject: "Jumped from 62% in 8th", school: "Nagpur Public School" },
    { student: "Sameer Sheikh", grade: "Class 8th Foundation", score: "School Rank 1", subject: "Science 98/100", school: "Koradi Central" },
    { student: "Pooja Patil", grade: "Class 10th Board", score: "93.6%", subject: "Maths 95/100", school: "Nagpur City School" },
    { student: "Faizan Khan", grade: "Class 9th", score: "91.0%", subject: "Science 96/100", school: "Koradi High School" },
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
                  Proven Results &amp; Hall of Fame
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Real marks earned through genuine classroom teaching, weekly board tests, and dedicated mentorship by <strong>Akram Sir</strong>.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-blue-400">96.4%</div>
                    <div className="text-[11px] text-slate-400">Top Board Score</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-emerald-400">850+</div>
                    <div className="text-[11px] text-slate-400">Students Guided</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-amber-400">100%</div>
                    <div className="text-[11px] text-slate-400">Board Pass Rate</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <Image
                    src="/images/students-learning.jpg"
                    alt="Students studying happily at Genius Tuition Classes"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="font-bold text-white">Consistent High Scorers in Koradi</div>
                    <div className="text-[11px] text-slate-400">State Board (SSC) &amp; CBSE board achievers</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Results Section with Testimonials */}
        <ResultsSection testimonials={testimonials} settings={settings} />

        {/* Board Toppers Scorecard Matrix */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Scorecard Archive
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Recent Board Exam Scorers
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Verified scores of students who prepared through our daily offline coaching in Koradi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scoreHighlights.map((topper, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-md border border-blue-900">
                      {topper.grade}
                    </span>
                    <span className="text-lg font-black text-amber-400">
                      {topper.score}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{topper.student}</h3>
                    <p className="text-xs text-slate-400">{topper.school}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{topper.subject}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center pt-10">
              <Link href="/contact">
                <Button variant="default" size="lg" className="font-bold">
                  <span>Aim for 90%+ in Boards? Book Your Free Demo Seat</span>
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
