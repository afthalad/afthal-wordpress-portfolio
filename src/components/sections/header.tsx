"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { contact, navItems, profile } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CvLink />
          <ButtonLink href="#contact" size="sm">
            Contact Me
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg bg-surface p-2 text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className={cn("bg-background lg:hidden", open ? "block" : "hidden")}>
        <nav
          aria-label="Sections"
          className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-4 sm:px-8"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-3">
            <ButtonLink href="#contact" size="sm" onClick={() => setOpen(false)}>
              Contact Me
            </ButtonLink>
            <CvLink />
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * The CV link only exists once a real file is configured in site.ts — an
 * unconfigured CV is hidden rather than shown as a dead or disabled control.
 */
function CvLink() {
  if (!contact.cvUrl) return null;

  return (
    <a
      href={contact.cvUrl}
      download
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
    >
      <Download aria-hidden className="size-4" />
      Download CV
    </a>
  );
}
