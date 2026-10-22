import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-blue-950/70 border border-blue-500/30 text-blue-300 shadow-sm",
    secondary:
      "bg-slate-800/80 border border-slate-700 text-slate-300",
    outline:
      "border border-slate-700 text-slate-300",
    success:
      "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300",
    accent:
      "bg-amber-950/50 border border-amber-500/30 text-amber-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
