// src/lib/mapping/estimates.ts

export type ComplexityId = "simple" | "standard" | "complex";
export type TimelineId = "rush" | "standard" | "flexible";

export type ComplexityOption = {
  id: ComplexityId;
  label: string;
  description: string;
  multiplier: number; // applied to every deliverable's hours
};

export type TimelineOption = {
  id: TimelineId;
  label: string;
  description: string;
  surcharge: number; // fraction added to the subtotal (0.25 = +25%)
};

export const COMPLEXITY_OPTIONS: ComplexityOption[] = [
  {
    id: "simple",
    label: "Simple",
    description: "Few pages or screens, standard patterns, minimal custom logic.",
    multiplier: 0.8,
  },
  {
    id: "standard",
    label: "Standard",
    description: "Typical scope with some custom components and integrations.",
    multiplier: 1,
  },
  {
    id: "complex",
    label: "Complex",
    description: "Custom interactions, many stakeholders or tricky integrations.",
    multiplier: 1.35,
  },
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  {
    id: "rush",
    label: "Rush",
    description: "Needs to ship ASAP. Includes a 25% priority surcharge.",
    surcharge: 0.25,
  },
  {
    id: "standard",
    label: "Standard",
    description: "Scheduled at a regular pace.",
    surcharge: 0,
  },
  {
    id: "flexible",
    label: "Flexible",
    description: "No hard deadline. Work fits around other projects.",
    surcharge: 0,
  },
];

export const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "MXN", "AUD"] as const;

// Used to turn total hours into an approximate calendar duration
export const HOURS_PER_WEEK = 30;

export function getComplexity(id: string) {
  return COMPLEXITY_OPTIONS.find((option) => option.id === id) ?? COMPLEXITY_OPTIONS[1];
}

export function getTimeline(id: string) {
  return TIMELINE_OPTIONS.find((option) => option.id === id) ?? TIMELINE_OPTIONS[1];
}
