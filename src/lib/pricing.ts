// src/lib/pricing.ts

import type { FormData, LineItem, Settings } from "../store/wizard-store";
import { CONSTRAINT_DELIVERABLES, TYPE_DELIVERABLES, type Deliverable } from "./mapping/deliverables";
import { getComplexity, getTimeline, HOURS_PER_WEEK } from "./mapping/estimates";
import { getFeaturesForType } from "./mapping/features";
import type { ProjectTypeId } from "./mapping/project-types";

export interface Totals {
  hours: number;
  subtotal: number;
  rush: number;
  contingency: number;
  discount: number;
  tax: number;
  total: number;
  deposit: number;
  weeks: number;
}

// Round to the nearest half hour so estimates look intentional
function roundHours(hours: number) {
  return Math.max(0.5, Math.round(hours * 2) / 2);
}

function toLineItem(deliverable: Deliverable, multiplier: number, idPrefix: string): LineItem {
  return {
    id: `${idPrefix}-${deliverable.id}`,
    label: deliverable.label,
    description: deliverable.description ?? "",
    category: deliverable.category,
    hours: roundHours(deliverable.hours * multiplier),
    rate: null,
  };
}

// Turns the wizard answers into an editable list of priced line items
export function buildLineItems(formData: FormData): LineItem[] {
  const type = (formData.type ?? "other") as ProjectTypeId;
  const { multiplier } = getComplexity(formData.complexity);

  const base = (TYPE_DELIVERABLES[type] ?? TYPE_DELIVERABLES.other).map((d) =>
    toLineItem(d, multiplier, "base")
  );

  const constraints = Object.entries(formData.constraints).flatMap(([id, value]) =>
    (CONSTRAINT_DELIVERABLES[`${id}:${String(value)}`] ?? []).map((d) =>
      toLineItem(d, multiplier, "constraint")
    )
  );

  // Ignore features that don't apply to the selected type (e.g. type changed later)
  const features = getFeaturesForType(type)
    .filter((feature) => formData.features.includes(feature.id))
    .map((feature) => toLineItem(feature, multiplier, "feature"));

  return [...base, ...constraints, ...features];
}

export function itemAmount(item: LineItem, settings: Settings) {
  return item.hours * (item.rate ?? settings.hourlyRate);
}

export function computeTotals(items: LineItem[], settings: Settings, timeline: string): Totals {
  const hours = items.reduce((sum, item) => sum + item.hours, 0);
  const subtotal = items.reduce((sum, item) => sum + itemAmount(item, settings), 0);
  const rush = subtotal * getTimeline(timeline).surcharge;
  const contingency = (subtotal + rush) * (settings.contingency / 100);
  const discount = (subtotal + rush + contingency) * (settings.discount / 100);
  const tax = (subtotal + rush + contingency - discount) * (settings.tax / 100);
  const total = subtotal + rush + contingency - discount + tax;

  return {
    hours,
    subtotal,
    rush,
    contingency,
    discount,
    tax,
    total,
    deposit: total * (settings.deposit / 100),
    weeks: Math.max(1, Math.ceil(hours / HOURS_PER_WEEK)),
  };
}

export function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

export function formatHours(hours: number) {
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;
}

export function groupByCategory(items: LineItem[]) {
  const groups = new Map<string, LineItem[]>();
  for (const item of items) {
    const category = item.category.trim() || "Other";
    groups.set(category, [...(groups.get(category) ?? []), item]);
  }
  return Array.from(groups, ([category, groupItems]) => ({ category, items: groupItems }));
}
