import { useWizardStore } from "../../store/wizard-store.ts";

const STEPS = ["Project type", "Project info", "Features", "Estimate"];

function WizardProgress() {
  const { step, setStep } = useWizardStore();

  return (
    <nav aria-label="Wizard progress" className="mb-10">
      <ol className="flex gap-2">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const isDone = number < step;
          const isCurrent = number === step;

          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => setStep(number)}
                disabled={number > step}
                aria-current={isCurrent ? "step" : undefined}
                className="group w-full text-left disabled:cursor-default"
              >
                <span
                  className={`block h-1.5 rounded-full transition-colors ${
                    isDone || isCurrent ? "bg-primary" : "bg-border"
                  } ${isDone ? "group-hover:bg-primary-hover" : ""}`}
                />
                <span
                  className={`mt-2 hidden text-xs font-medium sm:block ${
                    isCurrent ? "text-foreground" : "text-muted"
                  }`}
                >
                  {number}. {label}
                </span>
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
