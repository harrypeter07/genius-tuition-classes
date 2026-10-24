"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  CheckCircle2,
  Eye,
  PenTool,
  Clock,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export function AboutSection() {
  const offlineBenefits = [
    {
      title: "100% Focused Offline Environment",
      desc: "No screen fatigue, zero app notifications or tabs switching. Pure, face-to-face classroom interaction.",
      icon: Eye,
    },
    {
      title: "Step-by-Step Notebook Inspection",
      desc: "Akram Sir personally inspects every derivation, theorem step, and numerical solution right at your desk.",
      icon: PenTool,
    },
    {
      title: "Weekly Sunday Physical Mock Tests",
      desc: "Authentic board-style answer booklets, timed conditions, and handwriting feedback that eradicate exam anxiety.",
      icon: Clock,
    },
    {
      title: "Direct WhatsApp & Parent Meetings",
      desc: "Transparent progress reporting directly to parents, with test papers sent home for signatures.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-24 relative bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
              Why Choose Akram&apos;s Genius Academy
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Why Offline Classroom Coaching with <br />
              <span className="text-blue-400">Akram Sir</span> Truly Works
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              In an age of crowded video apps where students are just passive screen viewers, <strong>Akram&apos;s Genius Academy</strong> provides the irreplaceable accountability of a real physical classroom in <strong>Koradi, Nagpur</strong>.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Founded and mentored by <strong>Akram Sir</strong> (10+ years teaching experience), we believe conceptual clarity isn&apos;t achieved by rote memorization—it is built through daily board practice, immediate doubt clearance, and continuous motivation.
            </p>

            {/* Quick points list */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Strict limit of 15–18 students per batch — no crowded halls</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Convenient &amp; safe Koradi location (near Koradi Devi Temple)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Maharashtra State Board (SSC/HSC) &amp; CBSE specialized curriculum</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link href="/about">
                <Button variant="default" className="font-semibold">
                  <span>Read Our Complete Story</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white underline underline-offset-4"
              >
                Inquire about Center Visit
              </a>
            </div>

          </div>

          {/* Right Column: Authentic Classroom Photo Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
              <div className="relative w-full h-[320px] sm:h-[380px]">
                <Image
                  src="/images/offline-classroom.jpg"
                  alt="Disciplined offline coaching classroom at Akram's Genius Academy Koradi Nagpur"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 text-xs">
                  <div className="font-bold text-white">Genuine Offline Classroom in Koradi, Nagpur</div>
                  <div className="text-[11px] text-slate-400">Quiet, distraction-free desks with whiteboard instruction</div>
                </div>
              </div>
            </div>

            {/* 2-Column Real Study Materials Highlights (No People) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <Image
                  src="/images/math-notes.jpg"
                  alt="Formula notes and handwritten math drills"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2.5">
                  <span className="text-xs font-bold text-white">Handwritten Formula Sheets</span>
                </div>
              </div>

              <div className="relative h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <Image
                  src="/images/science-experiment.jpg"
                  alt="Science conceptual study and experiments"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2.5">
                  <span className="text-xs font-bold text-white">Science Practical Concepts</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Cards: The Offline Difference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {offlineBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
