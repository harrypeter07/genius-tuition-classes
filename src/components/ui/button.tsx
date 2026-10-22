"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "whatsapp";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-95";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 border border-blue-500/30",
      secondary:
        "bg-slate-800/80 hover:bg-slate-700 text-slate-100 border border-slate-700/60 shadow-sm",
      outline:
        "border border-slate-700 bg-transparent hover:bg-slate-800/60 text-slate-200",
      ghost:
        "bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white",
      glass:
        "bg-slate-800/50 hover:bg-slate-700/60 text-white backdrop-blur-md border border-white/10 shadow-lg",
      whatsapp:
        "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-emerald-600/30 font-semibold",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
