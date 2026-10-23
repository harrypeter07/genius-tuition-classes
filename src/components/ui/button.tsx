"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "glass"
    | "whatsapp"
    | "success";
  size?: "default" | "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]";

    const variants: Record<string, string> = {
      default:
        "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 border border-blue-500/30",
      primary:
        "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 border border-blue-500/30",
      destructive:
        "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 border border-rose-500/30",
      outline:
        "border border-slate-700 bg-slate-900/40 hover:bg-slate-800 hover:text-white text-slate-200 shadow-sm",
      secondary:
        "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 shadow-sm",
      ghost:
        "hover:bg-slate-800 hover:text-white text-slate-300",
      link:
        "text-blue-400 underline-offset-4 hover:underline",
      glass:
        "bg-slate-800/70 hover:bg-slate-750 text-white backdrop-blur-md border border-slate-700/60 shadow-lg",
      whatsapp:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 font-semibold",
      success:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 gap-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs gap-1.5",
      md: "h-10 px-4 py-2 gap-2 text-sm",
      lg: "h-12 rounded-xl px-6 text-base gap-2.5 font-bold",
      icon: "h-10 w-10 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.default, className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1.5 shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
