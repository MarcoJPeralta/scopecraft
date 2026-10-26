import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildLineItems } from "../lib/pricing";
import type { ComplexityId, TimelineId } from "../lib/mapping/estimates";
import type { ProjectTypeId } from "../lib/mapping/project-types";

export const TOTAL_STEPS = 4;

interface Project {
  title: string;
  summary: string;
}

interface Client {
  name: string;
  company: string;
  email: string;
}

export interface Constraints {
  design: string;
  content: string;
  migration: boolean;
  compliance: boolean;
  [key: string]: string | boolean;
}

export interface FormData {
  project: Project;
  client: Client;
  type: ProjectTypeId | null;
  features: string[];
  constraints: Constraints;
  complexity: ComplexityId;
  timeline: TimelineId;
  notes: string;
}

export interface LineItem {
  id: string;
  label: string;
  description: string;
  category: string;
  hours: number;
  rate: number | null; // null = use the default hourly rate
}

export interface Settings {
  preparedBy: string;
  currency: string;
  hourlyRate: number;
  contingency: number; // %
  discount: number; // %
  tax: number; // %
  deposit: number; // % due upfront
  validDays: number;
}

interface WizardStore {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  setConstraints: (constraints: Partial<Constraints>) => void;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  items: LineItem[];
  generatedAt: string | null;
  generateItems: () => void;
  addItem: () => void;
  updateItem: (id: string, item: Partial<LineItem>) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

const initialForm: FormData = {
  project: { title: "", summary: "" },
  client: { name: "", company: "", email: "" },
  type: null,
  features: [],
  constraints: {
    design: "existing",
    content: "provided",
    migration: false,
    compliance: false,
  },
  complexity: "standard",
  timeline: "standard",
  notes: "",
};

const initialSettings: Settings = {
  preparedBy: "",
  currency: "USD",
  hourlyRate: 75,
  contingency: 10,
  discount: 0,
  tax: 0,
  deposit: 50,
  validDays: 30,
};

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step: Math.min(Math.max(step, 1), TOTAL_STEPS) }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, TOTAL_STEPS) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      formData: initialForm,
      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      setConstraints: (constraints) =>
        set((state) => ({
          formData: {
            ...state.formData,
            constraints: { ...state.formData.constraints, ...constraints } as Constraints,
          },
        })),
      settings: initialSettings,
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      items: [],
      generatedAt: null,
      generateItems: () =>
        set((state) => ({
          items: buildLineItems(state.formData),
          generatedAt: new Date().toISOString(),
        })),
      addItem: () =>
        set((state) => ({
          items: [
            ...state.items,
            { id: createId(), label: "", description: "", category: "Other", hours: 1, rate: null },
          ],
          generatedAt: state.generatedAt ?? new Date().toISOString(),
        })),
      updateItem: (id, item) =>
        set((state) => ({
          items: state.items.map((current) =>
            current.id === id ? { ...current, ...item } : current
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      // Keeps settings (rate, currency, your name) since they rarely change between proposals
      reset: () => set({ step: 1, formData: initialForm, items: [], generatedAt: null }),
    }),
    { name: "scopecraft", version: 1 }
  )
);
