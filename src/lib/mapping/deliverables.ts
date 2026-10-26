// src/lib/mapping/deliverables.ts

import type { ProjectTypeId } from "./project-types";

export type Deliverable = {
  id: string;
  label: string;         // shown in UI
  description?: string;  // short description
  category: string;      // category
  hours: number;         // base effort estimate, adjusted by complexity
};

// Work that is always part of a project of a given type
export const TYPE_DELIVERABLES: Record<ProjectTypeId, Deliverable[]> = {
  website: [
    { id: "discovery", label: "Discovery & Kickoff", description: "Goals, audience, requirements workshop", category: "Strategy", hours: 6 },
    { id: "ia", label: "Sitemap & Information Architecture", description: "Page structure and navigation", category: "Strategy", hours: 6 },
    { id: "theme", label: "Theme & Page Templates", description: "Responsive templates for all page types", category: "Development", hours: 32 },
    { id: "qa", label: "QA & Cross-browser Testing", description: "Desktop, tablet and mobile testing", category: "Quality", hours: 8 },
    { id: "launch", label: "Launch & Deployment", description: "Hosting setup, DNS, go-live checklist", category: "Launch", hours: 4 },
    { id: "pm", label: "Project Management", description: "Planning, meetings and status reports", category: "Management", hours: 8 },
  ],
  ecommerce: [
    { id: "discovery", label: "Discovery & Kickoff", description: "Goals, catalog and operations workshop", category: "Strategy", hours: 8 },
    { id: "ia", label: "Store Architecture", description: "Categories, navigation and product structure", category: "Strategy", hours: 8 },
    { id: "store_setup", label: "Store Setup", description: "Products, taxes, shipping zones and emails", category: "Development", hours: 16 },
    { id: "theme", label: "Storefront Templates", description: "Home, catalog, product, cart and account pages", category: "Development", hours: 40 },
    { id: "checkout", label: "Checkout & Payment Gateway", description: "Checkout flow and payment provider setup", category: "Development", hours: 12 },
    { id: "qa", label: "QA & Order Testing", description: "End-to-end purchase testing on all devices", category: "Quality", hours: 12 },
    { id: "launch", label: "Launch & Deployment", description: "Hosting setup, DNS, go-live checklist", category: "Launch", hours: 6 },
    { id: "pm", label: "Project Management", description: "Planning, meetings and status reports", category: "Management", hours: 12 },
  ],
  "web-app": [
    { id: "discovery", label: "Discovery & Requirements", description: "User stories and acceptance criteria", category: "Strategy", hours: 16 },
    { id: "architecture", label: "Technical Architecture", description: "Stack, data model and infrastructure plan", category: "Strategy", hours: 12 },
    { id: "core", label: "Core Application Development", description: "Main screens and business logic", category: "Development", hours: 80 },
    { id: "api", label: "API & Database", description: "Endpoints, persistence and validation", category: "Development", hours: 32 },
    { id: "qa", label: "QA & Automated Tests", description: "Unit, integration and manual testing", category: "Quality", hours: 24 },
    { id: "launch", label: "Deployment & CI/CD", description: "Environments, pipelines and monitoring", category: "Launch", hours: 8 },
    { id: "pm", label: "Project Management", description: "Sprint planning, demos and reporting", category: "Management", hours: 20 },
  ],
  "mobile-app": [
    { id: "discovery", label: "Discovery & Requirements", description: "User stories and acceptance criteria", category: "Strategy", hours: 16 },
    { id: "ux_flows", label: "UX Flows", description: "Screen flows and navigation model", category: "Strategy", hours: 12 },
    { id: "core", label: "Core App Development", description: "Main screens and business logic", category: "Development", hours: 100 },
    { id: "api", label: "Backend & API Integration", description: "Data sync, authentication and services", category: "Development", hours: 32 },
    { id: "qa", label: "QA on Real Devices", description: "iOS and Android device testing", category: "Quality", hours: 24 },
    { id: "launch", label: "App Store Submission", description: "Store listings, review and release", category: "Launch", hours: 8 },
    { id: "pm", label: "Project Management", description: "Sprint planning, demos and reporting", category: "Management", hours: 20 },
  ],
  other: [
    { id: "discovery", label: "Discovery & Requirements", description: "Scope definition workshop", category: "Strategy", hours: 8 },
    { id: "core", label: "Implementation", description: "Core build of the agreed scope", category: "Development", hours: 40 },
    { id: "qa", label: "QA & Testing", category: "Quality", hours: 8 },
    { id: "pm", label: "Project Management", description: "Planning, meetings and status reports", category: "Management", hours: 8 },
  ],
};

// Extra work triggered by a constraint answer, keyed by `${constraintId}:${value}`
export const CONSTRAINT_DELIVERABLES: Record<string, Deliverable[]> = {
  "design:new": [
    { id: "design", label: "UI/UX Design", description: "Wireframes, high-fidelity mockups and style guide", category: "Design", hours: 32 },
  ],
  "content:assist": [
    { id: "content", label: "Content & Copywriting", description: "Copy for key pages and content entry", category: "Content", hours: 16 },
  ],
  "migration:true": [
    { id: "migration", label: "Data Migration", description: "Export, transform and import existing data", category: "Development", hours: 20 },
  ],
  "compliance:true": [
    { id: "compliance", label: "Compliance Review", description: "Privacy, consent and regulatory requirements", category: "Quality", hours: 16 },
  ],
};
