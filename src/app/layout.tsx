import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { profile } from "@/config/site";
import { getExperienceYears } from "@/lib/figures";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// The year count comes from the experience dates, so it stays current on each build.
const description = `${profile.name} — ${profile.title} in ${profile.location} with ${getExperienceYears()} years of software development experience. WordPress sites, multilingual websites and WooCommerce stores built with Elementor, and CRM integrations with HubSpot, Odoo and Monday.com.`;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title} | WooCommerce & Elementor`,
  description,
  keywords: [
    "WordPress Developer UAE",
    "WooCommerce",
    "Elementor",
    "Multilingual WordPress",
    "WordPress SEO",
    "CRM Integration",
    "HubSpot",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
