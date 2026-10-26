import { useWizardStore } from "../store/wizard-store.ts";
import WizardProgress from "./wizard/WizardProgress";
import WizardStepInfo from "./wizard/WizardStepInfo";
import WizardStepType from "./wizard/WizardStepType";
import WizardStepFeatures from "./wizard/WizardStepFeatures";
import WizardStepDetails from "./wizard/WizardStepDetails";

function WizardContainer() {
  const { step } = useWizardStore();

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <WizardStepType />;
      case 2:
        return <WizardStepInfo />;
      case 3:
        return <WizardStepFeatures />;
      case 4:
        return <WizardStepDetails />;
      default:
        return <WizardStepType />;
    }
  };

  return (
    <div className="pb-20">
      <WizardProgress />
      {/* key remounts the step so its local state re-reads the store */}
      <div key={step}>{renderCurrentStep()}</div>
    </div>
  );
}

export default WizardContainer;
