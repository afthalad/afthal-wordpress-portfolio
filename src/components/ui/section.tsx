import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
