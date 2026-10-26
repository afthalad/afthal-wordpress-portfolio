import { contact, otherPortfolios, profile } from "@/config/site";

/** Only links that are actually configured are rendered. */
const quickLinks = [
  { label: "Email", href: contact.email ? `mailto:${contact.email}` : "" },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "Credly", href: contact.credly },
].filter((link) => link.href);

/** My other portfolios; the row stays hidden until one has a live URL. */
const portfolios = otherPortfolios.filter((portfolio) => portfolio.url);

export function Footer() {
  return (
    <footer className="pb-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="rounded-card bg-surface px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-muted">
                {profile.title} · {profile.subtitle}
              </p>
            </div>

            {quickLinks.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-medium text-muted hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {portfolios.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted">
                MORE OF MY WORK
              </p>
              {portfolios.map((portfolio) => (
                <a
                  key={portfolio.label}
                  href={portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent hover:text-accent-strong"
                >
                  {portfolio.label}
                </a>
              ))}
            </div>
          ) : null}

          <p className="mt-6 text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
