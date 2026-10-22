"use client";

import React from "react";
import { GraduationCap, MapPin, MessageCircle } from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#050812] border-t border-slate-800 text-slate-400">
      
      {/* Top Footer with helpful links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  Genius Tuition Classes
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                  Koradi, Nagpur
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Premier offline coaching for school and board students under the experienced guidance of Akram Sir. Nurturing conceptual understanding, continuous practice, and high academic scoring.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-500 font-medium">Mentor:</span>
              <span className="text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                Akram Sir (+91 91756 91457)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-blue-400 transition-colors">
                  Classes & Batches
                </a>
              </li>
              <li>
                <a href="#teachers" className="hover:text-blue-400 transition-colors">
                  Faculty & Mentors
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-blue-400 transition-colors">
                  Results & Testimonials
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  Why Offline Coaching
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Admissions & Demo Class
                </a>
              </li>
            </ul>
          </div>

          {/* Batches Info */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Offered Batches
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="text-slate-300">Class 5th - 8th Foundation</li>
              <li className="text-slate-300">Class 9th Pre-Board Batch</li>
              <li className="text-slate-300">Class 10th SSC & CBSE Masterclass</li>
              <li className="text-slate-300">Class 11th & 12th Board Coaching</li>
              <li className="text-blue-400 font-medium">Max 15-18 Students / Batch</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Exact Match to Mockup */}
      <div className="border-t border-slate-900/80 bg-[#04060e] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            
            {/* Institute & Location */}
            <div className="flex items-center gap-3 text-slate-300">
              <span className="font-semibold text-white">Genius Tuition Classes</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Koradi, Nagpur
              </span>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div className="flex items-center gap-2">
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors font-mono font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>+91 91756 91457</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
