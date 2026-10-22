"use client";

import React from "react";
import { GraduationCap, Users, TrendingUp, Award, ChevronRight } from "lucide-react";

export function FeatureHighlights() {
  const highlights = [
    {
      title: "Expert Guidance",
      description: "Learn from experienced and dedicated teachers.",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      title: "Small Batches",
      description: "More attention, better results.",
      icon: Users,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      accent: "from-indigo-600 to-purple-600",
    },
    {
      title: "Regular Assessments",
      description: "Track progress and improve faster.",
      icon: TrendingUp,
      color: "text-sky-600 bg-sky-50 border-sky-200",
      accent: "from-sky-600 to-blue-600",
    },
    {
      title: "Better Results",
      description: "Building strong foundations for your future.",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      accent: "from-amber-600 to-orange-600",
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 mb-8 sm:mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl shadow-blue-950/20 border border-slate-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-center justify-between lg:justify-start gap-4 p-3 transition-transform hover:-translate-y-1 duration-200 ${
                    index !== 0 ? "pt-4 lg:pt-3 lg:pl-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${item.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile tap affordance arrow like in the screenshot's mobile preview */}
                  <ChevronRight className="w-5 h-5 text-slate-300 lg:hidden shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
