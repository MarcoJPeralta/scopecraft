import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useWizardStore } from "../../store/wizard-store.ts";

interface WizardNavProps {
  error?: string;
  nextLabel?: string;
}

// Shared footer for wizard steps: error message, Back and a submit button
function WizardNav({ error, nextLabel = "Next" }: WizardNavProps) {
  const { step, prevStep } = useWizardStore();

  return (
    <>
      {error && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
        >
          {error}
        </div>
      )}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button type="button" onClick={prevStep} className="button button--secondary">
            <ArrowLeftIcon /> Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="button px-6 py-3">
          {nextLabel} <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export default WizardNav;
