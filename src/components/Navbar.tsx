"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, MessageCircle, Menu, X, Phone, MapPin } from "lucide-react";
import { INSTITUTE_DETAILS } from "@/data/tuitionData";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Classes", href: "#classes" },
    { label: "Teachers", href: "#teachers" },
    { label: "Results", href: "#results" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#070c18]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="#home"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                  Genius
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
                  Tuition Classes
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-5 py-2 font-medium shadow-md shadow-blue-500/20 flex items-center gap-2 border border-blue-400/30"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp</span>
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={INSTITUTE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white bg-blue-600 rounded-full"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700/60 focus:outline-none"
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
          <div className="md:hidden bg-[#0a1122]/98 backdrop-blur-xl border-b border-slate-800 px-6 py-6 transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <div className="text-xs font-semibold uppercase text-blue-400 tracking-wider">
                Koradi, Nagpur • Guidance by Akram Sir
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-200 hover:text-blue-400 py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href={`tel:${INSTITUTE_DETAILS.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-800 text-white font-medium text-sm border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Akram Sir (+91 91756 91457)</span>
                </a>
                <a
                  href={INSTITUTE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-lg shadow-blue-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
