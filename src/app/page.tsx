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
import {
  getDbSettings,
  getDbClasses,
  getDbTeachers,
  getDbTestimonials,
  getDbFaqs,
} from "@/lib/db";

export default async function Home() {
  const [settings, classes, teachers] = await Promise.all([
    getDbSettings(),
    getDbClasses(),
    getDbTeachers(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Authentic Hero Section */}
        <HeroSection />

        {/* 4 Feature Highlights band */}
        <FeatureHighlights />

        {/* Offline Classroom Experience */}
        <AboutSection />

        {/* Classes & Batches Offered - Live from DB */}
        <ClassesSection classes={classes} settings={settings} />

        {/* Faculty & Mentors led by Akram Sir - Live from DB */}
        <TeachersSection teachers={teachers} settings={settings} />

        {/* Academic Results & Board Focus */}
        <ResultsSection />

        {/* Admission Inquiry & Free Demo Class Form */}
        <InquirySection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions />
    </div>
  );
}
