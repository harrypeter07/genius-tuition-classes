"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TEACHERS_DATA, INSTITUTE_DETAILS, Teacher } from "@/data/tuitionData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BookOpen, Star, Sparkles, MessageCircle, Phone, Award, CheckCircle2, ArrowRight } from "lucide-react";

interface TeachersSectionProps {
  teachers?: Teacher[];
  settings?: Record<string, string>;
}

export function TeachersSection({ teachers = TEACHERS_DATA, settings }: TeachersSectionProps) {
  const leadTeacher = teachers[0] || TEACHERS_DATA[0];
  const otherTeachers = teachers.slice(1);
  const phoneRaw = settings?.phoneRaw || INSTITUTE_DETAILS.phoneRaw;
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(
    "Hello Akram Sir, I would like to inquire about admissions and faculty mentorship at Akram's Genius Academy."
  )}`;

  return (
    <section id="teachers" className="py-20 md:py-24 relative bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="default" className="text-blue-400 bg-blue-950 border-blue-800">
            Dedicated Faculty
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Learn from Experienced &amp; Dedicated Mentors
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            At Akram&apos;s Genius Academy, our teachers simplify difficult concepts, verify every step of homework, and ensure no student hesitates to ask questions.
          </p>
        </div>

        {/* Lead Mentor Spotlight: AKRAM SIR */}
        {leadTeacher && (
          <div className="mb-14">
            <Card className="p-6 sm:p-10 bg-slate-900 border-slate-700/80 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-5 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-md">
                Head Educator
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Real Photo of Akram Sir Teaching */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-[300px] aspect-4/5 rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950">
                    <Image
                      src="/images/akram-sir-teaching.jpg"
                      alt="Akram Sir teaching Mathematics and Science at Akram's Genius Academy Koradi Nagpur"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        10+ Years Experience in Koradi
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-center space-y-0.5">
                    <h3 className="text-2xl font-black text-white">{leadTeacher.name}</h3>
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                      {leadTeacher.role}
                    </div>
                    <div className="text-xs text-slate-400">
                      {leadTeacher.qualification}
                    </div>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-xs font-semibold text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mathematics &amp; Science Board Specialist</span>
                  </div>

                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                    {leadTeacher.bio}
                  </p>

                  {leadTeacher.highlight && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 flex items-start gap-3">
                      <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Track Record: </strong>
                        {leadTeacher.highlight}
                      </div>
                    </div>
                  )}

                  {/* Subject Badges */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Subjects Mentored Personally:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {leadTeacher.subjects.map((sub: string) => (
                        <span
                          key={sub}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-blue-300 border border-slate-700"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="whatsapp" className="font-semibold">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>Chat Directly with Akram Sir</span>
                      </Button>
                    </a>
                    <a href={`tel:${phoneRaw}`}>
                      <Button variant="outline" className="font-medium">
                        <Phone className="w-4 h-4 mr-1.5 text-blue-400" />
                        <span>Call +91 91756 91457</span>
                      </Button>
                    </a>
                  </div>

                </div>

              </div>
            </Card>
          </div>
        )}

        {/* Other Faculty Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherTeachers.map((teacher, index) => {
            const facultyImages = [
              "/images/science-experiment.jpg",
              "/images/hero-study-desk.jpg",
              "/images/doubt-session.jpg",
            ];
            const fImg = facultyImages[index % facultyImages.length];

            return (
              <Card
                key={teacher.id || index}
                className="bg-slate-900 border-slate-800 hover:border-slate-700 flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                <div className="relative h-40 w-full overflow-hidden border-b border-slate-800">
                  <Image
                    src={fImg}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-bold text-white bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-md">
                      {teacher.experience}
                    </span>
                  </div>
                </div>

                <div>
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-lg font-bold text-white">
                      {teacher.name}
                    </CardTitle>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">
                      {teacher.role}
                    </div>
                    <div className="text-xs text-slate-400">
                      {teacher.qualification}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-2">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {teacher.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {teacher.subjects.map((sub: string) => (
                        <span
                          key={sub}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-3 border-t border-slate-800/80">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{teacher.highlight}</span>
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View all faculty link */}
        <div className="text-center pt-10">
          <Link href="/teachers">
            <Button variant="outline" className="text-sm font-semibold">
              <span>View Detailed Faculty Profiles &amp; Teaching Methodology</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
