import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { getDbTeachers, getDbSettings } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Sparkles,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  MessageCircle,
  Phone,
} from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export const metadata: Metadata = {
  title: "Faculty & Mentors | Akram Sir - Akram's Genius Academy Koradi",
  description:
    "Meet our experienced faculty led by Akram Sir (10+ years teaching experience). Mathematics, Science, and Board exam specialists at Akram's Genius Academy, Koradi, Nagpur.",
};

export default async function TeachersPage() {
  const [teachers, settings] = await Promise.all([getDbTeachers(), getDbSettings()]);

  const teachingPrinciples = [
    {
      title: "Zero Backbench Anonymity",
      desc: "In our 15-18 student classrooms, every student sits in the teacher's direct line of sight. No one gets ignored.",
    },
    {
      title: "Step-by-Step Checking at Desks",
      desc: "Akram Sir verifies board presentation methods, calculations, and derivations directly in each student's notebook.",
    },
    {
      title: "Maths & Science Fear Eradication",
      desc: "Breaking difficult formulas down into everyday intuitive concepts, so students actually enjoy solving problems.",
    },
    {
      title: "Open Door Doubt Resolution",
      desc: "Doubts are never postponed to tomorrow. Teachers stay back after every lecture until every concept is cleared.",
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
                  <GraduationCap className="w-3.5 h-3.5" />
                  Academic Mentors • Koradi, Nagpur
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Experienced Faculty &amp; Mentorship
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Led by <strong>Akram Sir</strong>, our educators are passionate teachers who understand that real learning happens with patience, personal encouragement, and continuous practice.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a href={INSTITUTE_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" className="font-semibold text-xs sm:text-sm">
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      <span>Speak with Akram Sir</span>
                    </Button>
                  </a>
                  <a href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}>
                    <Button variant="outline" className="font-medium text-xs sm:text-sm">
                      <Phone className="w-4 h-4 mr-1.5 text-blue-400" />
                      <span>+91 91756 91457</span>
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <Image
                    src="/images/offline-classroom.jpg"
                    alt="Akram's Genius Academy Classroom in Koradi"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="font-bold text-white">Akram Sir &bull; Lead Mentor</div>
                    <div className="text-[11px] text-slate-400">10+ Years mentoring 850+ board students in Koradi</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <TeachersSection teachers={teachers} settings={settings} />

        {/* Teaching Philosophy */}
        <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
                Our Pedagogy
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                How Our Teachers Transform Results
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Four core principles that distinguish Genius Tuition Classes from commercial coaching factories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachingPrinciples.map((item, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
