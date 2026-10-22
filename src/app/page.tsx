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
  const [settings, classes, teachers, testimonials, faqs] = await Promise.all([
    getDbSettings(),
    getDbClasses(),
    getDbTeachers(),
    getDbTestimonials(),
    getDbFaqs(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-[#070c18] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* 4 Feature Highlights band */}
        <FeatureHighlights />

        {/* Offline Classroom Experience */}
        <AboutSection />

        {/* Classes & Batches Offered - Live from DB */}
        <ClassesSection classes={classes} settings={settings} />

        {/* Faculty & Mentors led by Akram Sir - Live from DB */}
        <TeachersSection teachers={teachers} settings={settings} />

        {/* Proven Results & Student Testimonials - Live from DB */}
        <ResultsSection testimonials={testimonials} settings={settings} />

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
