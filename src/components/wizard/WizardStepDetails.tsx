import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWizardStore } from "../../store/wizard-store.ts";
import {
  COMPLEXITY_OPTIONS,
  CURRENCIES,
  TIMELINE_OPTIONS,
  type ComplexityId,
  type TimelineId,
} from "../../lib/mapping/estimates";
import OptionCard from "./OptionCard";
import WizardNav from "./WizardNav";

function WizardStepDetails() {
  const navigate = useNavigate();
  const { formData, settings, items, updateFormData, updateSettings, generateItems } =
    useWizardStore();

  const [complexity, setComplexity] = useState<ComplexityId>(formData.complexity);
  const [timeline, setTimeline] = useState<TimelineId>(formData.timeline);
  const [notes, setNotes] = useState(formData.notes);
  const [hourlyRate, setHourlyRate] = useState(String(settings.hourlyRate));
  const [currency, setCurrency] = useState(settings.currency);
  const [preparedBy, setPreparedBy] = useState(settings.preparedBy);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rate = Number(hourlyRate);
    if (!Number.isFinite(rate) || rate <= 0) {
      setError("Please enter an hourly rate greater than 0");
      return;
    }

    if (
      items.length > 0 &&
      !window.confirm("This will replace the line items you edited in the Scope Builder. Continue?")
    ) {
      return;
    }

    updateFormData({ complexity, timeline, notes: notes.trim() });
    updateSettings({ hourlyRate: rate, currency, preparedBy: preparedBy.trim() });
    generateItems();
    navigate("/scope-builder");
  };

  return (
    <section>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">Estimate details</h2>
      <p className="mb-10 text-muted">
        These settings shape the hours and budget we generate for you.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-10">
        <fieldset>
          <legend className="mb-4 text-lg font-semibold">Complexity</legend>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {COMPLEXITY_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                name="complexity"
                value={option.id}
                title={option.label}
                description={option.description}
                meta={`× ${option.multiplier} hours`}
                selected={complexity === option.id}
                onSelect={() => setComplexity(option.id)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-lg font-semibold">Timeline</legend>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {TIMELINE_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                name="timeline"
                value={option.id}
                title={option.label}
                description={option.description}
                selected={timeline === option.id}
                onSelect={() => setTimeline(option.id)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-lg font-semibold">Pricing</legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="hourlyRate" className="label">
                Hourly rate *
              </label>
              <input
                id="hourlyRate"
                type="number"
                min="1"
                step="any"
                inputMode="decimal"
                value={hourlyRate}
                onChange={(e) => {
                  setHourlyRate(e.target.value);
                  setError("");
                }}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="currency" className="label">
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input"
              >
                {CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preparedBy" className="label">
                Prepared by
              </label>
              <input
                id="preparedBy"
                type="text"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
                placeholder="Your name or studio"
                className="input"
              />
            </div>
          </div>
        </fieldset>

        <div>
          <label htmlFor="notes" className="label">
            Notes for the proposal
          </label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything the client should know: exclusions, dependencies, next steps..."
            className="input resize-y"
          />
        </div>

        <WizardNav error={error} nextLabel="Generate scope" />
      </form>
    </section>
  );
}

export default WizardStepDetails;
