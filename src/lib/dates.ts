/** Helpers for the experience dates. Months are "YYYY-MM". */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parse(month: string) {
  const [year, m] = month.split("-").map(Number);
  return { year, month: m };
}

/** "2023-05" -> "May 2023" */
function formatMonth(month: string) {
  const { year, month: m } = parse(month);
  return `${MONTHS[m - 1]} ${year}`;
}

/** "May 2023 — Present" */
export function formatRange(start: string, end: string) {
  if (!start) return "";
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/** Whole years elapsed since a "YYYY-MM" start, rounded down. */
export function wholeYearsSince(start: string, now = new Date()) {
  if (!start) return 0;
  const { year, month } = parse(start);
  const months =
    (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month) + 1;
  return Math.max(0, Math.floor(months / 12));
}
