// src/lib/mapping/project-types.ts

export type ProjectTypeId =
  | "website"
  | "ecommerce"
  | "web-app"
  | "mobile-app"
  | "other";

export type ProjectType = {
  id: ProjectTypeId;
  label: string;
  description: string;
};

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "website",
    label: "Website",
    description: "A new website or redesign of an existing site.",
  },
  {
    id: "ecommerce",
    label: "Online Store",
    description: "An e-commerce site with products, cart and checkout.",
  },
  {
    id: "web-app",
    label: "Web Application",
    description: "A custom web application with complex functionality.",
  },
  {
    id: "mobile-app",
    label: "Mobile Application",
    description: "A native iOS or Android application.",
  },
  {
    id: "other",
    label: "Other",
    description: "Something else not listed above.",
  },
];

export function getProjectType(id: string | null) {
  return PROJECT_TYPES.find((type) => type.id === id);
}
