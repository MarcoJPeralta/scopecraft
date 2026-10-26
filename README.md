# ScopeCraft

ScopeCraft helps freelancers and agencies scope a project and turn it into a client-ready budget proposal.

1. **Wizard** (`/wizard`): pick the project type, describe the project and client, choose features and constraints, then set complexity, timeline and your hourly rate.
2. **Scope Builder** (`/scope-builder`): the answers become editable line items (hours × rate). Add, remove or tweak items and set contingency, discount, tax and deposit with live totals.
3. **Preview** (`/preview`): a printable proposal with scope by category, timeline, investment, payment schedule, assumptions and a signature block. Use **Print / Save as PDF** to send it.

Everything is saved in the browser (localStorage), so a refresh doesn't lose your work. **Start over** in the wizard clears the current proposal but keeps your rate, currency and name.

## Development

```bash
npm install
npm run dev     # start the dev server
npm run build   # type-check and build
npm run lint
```

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Sass, Zustand and React Router.

## Customizing estimates

All pricing data lives in `src/lib/mapping/`:

| File | What it controls |
| --- | --- |
| `project-types.ts` | Project types offered in step 1 |
| `deliverables.ts` | Base deliverables per project type, and extra work triggered by constraints (hours) |
| `features.ts` | Selectable features, their hours and which project types they apply to |
| `constraints.ts` | Constraint questions and options |
| `estimates.ts` | Complexity multipliers, timeline surcharges, currencies and hours per week |

`src/lib/pricing.ts` combines them: hours are multiplied by complexity, priced at the hourly rate (or a per-item override), then the timeline surcharge, contingency, discount and tax are applied in that order.

## Theming

Light and dark mode are driven by the `.dark` class on `<html>`, set by `ThemeProvider`. Colors are derived from the logo palette (periwinkle `#698BC0`, navy `#174B72`, teal `#51CAC5`) and exposed as semantic tokens in `src/index.css`: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-primary`, `bg-brand-gradient`... Use those instead of fixed palette colors like `gray-600` so components switch themes automatically. Tailwind v4 is configured in CSS; there is no `tailwind.config.js`. The `Logo` component shows `Logo.svg` in light mode and `Logo-white.svg` in dark mode.
