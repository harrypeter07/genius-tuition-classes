"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/tuitionData";
import { AccordionItem } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 md:py-24 relative bg-[#091122]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="default" className="text-blue-400 bg-blue-950/60 border-blue-500/30">
            Parents & Students FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about our offline coaching classes in Koradi, Nagpur.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((item) => (
            <AccordionItem
              key={item.id}
              title={item.question}
              category={item.category}
              isOpen={openId === item.id}
              onToggle={() => toggleItem(item.id)}
            >
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </div>

      </div>
    </section>
  );
}
