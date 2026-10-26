import { useState } from "react";
import WizardContainer from "../components/WizardContainer";
import { useWizardStore } from "../store/wizard-store";

function Wizard() {
  const { reset } = useWizardStore();
  // Remounts the wizard so step components drop their local form state
  const [resetCount, setResetCount] = useState(0);

  const handleReset = () => {
    if (window.confirm("Clear all answers and line items and start a new proposal?")) {
      reset();
      setResetCount((count) => count + 1);
    }
  };

  return (
    <div className="px-4 pt-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Project Scope Wizard</h1>
            <p className="text-muted">
              Follow our step-by-step wizard to create your project scope.
            </p>
          </div>
          <button type="button" onClick={handleReset} className="button button--secondary">
            Start over
          </button>
        </div>
        <WizardContainer key={resetCount} />
      </div>
    </div>
  );
}

export default Wizard;
