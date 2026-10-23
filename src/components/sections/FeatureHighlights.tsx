"use client";

import React from "react";
import { GraduationCap, Users, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";

export function FeatureHighlights() {
  const highlights = [
    {
      title: "Expert Guidance",
      description: "Direct mentorship by Akram Sir (10+ Yrs Exp).",
      icon: GraduationCap,
      color: "text-blue-400 bg-blue-950/60 border-blue-800/40",
    },
    {
      title: "Small Batches",
      description: "Strictly 15–18 students per batch. Zero anonymity.",
      icon: Users,
      color: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
    },
    {
      title: "Weekly Assessments",
      description: "Board-pattern Sunday mock tests with rank analysis.",
      icon: TrendingUp,
      color: "text-sky-400 bg-sky-950/60 border-sky-800/40",
    },
    {
      title: "Proven Results",
      description: "96.4% top board score & consistent 90%+ achievers.",
      icon: Award,
      color: "text-amber-400 bg-amber-950/60 border-amber-800/40",
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-800">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 ${
                    index !== 0 ? "pt-3 sm:pt-0 lg:pl-6" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.color} shadow-inner`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
