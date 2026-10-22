"use client";

import React from "react";
import Image from "next/image";
import { TEACHERS_DATA, INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { BookOpen, Star, Sparkles, MessageCircle, Phone, Award } from "lucide-react";

export function TeachersSection() {
  const leadTeacher = TEACHERS_DATA[0]; // Akram Sir
  const otherTeachers = TEACHERS_DATA.slice(1);

  return (
    <section id="teachers" className="py-20 md:py-28 relative bg-[#091122]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="default" className="text-blue-400 bg-blue-950/60 border-blue-500/30">
            Dedicated Mentors
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Learn from Experienced & Dedicated Teachers
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            At Genius Tuition Classes, our faculty is committed to simplifying complex concepts, resolving every single doubt, and motivating students to achieve their personal best.
          </p>
        </div>

        {/* Lead Mentor Spotlight: AKRAM SIR */}
        <div className="mb-14">
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-blue-950/70 via-slate-900/90 to-slate-950 border-2 border-blue-500/40 shadow-2xl shadow-blue-950/60 overflow-hidden">
            {/* Top decorative badge */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-6 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-md z-10">
              Founder & Head Mentor
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo Portrait of Akram Sir Teaching */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[320px] aspect-4/5 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl shadow-blue-950/80">
                  <Image
                    src="/images/akram-sir-teaching.jpg"
                    alt="Akram Sir teaching Mathematics and Science in classroom at Genius Tuition Classes Koradi"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                      10+ Years Teaching in Koradi, Nagpur
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center space-y-0.5">
                  <h3 className="text-2xl font-black text-white">{leadTeacher.name}</h3>
                  <div className="text-xs font-semibold text-blue-400 tracking-wide uppercase">
                    {leadTeacher.role}
                  </div>
                  <div className="text-xs text-slate-400">
                    {leadTeacher.qualification}
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-xs font-semibold text-blue-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mathematics & Science Specialist</span>
                </div>

                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  {leadTeacher.bio}
                </p>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
                  <div>
                    <strong className="text-white">Track Record: </strong>
                    {leadTeacher.highlight}
                  </div>
                </div>

                {/* Direct contact with Akram Sir */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-600/30 transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Akram Sir (+91 91756 91457)</span>
                  </a>

                  <a
                    href={INSTITUTE_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Akram Sir</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Other Specialized Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg text-white font-bold">
                  {teacher.name}
                </CardTitle>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                  {teacher.role}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {teacher.experience} • {teacher.qualification}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {teacher.bio}
                </p>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Subjects:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-0.5 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{teacher.highlight}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
