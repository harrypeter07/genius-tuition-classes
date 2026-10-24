"use client";

import React from "react";
import { GraduationCap, Users, TrendingUp, Star, ChevronRight } from "lucide-react";

export function FeatureHighlights() {
  const highlights = [
    {
      title: "Expert Guidance",
      description: "Learn from experienced and dedicated teachers.",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Small Batches",
      description: "More attention, better results.",
      icon: Users,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Regular Assessments",
      description: "Track progress and improve faster.",
      icon: TrendingUp,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
    {
      title: "Better Results",
      description: "Building strong foundations for your future.",
      icon: Star,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  return (
    <section className="relative z-20 -mt-4 sm:-mt-8 mb-8 sm:mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop View: Horizontal 4-Column Bar matching Mockup */}
        <div className="hidden lg:block bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-100 p-6 lg:p-8">
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 ${index !== 0 ? "pl-6" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${item.color} shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View: Vertical List matching Mockup Mobile Preview with Chevrons */}
        <div className="lg:hidden bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5">
          <div className="divide-y divide-slate-100">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
