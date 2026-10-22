"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, X, ArrowUp } from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    // Auto hide tooltip after 8 seconds
    const timer = setTimeout(() => setShowTooltip(false), 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Action Button Cluster in Bottom-Right */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Callout Pill */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 shadow-xl text-xs text-slate-200 animate-bounce">
            <span>💬 Have a question for Akram Sir?</span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Direct WhatsApp Button */}
        <a
          href={INSTITUTE_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Akram Sir on WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          <MessageCircle className="w-7 h-7 fill-white/20 relative z-10" />
        </a>

      </div>

      {/* Mobile Sticky Bottom Call Bar for High Conversion */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070c18]/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white font-semibold text-xs active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>Call Akram Sir</span>
        </a>

        <a
          href={INSTITUTE_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
