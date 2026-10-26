import {
  Cloud,
  Gauge,
  Languages,
  Search,
  ServerCog,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { BrandIcon, LetterMark } from "@/components/ui/brand-icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { technologies, type Technology } from "@/config/site";

const genericIcons = {
  api: ServerCog,
  webhook: Webhook,
  hosting: Cloud,
  language: Languages,
  performance: Gauge,
  security: ShieldCheck,
  seo: Search,
} satisfies Record<NonNullable<Technology["icon"]>, unknown>;

export function Technologies() {
  return (
    <Section id="technologies" className="pt-4 sm:pt-6">
      <SectionHeading
        eyebrow="TECHNOLOGIES"
        title="What I build sites with, and the CRMs I connect"
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {technologies.map((group) => (
          // An odd last group spans the full row instead of sitting alone.
          <div
            key={group.title}
            className="group rounded-card bg-surface p-6 sm:p-7 lg:last:odd:col-span-2"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-muted">
              {group.title}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:group-last:group-odd:grid-cols-6">
              {group.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl bg-background px-2.5 py-3.5 sm:gap-2.5 sm:px-3"
                >
                  <TechnologyIcon item={item} />
                  <span className="min-w-0 text-xs leading-tight font-medium text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TechnologyIcon({ item }: { item: Technology }) {
  if (item.brand) {
    return <BrandIcon slug={item.brand} colored className="size-6 shrink-0" />;
  }
  if (item.letters) {
    return <LetterMark letters={item.letters} className="shrink-0" />;
  }
  if (item.icon) {
    const Icon = genericIcons[item.icon];
    return <Icon aria-hidden className="size-6 shrink-0 text-accent" />;
  }
  return null;
}
