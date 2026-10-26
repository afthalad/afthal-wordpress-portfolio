import { Download, Phone } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Card } from "@/components/ui/card";
import { contact, profile } from "@/config/site";
import { cn } from "@/lib/utils";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
  download?: boolean;
};

/** Official marks in brand colour, wrapped to match the icon signature used below. */
function GmailIcon({ className }: { className?: string }) {
  return <BrandIcon slug="gmail" colored className={className} />;
}

function LinkedInIcon({ className }: { className?: string }) {
  return <BrandIcon slug="linkedin" colored className={className} />;
}

function GitHubIcon({ className }: { className?: string }) {
  return <BrandIcon slug="github" colored className={className} />;
}

function CredlyIcon({ className }: { className?: string }) {
  return <BrandIcon slug="credly" colored className={className} />;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return <BrandIcon slug="whatsapp" colored className={className} />;
}

/** Only entries whose value is configured become real links. */
function buildLinks(): ContactLink[] {
  const links: ContactLink[] = [];

  if (contact.email) {
    links.push({
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: GmailIcon,
    });
  }
  if (contact.linkedin) {
    links.push({
      label: "LinkedIn",
      value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.linkedin,
      icon: LinkedInIcon,
      external: true,
    });
  }
  if (contact.github) {
    links.push({
      label: "GitHub",
      value: contact.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.github,
      icon: GitHubIcon,
      external: true,
    });
  }
  if (contact.credly) {
    links.push({
      label: "Credly",
      value: contact.credly.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.credly,
      icon: CredlyIcon,
      external: true,
    });
  }
  if (contact.whatsapp) {
    links.push({
      label: "WhatsApp",
      value: contact.phone || "Message on WhatsApp",
      href: contact.whatsapp,
      icon: WhatsAppIcon,
      external: true,
    });
  } else if (contact.phone) {
    links.push({
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
      icon: Phone,
    });
  }
  if (contact.cvUrl) {
    links.push({
      label: "CV",
      value: "Download CV",
      href: contact.cvUrl,
      icon: Download,
      download: true,
    });
  }

  return links;
}

/** Contact and social links, closing the page after the projects. */
export function ContactTile({ className }: { className?: string }) {
  const links = buildLinks();

  return (
    // scroll-mt keeps the sticky header clear of the anchor target
    <Card id="contact" className={cn("scroll-mt-20", className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-accent">
            GET IN TOUCH
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {profile.location ? `Based in ${profile.location}. ` : null}Open
            to WordPress roles and projects: sites, WooCommerce stores and CRM
            integration.
          </p>
        </div>

        {links.length > 0 ? (
          <ul className="flex flex-wrap gap-2.5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    download={link.download || undefined}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2.5 rounded-xl bg-background px-3.5 py-2.5 hover:bg-accent-soft"
                  >
                    <Icon aria-hidden className="size-4 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {link.value}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}
