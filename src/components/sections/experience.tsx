import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { education, experience } from "@/config/site";
import { formatRange } from "@/lib/dates";
import { getExperienceYears } from "@/lib/figures";

export function ExperienceSection() {
  return (
    <Section id="experience" className="pt-4 sm:pt-6">
      <SectionHeading
        eyebrow="EXPERIENCE"
        title={`${getExperienceYears()} years building software`}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <ol className="space-y-4 lg:col-span-2">
          {experience.map((role) => (
            <li key={`${role.role}-${role.start}`}>
              <Card className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {role.role}
                  </h3>
                  <span className="flex items-center gap-2 text-sm text-muted">
                    {!role.end ? (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
                        Current
                      </span>
                    ) : null}
                    {formatRange(role.start, role.end)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {role.company}
                </p>

                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>

        <Card className="h-fit p-6 sm:p-7">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-muted">
            <GraduationCap aria-hidden className="size-4 text-accent" />
            EDUCATION & CERTIFICATION
          </p>
          <ul className="mt-5 space-y-4">
            {education.map((item) => (
              <li key={item.title}>
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
