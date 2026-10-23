"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RESULTS_DATA, INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Star, Trophy, Quote, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

interface ResultsSectionProps {
  testimonials?: any[];
  settings?: Record<string, string>;
}

export function ResultsSection({ testimonials }: ResultsSectionProps = {}) {
  const items = testimonials && testimonials.length > 0 ? testimonials : RESULTS_DATA;

  const topperImages = [
    "/images/student-topper-1.jpg",
    "/images/student-topper-2.jpg",
    "/images/student-topper-3.jpg",
    "/images/student-topper-4.jpg",
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
            Proven Results &amp; Board Toppers
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
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-slate-700 transition-colors shadow-lg"
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

        {/* Student Testimonials Grid with Real Photos & Avatars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {items.map((item, idx) => {
            const avatarSrc = topperImages[idx % topperImages.length];
            return (
              <Card
                key={item.id || idx}
                className="border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="h-12 w-12 border border-slate-700">
                        <AvatarImage src={avatarSrc} alt={item.name} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <CardTitle className="text-base sm:text-lg text-white font-bold">
                          {item.name}
                        </CardTitle>
                        <div className="text-xs text-blue-400 font-medium">
                          {item.grade} • {item.school}
                        </div>
                      </div>
                    </div>

                    {/* Score Pill */}
                    <div className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-700 text-blue-300 font-black text-xs sm:text-sm shrink-0 shadow-sm">
                      {item.score}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative">
                    <Quote className="w-6 h-6 text-slate-700/60 absolute -top-2 -left-1" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic pl-5">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                    <span>Batch: {item.year}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified Offline Student
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View all testimonials CTA */}
        <div className="text-center">
          <Link href="/results">
            <Button variant="outline" className="font-semibold text-sm">
              <span>View Full Hall of Fame &amp; Student Scorecards</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
