import { TOTAL_STEPS, useWizardStore } from "../../store/wizard-store.ts";

const STEPS = ["Project type", "Project info", "Features", "Estimate"];

function WizardProgress() {
  const { step, setStep } = useWizardStore();

  return (
    <nav aria-label="Wizard progress" className="mb-10">
      {/* Single track filled with the logo gradient */}
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="bg-brand-gradient h-full rounded-full transition-[width] duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
      <ol className="mt-2 hidden grid-cols-4 gap-2 sm:grid">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const isCurrent = number === step;

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => setStep(number)}
                disabled={number > step}
                aria-current={isCurrent ? "step" : undefined}
                className={`text-left text-xs font-medium transition-colors enabled:cursor-pointer enabled:hover:text-primary disabled:cursor-default ${
                  isCurrent ? "text-foreground" : "text-muted"
                }`}
              >
                {number}. {label}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-xs text-muted sm:hidden">
        Step {step} of {STEPS.length}: {STEPS[step - 1]}
      </p>
    </nav>
  );
}

export default WizardProgress;
