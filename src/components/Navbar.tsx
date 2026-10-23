"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, MessageCircle, Menu, X, Phone, Sparkles, MapPin } from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "./ui/button";
import { BookDemoModal } from "./BookDemoModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Batches & Classes", href: "/classes" },
    { label: "Faculty", href: "/teachers" },
    { label: "Results & Toppers", href: "/results" },
    { label: "About Institute", href: "/about" },
    { label: "Contact & Visit", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-3"
            : "bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                  Genius
                </span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                  Tuition Classes • Koradi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors py-1 ${
                      isActive
                        ? "text-blue-400 border-b-2 border-blue-500 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDemoOpen(true)}
                className="font-bold text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                <span>Free Demo</span>
              </Button>

              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="whatsapp"
                  size="sm"
                  className="font-bold text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>WhatsApp</span>
                </Button>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white bg-emerald-600 rounded-lg shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Koradi, Nagpur • Guidance by Akram Sir</span>
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold py-1 transition-colors ${
                      isActive ? "text-blue-400 font-bold" : "text-slate-200 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
                <Button
                  variant="default"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDemoOpen(true);
                  }}
                  className="w-full font-bold"
                >
                  <Sparkles className="w-4 h-4 mr-1 text-amber-300" />
                  <span>Book Free 2-Day Demo Class</span>
                </Button>

                <a
                  href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm border border-slate-800"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Akram Sir (+91 91756 91457)</span>
                </a>

                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
