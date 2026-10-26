import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, profile } from "@/config/site";
import { getExperienceYears } from "@/lib/figures";

export function Intro() {
  const years = getExperienceYears();

  return (
    <section id="top" className="pt-4 sm:pt-6">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {/* Profile tile — text left, round portrait right (above on phones) */}
          <Card className="flex flex-col gap-6 p-7 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-8 lg:col-span-2 lg:row-span-2">
            <div className="flex flex-1 flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-strong">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {profile.currentRole}
              </span>

              <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-base leading-snug font-medium text-foreground">
                {profile.tagline}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {profile.overview}
              </p>
              {profile.location ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin aria-hidden className="size-3.5" />
                  {profile.location}
                </p>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
                <ButtonLink href="#projects" size="sm">
                  View My Work
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="#contact" size="sm" variant="subtle">
                  Get in Touch
                </ButtonLink>
              </div>
            </div>

            <div className="order-first shrink-0 sm:order-none">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={320}
                height={320}
                priority
                className="size-24 rounded-full object-cover ring-4 ring-background sm:size-36"
              />
            </div>
          </Card>

          {/* Experience tile */}
          <Card className="flex items-center gap-5 lg:col-span-2">
            <p className="text-[2.75rem] font-semibold leading-none tracking-tight text-accent">
              {years}
              <span className="ml-1.5 text-base font-medium text-muted">yrs</span>
            </p>
            <p className="text-sm leading-snug text-muted">
              Software development experience
            </p>
          </Card>

          {/* What I build tile — the same categories the projects are filed under */}
          <Card className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted">
              WHAT I BUILD
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href="#projects"
                    className="flex h-full flex-col items-center gap-2 rounded-xl bg-background px-2 py-4 hover:bg-accent-soft"
                  >
                    <CategoryIcon
                      category={category.id}
                      className="size-6 text-accent"
                    />
                    <span className="text-center text-xs font-medium text-foreground">
                      {category.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
