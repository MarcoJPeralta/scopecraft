import { useState } from "react";
import { useWizardStore } from "../../store/wizard-store.ts";
import { PROJECT_TYPES, type ProjectTypeId } from "../../lib/mapping/project-types";
import OptionCard from "./OptionCard";
import WizardNav from "./WizardNav";

function WizardStepType() {
  const { formData, updateFormData, nextStep } = useWizardStore();
  const [selectedType, setSelectedType] = useState<ProjectTypeId | null>(formData.type);
  const [error, setError] = useState("");

  const handleSelect = (value: ProjectTypeId) => {
    setSelectedType(value);
    // Clear any previous errors when user selects
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedType) {
      setError("Please select a project type");
      return;
    }

    updateFormData({ type: selectedType });
    nextStep();
  };

  return (
    <section>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">
        What type of project are you working on?
      </h2>
      <p className="mb-10 text-muted">
        Select the type of project to get started. You can add more details later.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECT_TYPES.map((projectType) => (
            <OptionCard
              key={projectType.id}
              name="type"
              value={projectType.id}
              title={projectType.label}
              description={projectType.description}
              selected={selectedType === projectType.id}
              onSelect={() => handleSelect(projectType.id)}
            />
          ))}
        </div>

        <WizardNav error={error} />
      </form>
    </section>
  );
}

export default WizardStepType;
