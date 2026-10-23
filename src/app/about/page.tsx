import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { AboutSection } from "@/components/sections/AboutSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Shield,
  Heart,
  Users,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "About Us | Genius Tuition Classes Koradi Nagpur",
  description:
    "Learn about Genius Tuition Classes, Koradi, Nagpur. Led by Akram Sir with 10+ years of dedicated offline classroom coaching.",
};

export default function AboutPage() {
  const infraFeatures = [
    {
      title: "Spacious Physical Desks",
      desc: "Ergonomically planned student seating with wide study desks so books, notebooks, and geometry kits sit comfortably.",
    },
    {
      title: "Whiteboard Interactive Sessions",
      desc: "Live step-by-step problem derivation where students solve simultaneously in their notebooks, not through passive slides.",
    },
    {
      title: "Comprehensive Study Bank",
      desc: "Curated chapter-wise formula sheets, 10-year board question banks, and weekly test paper archives provided to every student.",
    },
    {
      title: "Safe & Central Koradi Location",
      desc: "Easily accessible near Koradi Devi Temple and Power Station colony with ample bicycle parking and well-lit neighborhood.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero Header */}
        <section className="relative py-16 md:py-20 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
                  <Building className="w-3.5 h-3.5" />
                  10+ Years Trust • Koradi, Nagpur
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  About Genius Tuition Classes
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Founded with a clear conviction: Every student can achieve academic excellence when provided with disciplined offline coaching, personal attention, and real conceptual clarity.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    Lead Mentor: <strong className="text-white">Akram Sir</strong>
                  </span>
                  <span className="text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    Location: <strong className="text-white">Koradi, Nagpur</strong>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <Image
                    src="/images/offline-classroom.jpg"
                    alt="Genius Tuition Classes classroom in Koradi"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="font-bold text-white">Physical Classroom Coaching</div>
                    <div className="text-[11px] text-slate-400">Strictly distraction-free offline learning environment</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* About Section Core */}
        <AboutSection />

        {/* Infrastructure & Study Environment */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Facility &amp; Environment
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Our Classroom Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Built from the ground up to foster deep concentration, positive teacher-student rapport, and active learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {infraFeatures.map((feat, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </Card>
              ))}
            </div>

            {/* Center Visit CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Parents &amp; Students are welcome to visit our Koradi Center
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Meet Akram Sir in person, inspect our classroom setup, and review student test records.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href={INSTITUTE_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="font-bold text-xs sm:text-sm">
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    <span>WhatsApp Akram Sir</span>
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm">
                    <span>Directions &amp; Map</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
