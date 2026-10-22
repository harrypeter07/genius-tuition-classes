"use client";

import React from "react";
import { RESULTS_DATA, INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, Trophy, Quote, CheckCircle, TrendingUp } from "lucide-react";

export function ResultsSection() {
  return (
    <section id="results" className="py-20 md:py-28 relative bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="accent" className="text-amber-300 bg-amber-950/60 border-amber-500/30">
            Real Academic Growth
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Proven Results & Success Stories
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Consistent 90%+ scores and remarkable score improvements in School and Board Examinations across Koradi and Nagpur.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {INSTITUTE_DETAILS.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-blue-500/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black text-white bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Student Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESULTS_DATA.map((item) => (
            <Card
              key={item.id}
              className="border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg text-white font-bold">
                      {item.name}
                    </CardTitle>
                    <div className="text-xs text-blue-400 font-medium">
                      {item.grade} • {item.school}
                    </div>
                  </div>

                  {/* Score Pill */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-300 font-black text-sm shrink-0 shadow-sm">
                    {item.score}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="relative">
                  <Quote className="w-8 h-8 text-slate-700/50 absolute -top-3 -left-2 -z-0" />
                  <p className="text-sm sm:text-base text-slate-300 relative z-10 leading-relaxed italic pl-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-500">
                  <span>Batch: {item.year}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Offline Student
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm max-w-2xl mx-auto">
          Every testimonial is from a real student or parent who attended offline classes in Koradi, Nagpur with Akram Sir.
        </div>

      </div>
    </section>
  );
}
