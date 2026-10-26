import {
  siCredly,
  siCss,
  siElementor,
  siGit,
  siGmail,
  siHtml5,
  siHubspot,
  siJavascript,
  siJson,
  siMake,
  siN8n,
  siOdoo,
  siPhp,
  siReact,
  siWhatsapp,
  siWoocommerce,
  siWordpress,
} from "simple-icons";
import { extraMarks, type Mark } from "@/components/ui/brand-marks";
import { cn } from "@/lib/utils";

/** simple-icons entries carry a single path; normalise them to the Mark shape. */
function fromSimpleIcon(icon: {
  title: string;
  hex: string;
  path: string;
}): Mark {
  return { title: icon.title, hex: icon.hex, paths: [icon.path] };
}

const marks = {
  wordpress: fromSimpleIcon(siWordpress),
  woocommerce: fromSimpleIcon(siWoocommerce),
  elementor: fromSimpleIcon(siElementor),
  php: fromSimpleIcon(siPhp),
  html5: fromSimpleIcon(siHtml5),
  css: fromSimpleIcon(siCss),
  javascript: fromSimpleIcon(siJavascript),
  react: fromSimpleIcon(siReact),
  json: fromSimpleIcon(siJson),
  git: fromSimpleIcon(siGit),
  hubspot: fromSimpleIcon(siHubspot),
  odoo: fromSimpleIcon(siOdoo),
  make: fromSimpleIcon(siMake),
  n8n: fromSimpleIcon(siN8n),
  gmail: fromSimpleIcon(siGmail),
  credly: fromSimpleIcon(siCredly),
  whatsapp: fromSimpleIcon(siWhatsapp),
  github: extraMarks.github,
  linkedin: extraMarks.linkedin,
  monday: extraMarks.monday,
} satisfies Record<string, Mark>;

export type BrandSlug = keyof typeof marks;

export function BrandIcon({
  slug,
  className,
  colored = false,
}: {
  slug: BrandSlug;
  className?: string;
  colored?: boolean;
}) {
  const mark: Mark = marks[slug];

  return (
    <svg
      role="img"
      aria-label={mark.title}
      viewBox={mark.viewBox ?? "0 0 24 24"}
      className={cn("size-5", className)}
      fill={colored ? `#${mark.hex}` : "currentColor"}
      fillRule={mark.evenOdd ? "evenodd" : undefined}
      clipRule={mark.evenOdd ? "evenodd" : undefined}
    >
      {mark.paths.map((path, i) => (
        // Multi-colour logos carry a colour per path.
        <path
          key={path}
          d={path}
          fill={colored ? mark.fills?.[i] : undefined}
        />
      ))}
    </svg>
  );
}

/**
 * Services with no published mark in either icon set get a neutral lettermark
 * rather than an approximated logo.
 */
export function LetterMark({
  letters,
  className,
}: {
  letters: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-6 items-center justify-center rounded-md bg-foreground text-[0.6rem] font-bold tracking-tight text-background",
        className,
      )}
    >
      {letters}
    </span>
  );
}
