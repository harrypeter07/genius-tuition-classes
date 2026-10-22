import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070c18] text-white flex flex-col">
      {/* Top navbar skeleton */}
      <header className="h-20 border-b border-slate-800/80 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-16 h-3 rounded" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
        <Skeleton className="w-28 h-9 rounded-full" />
      </header>

      {/* Hero skeleton */}
      <main className="max-w-7xl mx-auto px-6 py-20 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="w-48 h-7 rounded-full" />
            <Skeleton className="w-3/4 h-16 rounded-xl" />
            <Skeleton className="w-1/2 h-14 rounded-xl" />
            <Skeleton className="w-full max-w-md h-6 rounded" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="w-36 h-12 rounded-full" />
              <Skeleton className="w-32 h-12 rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="w-full h-80 rounded-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
