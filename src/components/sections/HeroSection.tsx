"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ArrowRight,
  User,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "../ui/button";
import { BookDemoModal } from "../BookDemoModal";

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative pt-24 sm:pt-32 md:pt-36 overflow-hidden bg-[#101e35]"
      >
        {/* Desktop synced background graphic: positioned on the right and seamlessly blended */}
        <div className="hidden lg:block absolute right-0 top-16 bottom-0 w-[52%] xl:w-[50%] h-[calc(100%-4rem)] pointer-events-none z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-study-desk.png"
              alt="Akram's Genius Academy study desk with Maths, Science, English, Social Studies books and Learn Grow Succeed"
              fill
              priority
              className="object-contain object-bottom-right"
            />
            {/* Subtle left blend overlay matching #101e35 to ensure 100% seamless transition */}
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#101e35] via-[#101e35]/60 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left pb-4 lg:pb-16 pt-2">
              
              {/* Pill Tagline matching Mockup */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Better Learning <span className="text-blue-400 mx-1">•</span> Brighter Future
                </span>
              </div>

              {/* Main Headline matching Mockup */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                  Akram&apos;s <br />
                  <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                    Genius Academy
                  </span>
                </h1>
              </div>

              {/* Sub-headline */}
              <p className="text-base sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed">
                Quality education. Personal attention.<br />
                Real progress.
              </p>

              {/* Guidance by Akram Sir Badge */}
              <div className="flex items-center gap-2 text-slate-200 text-sm font-medium pt-1">
                <User className="w-4 h-4 text-slate-400" />
                <span>
                  Guidance by <strong className="text-white font-bold">Akram Sir</strong>
                </span>
              </div>

              {/* Action Buttons: Stacked on mobile, side-by-side on desktop */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-7 py-3.5 font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2.5 text-base transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>Call / WhatsApp</span>
                  </Button>
                </a>

                <a href="#classes" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-full px-7 py-3.5 font-medium text-slate-200 hover:text-white border-slate-700 bg-slate-800/60 hover:bg-slate-700 flex items-center justify-center gap-2 text-base transition-all active:scale-95"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </Button>
                </a>
              </div>

            </div>

            {/* Spacer for Desktop so the right background desk is visible and unobstructed */}
            <div className="hidden lg:block lg:col-span-5 h-[360px] xl:h-[420px]" />

          </div>

          {/* Dedicated Mobile View: Specifically cropped & centered study desk graphic */}
          <div className="lg:hidden relative w-full aspect-[16/11] max-w-lg mx-auto mt-4 mb-0">
            <Image
              src="/images/hero-study-desk-mobile.png"
              alt="Akram's Genius Academy study desk with books and Learn Grow Succeed"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>

        </div>
      </section>

      {/* Demo Class Modal */}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
