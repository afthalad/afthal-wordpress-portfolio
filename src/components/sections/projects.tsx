"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ImageIcon, LayoutGrid } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { BrandIcon, LetterMark } from "@/components/ui/brand-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  categories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/config/site";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const labelFor = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
) as Record<ProjectCategory, string>;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: projects.filter((p) => p.category === category.id).length,
    })),
  ];

  return (
    // Sits straight under the overview, so it starts closer than other sections.
    <Section id="projects" className="pt-8 sm:pt-10">
      <SectionHeading
        eyebrow="PROJECTS"
        title="WordPress sites and WooCommerce stores, plus CRM work"
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-6 flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg pr-3.5 pl-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                active
                  ? "bg-accent text-white"
                  : "bg-surface text-foreground hover:bg-accent-soft",
              )}
            >
              {/* A white chip keeps the coloured marks legible on the active tab. */}
              <span className="flex size-6 items-center justify-center rounded-md bg-white text-accent">
                {tab.id === "all" ? (
                  <LayoutGrid aria-hidden className="size-4" />
                ) : (
                  <CategoryIcon category={tab.id} className="size-4" />
                )}
              </span>
              {tab.label}
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-white/80" : "text-muted",
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <Card className="mt-6 flex flex-col items-center gap-3 py-14 text-center">
          <CategoryIcon
            category={filter as ProjectCategory}
            className="size-7 text-accent"
          />
          <p className="text-sm text-muted">
            {labelFor[filter as ProjectCategory]} projects are being added.
          </p>
        </Card>
      )}
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col p-0">
      <div className="relative aspect-2/1 w-full overflow-hidden rounded-t-card bg-hairline">
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-muted">
          <CategoryIcon category={project.category} className="size-3.5" />
          {labelFor[project.category].toUpperCase()}
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.icon ? (
              <Image
                src={project.icon}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-xl"
              />
            ) : null}
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>
          {project.status ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {project.status}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm text-accent">{project.useCase}</p>

        {project.description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        ) : null}

        {project.problem || project.solution || project.outcome ? (
          <dl className="mt-4 space-y-3.5 text-sm leading-relaxed">
            {project.problem ? (
              <Detail term="PROBLEM">{project.problem}</Detail>
            ) : null}
            {project.solution ? (
              <Detail term="SOLUTION">{project.solution}</Detail>
            ) : null}
            {project.outcome ? (
              <Detail term="OUTCOME">{project.outcome}</Detail>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tools.map((tool) => (
            <Badge key={tool}>{tool}</Badge>
          ))}
        </div>

        {project.links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
              >
                {link.label}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function Detail({ term, children }: { term: string; children: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.1em] text-muted">
        {term}
      </dt>
      <dd className="mt-1 text-muted">{children}</dd>
    </div>
  );
}

/**
 * The card's picture: phone screens for apps, a capture for websites, a
 * brand mark for CRM platforms, otherwise a neutral placeholder.
 */
function ProjectVisual({ project }: { project: Project }) {
  if (project.screenshots?.length) {
    return (
      <div className="flex size-full items-center justify-center gap-3 px-4 py-4">
        {project.screenshots.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${project.name} screen ${i + 1}`}
            width={300}
            height={650}
            className="h-full w-auto rounded-lg object-contain"
          />
        ))}
      </div>
    );
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-contain p-1.5"
      />
    );
  }

  if (project.brand || project.letters) {
    return (
      <div className="flex size-full items-center justify-center">
        {project.brand ? (
          <BrandIcon slug={project.brand} colored className="size-24" />
        ) : (
          <LetterMark
            letters={project.letters ?? ""}
            className="size-16 rounded-2xl text-2xl"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 text-muted">
      <ImageIcon aria-hidden className="size-6" />
      <span className="text-xs">Project image to be added</span>
    </div>
  );
}
