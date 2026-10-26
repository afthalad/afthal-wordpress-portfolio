import { experience } from "@/config/site";
import { wholeYearsSince } from "@/lib/dates";

/**
 * Years of software development experience, derived from the experience
 * dates so it never drifts from the timeline. Roles are listed newest first,
 * so the last entry is where the career started.
 */
export function getExperienceYears() {
  return wholeYearsSince(experience[experience.length - 1].start);
}
