/**
 * Single place to edit every piece of real-world data on this site.
 *
 * Anything left as an empty string is treated as "not provided yet": the
 * component hides the link or shows a neutral placeholder instead of
 * rendering a broken URL. Never fill these with invented values.
 */

import type { BrandSlug } from "@/components/ui/brand-icon";

export const profile = {
  name: "Afthal Ahmadh",
  title: "WordPress Developer",
  subtitle: "WordPress, WooCommerce & Elementor, with CRM Integration",
  /** Shown as the current position badge in the intro grid. */
  currentRole: "WordPress Developer",
  /** One-line value proposition on the intro tile. */
  tagline:
    "I build WordPress sites and WooCommerce stores that businesses can run themselves.",
  /** Short overview under the tagline on the intro tile. */
  overview:
    "Business sites, multilingual websites and WooCommerce stores in WordPress and Elementor, optimised for speed, security and SEO, and connected to CRMs.",
  photo: "/afthal-ahmadh.png",
  location: "United Arab Emirates",
};

export const contact = {
  email: "ahmatafthal@gmail.com",
  phone: "", // e.g. "+971 50 000 0000"
  whatsapp: "", // full wa.me URL, e.g. "https://wa.me/971500000000"
  linkedin: "https://www.linkedin.com/in/afthal-ahmadh",
  github: "https://github.com/afthalad",
  credly: "https://www.credly.com/users/afthal-ahmadh",
  /**
   * Path or URL to a real CV file. Put the PDF in /public and set this to
   * "/afthal-ahmadh-cv.pdf". While empty, the CV buttons are disabled.
   */
  cvUrl: "/afthal-ahmadh-cv.pdf",
};

export type Experience = {
  role: string;
  company: string;
  /** Start month, "YYYY-MM". */
  start: string;
  /** End month, "YYYY-MM"; empty means the role is current. */
  end: string;
  points: string[];
};

/**
 * Software roles, newest first. The earliest start drives the
 * years-of-experience figure. Non-software roles stay off the site (the CV
 * script lists them separately).
 */
export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Imara Software Solutions",
    start: "2023-05",
    end: "",
    points: [
      "Build backends with Node.js and Laravel, and custom REST APIs for clients and third-party apps.",
      "Integrate CRMs such as HubSpot, Odoo and Monday.com using Make.com and n8n.",
      "Teach web development as an instructor at IMTS.",
      "Develop robust, user-friendly Flutter applications to meet client requirements.",
      "Collaborate with co-developers through GitHub and AWS CodeCommit.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Imara Software Solutions",
    start: "2023-02",
    end: "2023-04",
    points: [
      "Created responsive, visually appealing interfaces with HTML, CSS and JavaScript.",
      "Implemented enterprise application platforms with React, AWS and MongoDB.",
      "Built scalable backends with Node.js, Express and the Laravel MVC framework.",
      "Implemented and integrated RESTful APIs.",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Upwork.com, Freelancer.com",
    start: "2019-07",
    end: "2022-12",
    points: [
      "Built responsive, user-friendly websites with WordPress.",
      "Optimised site performance, security and search engine optimisation (SEO).",
      "Troubleshot and resolved technical issues and bugs on WordPress sites.",
      "Built mobile apps and web apps for clients, from requirements to release.",
    ],
  },
];

export type Education = { title: string; detail: string };

/** Qualifications, shown beside the experience timeline. */
export const education: Education[] = [
  { title: "Diploma in Professional Web Development", detail: "IMTS" },
  {
    title: "Diploma in Computer Applications (DICA)",
    detail: "Refresh Metro Campus, Puttalam",
  },
  { title: "Microsoft Office Specialist (MOS)", detail: "Microsoft" },
  { title: "Bachelor's degree", detail: "Online, starting 2027" },
];

/** The only kinds of work this portfolio shows, in tab order. */
export const categories = [
  { id: "wordpress", label: "WordPress Sites" },
  { id: "woocommerce", label: "WooCommerce Stores" },
  { id: "crm", label: "CRM" },
] as const;

export type ProjectCategory = (typeof categories)[number]["id"];

export type ProjectLink = { label: string; url: string };

export type Project = {
  name: string;
  category: ProjectCategory;
  /** One line on what it is or where it is used. */
  useCase: string;
  /** "Live" when the scenario is running in production. */
  status?: string;
  /** A short paragraph for apps and websites. */
  description?: string;
  /** Problem / solution, used for automation and CRM work. */
  problem?: string;
  solution?: string;
  tools: string[];
  outcome?: string; // only fill when the result is verified
  /** Landscape screenshot in /public/projects (websites, scenarios). */
  image?: string;
  /** Portrait phone screens in /public/projects/apps, shown side by side. */
  screenshots?: string[];
  /** App icon shown beside the name. */
  icon?: string;
  /** Brand mark used as the card visual when there is no screenshot. */
  brand?: BrandSlug;
  /** Lettermark visual for platforms with no published brand mark. */
  letters?: string;
  /** Store listings, live sites, repositories. Empty = no links. */
  links: ProjectLink[];
};

const site = (url: string): ProjectLink => ({ label: "Visit site", url });

/**
 * Real projects only. Website text is a short summary of the live site, the
 * image is a capture of it, and the tools are what the site actually loads.
 * No invented metrics and no client names.
 */
export const projects: Project[] = [
  // WordPress sites
  {
    name: "ClickReport",
    category: "wordpress",
    useCase: "Website for report-writing software for school psychologists",
    description:
      "Product site with free-trial sign-up, demo booking and a member login.",
    tools: ["WordPress", "Avada", "Gravity Forms", "MemberPress"],
    image: "/projects/sites/clickreport.jpg",
    links: [site("https://schoolpsychclickreport.com/")],
  },
  {
    name: "Puttalam Municipal Council",
    category: "wordpress",
    useCase: "Official council website in English, Sinhala and Tamil",
    description:
      "Public services, notices, news, projects and emergency numbers for residents of Puttalam.",
    tools: ["WordPress", "Elementor", "Astra", "Custom plugin", "Multilingual"],
    image: "/projects/sites/puttalam-mc.jpg",
    links: [site("https://puttalam.mc.gov.lk/")],
  },
  {
    name: "BidayaBook Website",
    category: "wordpress",
    useCase: "Store and learning hub for the Bidaya Quran books",
    description:
      "Shop links by region, courses, events, workshops and media for the Bidaya series.",
    tools: ["WordPress", "Elementor Pro"],
    image: "/projects/sites/bidayabook-web.jpg",
    links: [site("https://bidayabook.com/")],
  },
  {
    name: "PivotIRL Website",
    category: "wordpress",
    useCase: "Marketing site for the Pivot IRL app",
    description:
      "Landing page that explains the app, its use cases and features, and sends visitors to download it.",
    tools: ["WordPress", "Elementor Pro"],
    image: "/projects/sites/pivotirl-web.jpg",
    links: [site("https://pivotirl.com/")],
  },

  // WooCommerce stores
  {
    name: "The Design Collective Store",
    category: "woocommerce",
    useCase: "Online store for Sri Lankan and South Asian designer brands",
    description:
      "Fashion, accessories, kids, interiors and gifting from multiple brands, with multi-currency shopping.",
    tools: ["WordPress", "WooCommerce", "Elementor Pro", "Rey", "Multi-currency"],
    image: "/projects/sites/design-collective.jpg",
    links: [site("https://thedesigncollectivestore.com/")],
  },
  {
    name: "Max Precision Lab",
    category: "woocommerce",
    useCase: "E-commerce for lab reagents and consumables",
    description:
      "Product catalogue and shop for a lab-supply company, with category search and English, French and Spanish versions.",
    tools: ["WordPress", "WooCommerce", "WPBakery", "Porto", "WooCommerce Multilingual"],
    image: "/projects/sites/max-precision-lab.jpg",
    links: [site("https://maxprecisionlab.com/")],
  },

  // CRM platforms
  {
    name: "Odoo Integration",
    category: "crm",
    useCase: "Odoo connected to the rest of the business",
    description:
      "Odoo wired into automation workflows so records sync with other tools without manual re-entry.",
    tools: ["Odoo", "Make.com", "n8n", "APIs"],
    brand: "odoo",
    links: [],
  },
  {
    name: "HubSpot CRM Workflows",
    category: "crm",
    useCase: "Leads, contacts and deals kept current in HubSpot",
    description:
      "Lead and deal workflows that create, match and update HubSpot records from outreach tools, forms and webhooks.",
    tools: ["HubSpot", "Make.com", "Webhooks"],
    brand: "hubspot",
    links: [],
  },
  {
    name: "Monday.com Integration",
    category: "crm",
    useCase: "Monday.com boards fed by automated workflows",
    description:
      "Monday.com integrated into automation scenarios so items and updates flow in from other business apps.",
    tools: ["Monday.com", "Make.com", "n8n"],
    brand: "monday",
    links: [],
  },
];


export type Technology = {
  label: string;
  /** Official brand mark (see components/ui/brand-icon.tsx). */
  brand?: BrandSlug;
  /** Lettermark for services with no published mark. */
  letters?: string;
  /** Generic concepts get a neutral icon. */
  icon?: "api" | "webhook" | "hosting" | "language" | "performance" | "security" | "seo";
};

/** Technologies I use, grouped. Brand slugs come from brand-icon.tsx. */
export const technologies: { title: string; items: Technology[] }[] = [
  {
    title: "WORDPRESS",
    items: [
      { label: "WordPress", brand: "wordpress" },
      { label: "WooCommerce", brand: "woocommerce" },
      { label: "Elementor", brand: "elementor" },
      { label: "PHP", brand: "php" },
      { label: "Multilingual", icon: "language" },
    ],
  },
  {
    title: "WEB",
    items: [
      { label: "HTML5", brand: "html5" },
      { label: "CSS", brand: "css" },
      { label: "JavaScript", brand: "javascript" },
      { label: "React", brand: "react" },
      { label: "JSON", brand: "json" },
      { label: "Git", brand: "git" },
    ],
  },
  {
    title: "SITE CARE",
    items: [
      { label: "Performance", icon: "performance" },
      { label: "Security", icon: "security" },
      { label: "SEO", icon: "seo" },
      { label: "Server hosting", icon: "hosting" },
    ],
  },
  {
    title: "CRM & INTEGRATION",
    items: [
      { label: "HubSpot", brand: "hubspot" },
      { label: "Odoo", brand: "odoo" },
      { label: "Monday.com", brand: "monday" },
      { label: "Make.com", brand: "make" },
      { label: "n8n", brand: "n8n" },
      { label: "REST APIs", icon: "api" },
    ],
  },
];

/**
 * My other portfolios, linked from the footer. Empty URLs are hidden until
 * the sites are live.
 */
export const otherPortfolios = [
  { label: "General portfolio", url: "" },
  { label: "Automation portfolio", url: "" },
  { label: "Mobile apps portfolio", url: "" },
];

export const navItems = [
  { label: "Overview", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Technologies", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];
