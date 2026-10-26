import { getTimeline } from "../lib/mapping/estimates";
import { formatCurrency, formatHours, type Totals } from "../lib/pricing";
import type { Settings } from "../store/wizard-store";

interface BudgetSummaryProps {
  totals: Totals;
  settings: Settings;
  timeline: string;
}

// Totals breakdown shared by the Scope Builder sidebar and the proposal
function BudgetSummary({ totals, settings, timeline }: BudgetSummaryProps) {
  const money = (amount: number) => formatCurrency(amount, settings.currency);
  const rows = [
    { label: `Subtotal (${formatHours(totals.hours)})`, value: totals.subtotal, show: true },
    {
      label: `${getTimeline(timeline).label} timeline surcharge`,
      value: totals.rush,
      show: totals.rush > 0,
    },
    {
      label: `Contingency (${settings.contingency}%)`,
      value: totals.contingency,
      show: totals.contingency > 0,
    },
    {
      label: `Discount (${settings.discount}%)`,
      value: -totals.discount,
      show: totals.discount > 0,
    },
    { label: `Tax (${settings.tax}%)`, value: totals.tax, show: totals.tax > 0 },
  ];

  return (
    <dl className="space-y-2 text-sm">
      {rows
        .filter((row) => row.show)
        .map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-muted">{row.label}</dt>
            <dd className="tabular-nums">{money(row.value)}</dd>
          </div>
        ))}
      <div className="flex justify-between gap-4 border-t border-border pt-3 text-lg font-bold">
        <dt>Total</dt>
        <dd className="tabular-nums">{money(totals.total)}</dd>
      </div>
      {settings.deposit > 0 && settings.deposit < 100 && (
        <div className="flex justify-between gap-4 text-muted">
          <dt>Deposit due ({settings.deposit}%)</dt>
          <dd className="tabular-nums">{money(totals.deposit)}</dd>
        </div>
      )}
    </dl>
  );
}

export default BudgetSummary;
