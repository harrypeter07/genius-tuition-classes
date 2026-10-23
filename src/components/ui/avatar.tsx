import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-700/60 bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("aspect-square h-full w-full object-cover", className)}
    />
  );
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center font-semibold text-slate-300 bg-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
