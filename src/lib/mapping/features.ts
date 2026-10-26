// src/lib/mapping/features.ts

import type { ProjectTypeId } from "./project-types";

export type Feature = {
  id: string;
  label: string;         // shown in UI
  description?: string;  // short description
  category: string;      // category
  hours: number;         // base effort estimate, adjusted by complexity
  types?: ProjectTypeId[]; // only offered for these project types (all if omitted)
};

export const FEATURES: Feature[] = [
  {
    id: "blog",
    label: "Blog / News",
    description: "Post type, archive, categories, search",
    category: "Content",
    hours: 12,
    types: ["website", "ecommerce", "other"],
  },
  {
    id: "contact_forms",
    label: "Contact Forms",
    description: "Forms with validation, spam protection and email notifications",
    category: "Content",
    hours: 6,
  },
  {
    id: "cms_training",
    label: "CMS Training & Docs",
    description: "Walkthrough session and editor documentation",
    category: "Content",
    hours: 6,
    types: ["website", "ecommerce", "web-app", "other"],
  },
  {
    id: "seo_baseline",
    label: "SEO Baseline",
    description: "Sitemap, OG tags, schema markup",
    category: "SEO & Perf",
    hours: 8,
    types: ["website", "ecommerce", "web-app", "other"],
  },
  {
    id: "perf",
    label: "Performance",
    description: "Caching, CDN, image optimization",
    category: "SEO & Perf",
    hours: 10,
  },
  {
    id: "accessibility",
    label: "Accessibility",
    description: "WCAG 2.2 AA audit and fixes",
    category: "SEO & Perf",
    hours: 12,
  },
  {
    id: "i18n",
    label: "Multilingual",
    description: "Multiple languages and switcher",
    category: "System",
    hours: 24,
  },
  {
    id: "headless",
    label: "Headless",
    description: "Expose WP API, integrate with React",
    category: "System",
    hours: 40,
    types: ["website", "ecommerce", "other"],
  },
  {
    id: "user_accounts",
    label: "User Accounts",
    description: "Registration, login, profiles and member-only content",
    category: "System",
    hours: 24,
  },
  {
    id: "admin_dashboard",
    label: "Admin Dashboard",
    description: "Back-office screens to manage data and users",
    category: "System",
    hours: 32,
    types: ["web-app", "mobile-app", "other"],
  },
  {
    id: "integrations",
    label: "Third-party Integrations",
    description: "CRM, ERP, newsletter or other external APIs",
    category: "System",
    hours: 20,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "GA4 or PostHog event tracking",
    category: "System",
    hours: 6,
  },
  {
    id: "push_notifications",
    label: "Push Notifications",
    description: "Notification service, permissions and campaigns",
    category: "System",
    hours: 16,
    types: ["mobile-app", "web-app"],
  },
  {
    id: "payments",
    label: "Online Payments",
    description: "Stripe or PayPal checkout and receipts",
    category: "Commerce",
    hours: 16,
  },
  {
    id: "booking",
    label: "Bookings / Appointments",
    description: "Availability calendar, reservations and reminders",
    category: "Commerce",
    hours: 20,
  },
  {
    id: "giftcards",
    label: "Gift Cards",
    description: "WooCommerce virtual products + emails",
    category: "Commerce",
    hours: 16,
    types: ["ecommerce", "website"],
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    description: "Recurring billing and plan management",
    category: "Commerce",
    hours: 24,
  },
  {
    id: "support",
    label: "Post-launch Support",
    description: "30 days of bug fixes and small tweaks after launch",
    category: "Support",
    hours: 10,
  },
];

export function getFeaturesForType(type: string | null) {
  return FEATURES.filter(
    (feature) =>
      !feature.types || feature.types.some((featureType) => featureType === type)
  );
}
