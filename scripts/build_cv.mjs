/**
 * Builds the CV PDF served by the site's Download CV button.
 *
 * The CV is laid out as HTML (Poppins, blue headings) and printed to A4 by
 * headless Chrome, which keeps every link clickable. Content mirrors
 * src/config/site.ts plus the CV-only items marked below.
 *
 * Run:  npm run cv
 * Set CHROME to the browser binary if Chrome is not in /Applications.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { siGmail } from "simple-icons";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/afthal-ahmadh-cv.pdf");
const FONTS = join(root, "scripts/cv/fonts");
const CHROME =
  process.env.CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const BLUE = "#1C75BC";

// --- content ----------------------------------------------------------------

const name = "Amandeen Afthal Ahmadh";

const contact = {
  location: "United Arab Emirates",
  email: "ahmatafthal@gmail.com",
  linkedin: "https://www.linkedin.com/in/afthal-ahmadh",
  github: "https://github.com/afthalad",
};

/** First software role; keep in step with the earliest start in site.ts. */
const careerStart = new Date(2019, 6, 1);
const now = new Date();
const years = Math.floor(
  ((now.getFullYear() - careerStart.getFullYear()) * 12 +
    now.getMonth() -
    careerStart.getMonth() +
    1) /
    12,
);

const profile =
  `WordPress Developer with ${years}+ years of experience building business websites, ` +
  "multilingual sites and WooCommerce stores with WordPress and Elementor, optimised for " +
  "performance, security and SEO. I also build Laravel and Node.js backends with custom " +
  "REST APIs, and integrate HubSpot, Odoo and Monday.com.";

const skills = [
  "WordPress / WooCommerce / Elementor / Make.com / n8n / Zapier",
  "Flutter / Dart / SwiftUI / React / Next.js / JavaScript / HTML / CSS",
  "PHP / Laravel / Node / Express / Python / REST / GraphQL / SOAP API",
  "Firebase / MongoDB / PostgreSQL / MySQL / SQL / NoSQL",
  "HubSpot / Odoo / Monday.com / Git / AWS / AWS CodeCommit / FCM / Selenium",
];

const imara = "https://www.imarasoft.net/";

/** Includes the non-software role the website leaves out. */
const experience = [
  {
    role: "Software Developer",
    company: "Imara Software Solutions",
    url: imara,
    dates: "May 2023 - Present",
    points: [
      "Develop robust and user-friendly Flutter applications to meet client requirements.",
      "Build backends with Node.js and Laravel, and custom REST APIs for clients and third-party apps.",
      "Build Make.com and n8n automations and integrate HubSpot, Odoo and Monday.com.",
      "Automate web applications with Python, Selenium, bs4, Requests and lxml.",
      "Conduct lectures as a web development instructor at IMTS.",
      "Collaborate with co-developers using GitHub and AWS CodeCommit.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Imara Software Solutions",
    url: imara,
    dates: "Feb 2023 - Apr 2023",
    points: [
      "Created responsive, visually appealing interfaces with HTML, CSS and JavaScript.",
      "Implemented enterprise application platforms with React, AWS and MongoDB.",
      "Built scalable backends with Node, Express and the Laravel MVC framework.",
      "Implemented and integrated RESTful APIs.",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Upwork.com, Freelancer.com",
    url: "",
    dates: "Jul 2019 - Dec 2022",
    points: [
      "Built responsive, user-friendly websites with WordPress.",
      "Optimised site performance, security and search engine optimisation (SEO).",
      "Troubleshot and resolved technical issues and bugs on WordPress sites.",
      "Built mobile apps and web apps for clients, from requirements to release.",
    ],
  },
  {
    role: "Production Manager",
    company: "Reshma Motors (PVT) Ltd",
    url: "",
    dates: "Jan 2022 - Jun 2022",
    points: [
      "Monitored production standards, including safety protocols and quality control.",
      "Assigned tasks and responsibilities to production team members.",
      "Managed inventory levels and coordinated with the materials management team.",
    ],
  },
];

const appStore = (path) => `https://apps.apple.com/${path}`;
const play = (id) => `https://play.google.com/store/apps/details?id=${id}`;

/** [name, description, link]. Polima and Athaner are no longer listed, so no link. */
const projects = {
  "Web & WordPress": [
    ["PivotIRL", "Marketing site for the Pivot IRL app", "https://pivotirl.com/"],
    ["ClickReport", "Product site for report software for school psychologists", "https://schoolpsychclickreport.com/"],
    ["Puttalam Municipal Council", "Official council site in English, Sinhala and Tamil", "https://puttalam.mc.gov.lk/"],
    ["Bidayabook", "Fully responsive WordPress site with Elementor", "https://bidayabook.com/"],
    ["The Design Collective", "WooCommerce store for South Asian designer brands", "https://thedesigncollectivestore.com/"],
    ["Max Precision Lab", "WooCommerce shop for lab reagents in three languages", "https://maxprecisionlab.com/"],
    ["Puttalam Grounds", "Futsal ground booking across Sri Lanka, Next.js and React", "https://www.puttalamgrounds.xyz/"],
  ],
  "CRM & automation": [
    ["HubSpot deal flows", "Outreach replies turned into HubSpot deals, Make.com and OpenAI", ""],
    ["Odoo & Monday.com", "CRM and boards fed by automated workflows, Make.com and n8n", ""],
    ["Slack membership", "Paid community access granted and revoked from SamCart, Make.com", ""],
  ],
  "Mobile apps": [
    ["Pivot IRL", "Digital-wellness app for cutting screen time, built with SwiftUI", appStore("us/app/pivot-irl/id6760004980")],
    ["FocusBoat", "Focus sessions with Screen Time app blocking and friends' crews, SwiftUI", appStore("sa/app/focusboat-focus-with-friends/id6776684964")],
    ["NoorHabit", "Gentle Islamic habit tracker with per-practice streaks, SwiftUI", appStore("us/app/noorhabit-islamic-habits/id6795562659")],
    ["BidayaBook", "Quran-learning app for the Bidaya book series, SwiftUI", appStore("us/app/bidayabook/id994425502")],
    ["Focus Boat", "Pomodoro timer where each session sails a boat forward, Flutter", play("com.adacreations.focusboat")],
    ["Cryzer", "AI baby-cry analyser with practical tips for parents, Flutter", play("com.adacreations.cryzer")],
    ["Kicky", "Baby kick counter for expecting mothers, Flutter", play("com.adacreations.kicky")],
    ["Past Papers", "Sinhala and Tamil exam papers, Flutter, Node.js, MongoDB, Python automation", play("com.afthal.pastpapers")],
    ["Palos Islamic Center", "Masjid management app with Flutter, Laravel and FCM", play("com.starstechgroup.palosMasjid")],
    ["Masjid Furqaan", "Masjid management app with Flutter, Laravel and FCM", play("com.starstechgroup.furqaanMasjid")],
    ["Polima", "Sri Lanka fuel crisis solution app with Flutter and Firebase", ""],
    ["Athaner", "Sri Lankan Muslim prayer time notifier with Flutter and API", ""],
  ],
};

const education = [
  ["Bachelor's degree", "Online, starting 2027", ""],
  ["Diploma in Professional Web Development", "IMTS", ""],
  ["Diploma in Computer Applications (DICA)", "Refresh Metro Campus, Puttalam",
    "https://www.google.com/maps/place/Refresh+Metro+Campus/@8.0328405,79.8296333,17z"],
  ["Microsoft Office Specialist (MOS)", "Microsoft.com",
    "https://learn.microsoft.com/en-us/certifications/microsoft-office-specialist-expert-2019/"],
  ["Make Academy, 9 badges", "Credly", "https://www.credly.com/users/afthal-ahmadh"],
];

// --- icons --------------------------------------------------------------------

/** LinkedIn and GitHub paths come from the site's own brand marks. */
const marks = readFileSync(join(root, "src/components/ui/brand-marks.ts"), "utf8");
const markPath = (key) =>
  marks.match(new RegExp(`"${key}":\\s*{[\\s\\S]*?"paths":\\s*\\[\\s*"([^"]+)"`))[1];

const icon = (path, color) =>
  `<svg viewBox="0 0 24 24" fill="${color}" aria-hidden="true"><path d="${path}"/></svg>`;

const icons = {
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="${BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  email: icon(siGmail.path, `#${siGmail.hex}`),
  linkedin: icon(markPath("linkedin"), "#0A66C2"),
  github: icon(markPath("github"), "#181717"),
};

// --- template -----------------------------------------------------------------

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const a = (url, text) =>
  url ? `<a href="${url}">${esc(text)}</a>` : esc(text);

const font = (weight, file) => `
  @font-face {
    font-family: "Poppins";
    font-weight: ${weight};
    src: url("${pathToFileURL(join(FONTS, file)).href}") format("truetype");
  }`;

const section = (title, body) => `
  <section>
    <h2><span>${title}</span></h2>
    ${body}
  </section>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${name} — CV</title>
<style>
  ${font(400, "Poppins-Regular.ttf")}
  ${font(500, "Poppins-Medium.ttf")}
  ${font(600, "Poppins-SemiBold.ttf")}
  ${font(700, "Poppins-Bold.ttf")}

  @page { size: A4; margin: 13mm 15mm 12mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Poppins", sans-serif;
    font-size: 9.6pt;
    line-height: 1.6;
    color: #222;
  }
  a { color: ${BLUE}; text-decoration: underline; text-underline-offset: 2px; }

  header { text-align: center; }
  h1 { font-size: 25pt; font-weight: 700; line-height: 1.15; color: #111; }
  .contact {
    margin-top: 6px;
    display: flex; justify-content: center; flex-wrap: wrap;
    font-size: 9pt; font-weight: 500;
  }
  .contact span { display: inline-flex; align-items: center; gap: 5px; padding: 0 11px; }
  .contact span + span { border-left: 1.2px solid #222; }
  .contact svg { width: 13px; height: 13px; flex: none; }
  .contact span:first-child { color: #222; }

  section { margin-top: 15px; }
  h2 {
    display: flex; align-items: center; gap: 14px;
    font-size: 12.5pt; font-weight: 600; color: ${BLUE};
    break-after: avoid;
  }
  h2::after { content: ""; flex: 1; border-top: 1px solid #222; }
  h3 { font-size: 9.8pt; font-weight: 600; color: #111; margin: 8px 0 1px; break-after: avoid; }

  p.profile { margin-top: 6px; }
  ul { margin-top: 5px; padding-left: 22px; }
  li { padding-left: 3px; margin: 1.5px 0; }
  li::marker { color: #222; }

  .job { margin-top: 10px; break-inside: avoid; }
  .job-head {
    display: grid; grid-template-columns: 1fr 1.3fr 1fr; align-items: baseline;
    font-weight: 600; font-size: 10.4pt; color: #111; padding-left: 8px;
  }
  .job-head .company { text-align: center; color: ${BLUE}; }
  .job-head .dates { text-align: right; }

  .edu .row { display: grid; grid-template-columns: 1.15fr 1fr; gap: 12px; }
  .projects li a { font-weight: 500; }
  .nolink { font-weight: 500; color: #111; }
</style>
</head>
<body>
  <header>
    <h1>${name}</h1>
    <div class="contact">
      <span>${icons.location}${contact.location}</span>
      <span>${icons.email}${a(`mailto:${contact.email}`, contact.email)}</span>
      <span>${icons.linkedin}${a(contact.linkedin, "LinkedIn")}</span>
      <span>${icons.github}${a(contact.github, "GitHub")}</span>
    </div>
  </header>

  ${section("Profile", `<p class="profile">${esc(profile)}</p>`)}

  ${section("Skills", `<ul>${skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`)}

  ${section("Experience", experience.map((job) => `
    <div class="job">
      <div class="job-head">
        <span>${esc(job.role)}</span>
        <span class="company">${a(job.url, job.company)}</span>
        <span class="dates">${esc(job.dates)}</span>
      </div>
      <ul>${job.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>`).join(""))}

  ${section("Projects", Object.entries(projects).map(([group, items]) => `
    <h3>${esc(group)}</h3>
    <ul class="projects">${items.map(([n, d, url]) =>
      `<li>${url ? a(url, n) : `<span class="nolink">${esc(n)}</span>`} - ${esc(d)}</li>`).join("")}
    </ul>`).join(""))}

  ${section("Education & Certifications", `
    <ul class="edu">${education.map(([title, where, url]) =>
      `<li><span class="row"><span>${esc(title)}</span><span>${a(url, where)}</span></span></li>`).join("")}
    </ul>`)}
</body>
</html>`;

// --- print ----------------------------------------------------------------------

const dir = mkdtempSync(join(tmpdir(), "cv-"));
const page = join(dir, "cv.html");
writeFileSync(page, html);

execFileSync(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${join(dir, "profile")}`,
  "--no-pdf-header-footer",
  `--print-to-pdf=${OUT}`,
  pathToFileURL(page).href,
], { stdio: "ignore" });

console.log("written", OUT);
