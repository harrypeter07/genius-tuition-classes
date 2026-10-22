"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  category?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  title,
  category,
  children,
  isOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-200",
        isOpen && "border-blue-500/50 bg-slate-900/80 shadow-md shadow-blue-950/20",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 flex items-center justify-between gap-4 transition-colors hover:text-blue-400"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {category && (
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider bg-blue-950/70 border border-blue-800/40 px-2 py-0.5 rounded-full w-fit">
              {category}
            </span>
          )}
          <span className="font-semibold text-slate-100 text-base md:text-lg">
            {title}
          </span>
        </div>
        <div
          className={cn(
            "p-1.5 rounded-full bg-slate-800 text-slate-400 transition-transform duration-300 shrink-0",
            isOpen && "rotate-180 bg-blue-600 text-white"
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-800/60 mt-1 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
