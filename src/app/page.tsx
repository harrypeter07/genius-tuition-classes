import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070c18] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section matching the UI Mockup */}
        <HeroSection />

        {/* 4 Feature Highlights band */}
        <FeatureHighlights />

        {/* Offline Classroom Experience & Story */}
        <AboutSection />

        {/* Classes & Batches Offered */}
        <ClassesSection />

        {/* Faculty & Mentors led by Akram Sir */}
        <TeachersSection />

        {/* Proven Results & Student Testimonials */}
        <ResultsSection />

        {/* Admission Inquiry & Free Demo Class Form */}
        <InquirySection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer matching mockup branding & contact */}
      <Footer />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions />
    </div>
  );
}
