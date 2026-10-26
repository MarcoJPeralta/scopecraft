import { Link } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon } from "@radix-ui/react-icons";
import logo from "../assets/Logo.svg";
import BudgetSummary from "../components/BudgetSummary";
import { CONSTRAINTS } from "../lib/mapping/constraints";
import { getComplexity, getTimeline, HOURS_PER_WEEK } from "../lib/mapping/estimates";
import { getProjectType } from "../lib/mapping/project-types";
import {
  computeTotals,
  formatCurrency,
  formatHours,
  groupByCategory,
  itemAmount,
} from "../lib/pricing";
import { useWizardStore } from "../store/wizard-store";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function Preview() {
  const { formData, settings, items, generatedAt } = useWizardStore();

  if (items.length === 0) {
    return (
      <div className="px-4 pt-16 pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-10 text-center">
          <h1 className="mb-3 text-3xl font-bold">Scope Preview</h1>
          <p className="mb-8 text-muted">
            There's nothing to preview yet. Create a scope first.
          </p>
          <Link to="/wizard" className="button">
            Start the wizard
          </Link>
        </div>
      </div>
    );
  }

  const totals = computeTotals(items, settings, formData.timeline);
  const money = (amount: number) => formatCurrency(amount, settings.currency);
  const issued = generatedAt ? new Date(generatedAt) : new Date();
  const validUntil = new Date(issued);
  validUntil.setDate(validUntil.getDate() + settings.validDays);

  const { client, project } = formData;
  const clientLines = [client.name, client.company, client.email].filter(Boolean);
  const projectType = getProjectType(formData.type);
  const timeline = getTimeline(formData.timeline);
  const assumptions = [
    ...CONSTRAINTS.flatMap((constraint) => {
      const option = constraint.options.find(
        (o) => o.value === formData.constraints[constraint.id]
      );
      return option ? [`${constraint.label}: ${option.label}. ${option.description ?? ""}`] : [];
    }),
    `Estimates assume ${getComplexity(formData.complexity).label.toLowerCase()} complexity and about ${HOURS_PER_WEEK} hours of work per week.`,
    "Work outside the scope described here will be quoted separately.",
  ];

  return (
    <div className="px-4 pt-10 pb-20 print:p-0">
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link to="/scope-builder" className="button button--secondary">
          <ArrowLeftIcon /> Edit scope
        </Link>
        <button type="button" onClick={() => window.print()} className="button">
          <DownloadIcon /> Print / Save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-4xl rounded-xl border border-border bg-surface p-8 sm:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <header className="mb-10 flex flex-wrap items-start justify-between gap-6 border-b border-border pb-8">
          <div>
            <img src={logo} alt="ScopeCraft" className="mb-6 h-8 w-auto" />
            <p className="text-sm font-semibold tracking-wide text-muted uppercase">
              Project proposal
            </p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
              {project.title || "Untitled project"}
            </h1>
            {projectType && <p className="mt-2 text-muted">{projectType.label}</p>}
          </div>
          <dl className="space-y-1 text-sm sm:text-right">
            <div>
              <dt className="inline text-muted">Issued: </dt>
              <dd className="inline">{formatDate(issued)}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Valid until: </dt>
              <dd className="inline">{formatDate(validUntil)}</dd>
            </div>
            {settings.preparedBy && (
              <div>
                <dt className="inline text-muted">Prepared by: </dt>
                <dd className="inline">{settings.preparedBy}</dd>
              </div>
            )}
          </dl>
        </header>

        {clientLines.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
              Prepared for
            </h2>
            {clientLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
        )}

        {project.summary && (
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold">Overview</h2>
            <p className="leading-relaxed whitespace-pre-line">{project.summary}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Scope of work</h2>
          <div className="space-y-6">
            {groupByCategory(items).map((group) => (
              <div key={group.category} className="break-inside-avoid">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
                  {group.category}
                </h3>
                <table className="w-full text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th>Item</th>
                      <th>Hours</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-0">
                        <td className="py-2 pr-4">
                          <span className="font-medium">{item.label || "Untitled item"}</span>
                          {item.description && (
                            <span className="block text-muted">{item.description}</span>
                          )}
                        </td>
                        <td className="w-20 py-2 pr-4 text-right text-muted tabular-nums">
                          {formatHours(item.hours)}
                        </td>
                        <td className="w-28 py-2 text-right tabular-nums">
                          {money(itemAmount(item, settings))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-8 break-inside-avoid sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">Timeline</h2>
            <p>
              Estimated effort of <strong>{formatHours(totals.hours)}</strong>, roughly{" "}
              <strong>
                {totals.weeks} week{totals.weeks === 1 ? "" : "s"}
              </strong>{" "}
              from kickoff.
            </p>
            <p className="mt-2 text-sm text-muted">
              {timeline.label} schedule: {timeline.description}
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Investment</h2>
            <BudgetSummary totals={totals} settings={settings} timeline={formData.timeline} />
          </div>
        </section>

        {settings.deposit > 0 && settings.deposit < 100 && (
          <section className="mb-10 break-inside-avoid">
            <h2 className="mb-3 text-xl font-bold">Payment schedule</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                {settings.deposit}% deposit to start the project: {money(totals.deposit)}
              </li>
              <li>
                {100 - settings.deposit}% on completion: {money(totals.total - totals.deposit)}
              </li>
            </ul>
          </section>
        )}

        <section className="mb-10 break-inside-avoid">
          <h2 className="mb-3 text-xl font-bold">Assumptions</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </section>

        {formData.notes && (
          <section className="mb-10 break-inside-avoid">
            <h2 className="mb-3 text-xl font-bold">Notes</h2>
            <p className="leading-relaxed whitespace-pre-line">{formData.notes}</p>
          </section>
        )}

        <section className="break-inside-avoid border-t border-border pt-8">
          <h2 className="mb-6 text-xl font-bold">Acceptance</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {["Client signature", "Date"].map((label) => (
              <div key={label}>
                <div className="h-10 border-b border-foreground/40" />
                <p className="mt-2 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

export default Preview;
