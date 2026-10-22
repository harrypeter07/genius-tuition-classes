"use client";

import React, { useState } from "react";
import { CLASSES_DATA, INSTITUTE_DETAILS, ClassBatch } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, BookOpen, Check, ArrowRight, MessageCircle } from "lucide-react";

export function ClassesSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Batches" },
    { id: "foundation", label: "Class 5th - 8th (Foundation)" },
    { id: "boards", label: "Class 9th & 10th (Boards)" },
    { id: "senior", label: "Class 11th & 12th (Senior)" },
  ];

  const filteredBatches =
    activeTab === "all"
      ? CLASSES_DATA
      : CLASSES_DATA.filter((item) => item.category === activeTab);

  const getInquiryUrl = (batchName: string) => {
    const text = encodeURIComponent(
      `Hello Akram Sir, I am interested in admission for *${batchName}* at Genius Tuition Classes, Koradi. Please share details on fees, timings, and upcoming batch seats.`
    );
    return `https://wa.me/${INSTITUTE_DETAILS.phoneRaw}?text=${text}`;
  };

  return (
    <section id="classes" className="py-20 md:py-28 relative bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="default" className="text-blue-400 bg-blue-950/60 border-blue-500/30">
            Structured Offline Curriculum
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Offline Batches in Koradi
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Focused offline coaching designed to eliminate exam fear, build deep conceptual mastery in Mathematics & Science, and maximize board exam scores.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBatches.map((item) => (
            <Card
              key={item.id}
              className="group border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                      {item.grade}
                    </span>
                    <Badge variant="accent" className="bg-amber-950/40 border-amber-500/30 text-amber-300 font-semibold">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-slate-100 font-bold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-400 mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Subjects Pill Badges */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Subjects Covered:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.subjects.map((sub) => (
                        <span
                          key={sub}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key batch highlights */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Program Highlights:
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Batch Details Meta Bar */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Timing</div>
                        <div className="font-semibold text-slate-200">{item.batchTiming}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Batch Limit</div>
                        <div className="font-semibold text-slate-200">{item.batchSize}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Card Footer Action */}
              <CardFooter className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {item.curriculum}
                </span>

                <a
                  href={getInquiryUrl(item.grade)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold px-4 py-2 flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire Batch</span>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Free Offline Demo banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-indigo-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Not sure which batch fits best for your child?
            </h4>
            <p className="text-sm text-slate-400">
              Visit our Koradi center for a <strong>Free 2-Day Demo Class</strong> and personalized academic counseling with Akram Sir.
            </p>
          </div>
          <a
            href={INSTITUTE_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button
              variant="whatsapp"
              size="md"
              className="rounded-full px-6 py-2.5 font-bold flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}
