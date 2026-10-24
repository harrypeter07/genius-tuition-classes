"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CLASSES_DATA, INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, Check, MessageCircle, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { BookDemoModal } from "../BookDemoModal";

interface ClassesSectionProps {
  classes?: any[];
  settings?: Record<string, string>;
}

export function ClassesSection({ classes, settings }: ClassesSectionProps = {}) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedBatchForDemo, setSelectedBatchForDemo] = useState("Class 10th");

  const allBatches = classes && classes.length > 0 ? classes : CLASSES_DATA;
  const phoneRaw = settings?.phoneRaw || INSTITUTE_DETAILS.phoneRaw;

  const filterTabs = [
    { id: "all", label: "All Batches" },
    { id: "foundation", label: "Class 5th - 8th (Foundation)" },
    { id: "boards", label: "Class 9th & 10th (Boards)" },
    { id: "senior", label: "Class 11th & 12th (Senior)" },
  ];

  const filteredBatches =
    activeTab === "all"
      ? allBatches
      : allBatches.filter((item) => item.category === activeTab);

  const batchImages: Record<string, string> = {
    "class-5-8": "/images/students-learning.jpg",
    "class-9": "/images/doubt-session.jpg",
    "class-10": "/images/math-notes.jpg",
    "class-11-12": "/images/science-experiment.jpg",
  };

  const openDemoForBatch = (grade: string) => {
    setSelectedBatchForDemo(grade);
    setDemoModalOpen(true);
  };

  const getInquiryUrl = (batchName: string) => {
    const text = encodeURIComponent(
      `Hello Akram Sir, I am interested in admission for *${batchName}* at Akram's Genius Academy, Koradi. Please share batch schedule, seat availability, and fee details.`
    );
    return `https://wa.me/${phoneRaw}?text=${text}`;
  };

  return (
    <>
      <section id="classes" className="py-20 md:py-24 relative bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
              Structured Offline Curriculum
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Classroom Batches in Koradi, Nagpur
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Systematic classroom coaching engineered to eliminate exam fear, build deep conceptual mastery in Mathematics &amp; Science, and maximize board exam scores.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Cards Grid with Real Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredBatches.map((item) => {
              const bgImg = batchImages[item.id] || "/images/offline-classroom.jpg";
              return (
                <Card
                  key={item.id}
                  className="group border-slate-800 bg-slate-900/90 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  {/* Real Image Header Banner */}
                  <div className="relative w-full h-44 overflow-hidden border-b border-slate-800">
                    <Image
                      src={bgImg}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-xl sm:text-2xl font-black text-white px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 shadow-md">
                        {item.grade}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge variant="accent" className="bg-amber-950/90 border-amber-500/40 text-amber-300 font-bold">
                        {item.badge}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 font-medium">
                        {item.curriculum}
                      </span>
                      <span className="bg-blue-950/80 text-blue-300 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
                        {item.batchSize}
                      </span>
                    </div>
                  </div>

                  <div>
                    <CardHeader className="pb-3 pt-5">
                      <CardTitle className="text-xl text-white font-bold">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Subjects Pills */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                          Core Subjects Covered:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.subjects.map((sub: string) => (
                            <span
                              key={sub}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/60"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Batch Highlights */}
                      <div className="space-y-2 pt-1 border-t border-slate-800/80">
                        {item.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                        <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                        <span><strong>Timings:</strong> {item.batchTiming}</span>
                      </div>
                    </CardContent>
                  </div>

                  {/* Card Actions */}
                  <CardFooter className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
                    <Button
                      variant="default"
                      onClick={() => openDemoForBatch(item.grade)}
                      className="w-full sm:flex-1 font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
                      <span>Book Free Demo</span>
                    </Button>

                    <a
                      href={getInquiryUrl(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="whatsapp"
                        className="w-full font-semibold"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>Inquire</span>
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Bottom Callout banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Need guidance selecting the right batch?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Akram Sir personally assesses every child&apos;s current syllabus standing and recommends the optimal batch.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/classes">
                <Button variant="outline" className="text-xs sm:text-sm">
                  <span>Full Course Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Button
                variant="default"
                onClick={() => openDemoForBatch("General Admission")}
                className="text-xs sm:text-sm font-bold shadow-lg"
              >
                Schedule Counseling
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Demo Modal */}
      <BookDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        prefilledGrade={selectedBatchForDemo}
      />
    </>
  );
}
