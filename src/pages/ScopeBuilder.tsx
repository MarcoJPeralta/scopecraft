import { Link } from "react-router-dom";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import BudgetSummary from "../components/BudgetSummary";
import InfoTip from "../components/InfoTip";
import { CURRENCIES } from "../lib/mapping/estimates";
import { computeTotals, formatCurrency, itemAmount } from "../lib/pricing";
import { useWizardStore, type Settings } from "../store/wizard-store";

// Parses a number input, falling back to 0 for empty or invalid values
function toNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

const PERCENT_SETTINGS: { key: keyof Settings; label: string; help?: string }[] = [
  {
    key: "contingency",
    label: "Contingency %",
    help: "A safety buffer added on top of the estimate to cover unknowns: scope surprises, extra revision rounds or tasks that take longer than planned. 10 to 15% is typical; use more when requirements are still vague.",
  },
  { key: "discount", label: "Discount %" },
  { key: "tax", label: "Tax %" },
  { key: "deposit", label: "Deposit %" },
];

function ScopeBuilder() {
  const { formData, settings, items, addItem, updateItem, removeItem, updateSettings } =
    useWizardStore();
  const totals = computeTotals(items, settings, formData.timeline);

  if (items.length === 0) {
    return (
      <div className="px-4 pt-16 pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-10 text-center">
          <h1 className="mb-3 text-3xl font-bold">Custom Scope Builder</h1>
          <p className="mb-8 text-muted">
            No scope yet. Run the wizard to generate line items from your answers, or start
            from a blank budget.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/wizard" className="button">
              Start the wizard
            </Link>
            <button type="button" onClick={addItem} className="button button--secondary">
              Start blank
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-16 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            {formData.project.title || "Custom Scope Builder"}
          </h1>
          <p className="text-muted">
            Adjust hours, rates and line items. Totals update as you type.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section aria-label="Line items">
            <div className="hidden grid-cols-[1fr_9rem_5rem_6rem_6.5rem_2.25rem] gap-3 px-4 pb-2 text-xs font-semibold tracking-wide text-muted uppercase md:grid">
              <span>Item</span>
              <span>Category</span>
              <span>Hours</span>
              <span>Rate</span>
              <span className="text-right">Amount</span>
              <span className="sr-only">Actions</span>
            </div>

            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[1fr_9rem_5rem_6rem_6.5rem_2.25rem] md:items-start"
                >
                  <div className="col-span-2 space-y-2 md:col-span-1">
                    <input
                      aria-label="Item name"
                      value={item.label}
                      onChange={(e) => updateItem(item.id, { label: e.target.value })}
                      placeholder="Item name"
                      className="input py-2 font-medium"
                    />
                    <input
                      aria-label="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      placeholder="Description (optional)"
                      className="input py-1.5 text-sm"
                    />
                  </div>
                  <input
                    aria-label="Category"
                    value={item.category}
                    onChange={(e) => updateItem(item.id, { category: e.target.value })}
                    placeholder="Category"
                    className="input col-span-2 py-2 text-sm md:col-span-1"
                  />
                  <input
                    aria-label="Hours"
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.hours}
                    onChange={(e) => updateItem(item.id, { hours: toNumber(e.target.value) })}
                    className="input py-2 text-sm"
                  />
                  <input
                    aria-label="Rate"
                    type="number"
                    min="0"
                    step="any"
                    value={item.rate ?? ""}
                    placeholder={String(settings.hourlyRate)}
                    title="Leave empty to use the default hourly rate"
                    onChange={(e) =>
                      updateItem(item.id, {
                        rate: e.target.value === "" ? null : toNumber(e.target.value),
                      })
                    }
                    className="input py-2 text-sm"
                  />
                  <span className="self-center font-semibold tabular-nums md:text-right">
                    {formatCurrency(itemAmount(item, settings), settings.currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.label || "item"}`}
                    className="button button--danger justify-self-end p-2"
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" onClick={addItem} className="button button--secondary mt-4">
              <PlusIcon /> Add line item
            </button>
          </section>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-6 rounded-xl border border-border bg-surface p-5">
              <h2 className="text-lg font-bold">Budget</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="hourlyRate" className="label">
                    Hourly rate
                  </label>
                  <input
                    id="hourlyRate"
                    type="number"
                    min="0"
                    step="any"
                    value={settings.hourlyRate}
                    onChange={(e) => updateSettings({ hourlyRate: toNumber(e.target.value) })}
                    className="input py-2"
                  />
                </div>
                <div>
                  <label htmlFor="currency" className="label">
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => updateSettings({ currency: e.target.value })}
                    className="input py-2"
                  >
                    {CURRENCIES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>
                {PERCENT_SETTINGS.map(({ key, label, help }) => (
                  <div key={key}>
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <label htmlFor={key} className="label mb-0">
                        {label}
                      </label>
                      {help && <InfoTip label={label.replace(" %", "")}>{help}</InfoTip>}
                    </div>
                    <input
                      id={key}
                      type="number"
                      min="0"
                      max="100"
                      step="any"
                      value={settings[key]}
                      onChange={(e) =>
                        updateSettings({ [key]: Math.min(100, toNumber(e.target.value)) })
                      }
                      className="input py-2"
                    />
                  </div>
                ))}
              </div>

              <BudgetSummary totals={totals} settings={settings} timeline={formData.timeline} />

              <Link to="/preview" className="button w-full py-3">
                Preview proposal
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ScopeBuilder;
