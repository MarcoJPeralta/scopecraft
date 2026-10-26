import { useState } from "react";
import { useWizardStore, type Constraints } from "../../store/wizard-store.ts";
import { getFeaturesForType } from "../../lib/mapping/features";
import { CONSTRAINTS } from "../../lib/mapping/constraints";
import OptionCard from "./OptionCard";
import WizardNav from "./WizardNav";

function WizardStepFeatures() {
  const { formData, updateFormData, setConstraints, nextStep } = useWizardStore();

  // Copy before sorting so the shared FEATURES array isn't mutated
  const projectFeatures = [...getFeaturesForType(formData.type)].sort((a, b) =>
    a.category.localeCompare(b.category)
  );
  const categories = [...new Set(projectFeatures.map((feature) => feature.category))];

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.features);
  const [selectedConstraints, setSelectedConstraints] = useState<Constraints>(
    formData.constraints
  );

  const handleFeatureSelect = (value: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const handleConstraintSelect = (constraintId: string, optionValue: string | boolean) => {
    setSelectedConstraints((prev) => ({ ...prev, [constraintId]: optionValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormData({ features: selectedFeatures });
    setConstraints(selectedConstraints);
    nextStep();
  };

  return (
    <section>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">What features do you need?</h2>
      <p className="mb-10 text-muted">Pick as many as you like. You can fine-tune later.</p>

      <form onSubmit={handleSubmit}>
        <h3 className="mb-4 text-2xl font-bold">Features</h3>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
                {category}
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {projectFeatures
                  .filter((feature) => feature.category === category)
                  .map((feature) => (
                    <OptionCard
                      key={feature.id}
                      multiple
                      name="features"
                      value={feature.id}
                      title={feature.label}
                      description={feature.description}
                      meta={`~${feature.hours}h`}
                      selected={selectedFeatures.includes(feature.id)}
                      onSelect={() => handleFeatureSelect(feature.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-2 text-2xl font-bold">Project Constraints</h3>
          <p className="mb-6 text-muted">
            Help us understand your project requirements and constraints.
          </p>
          <div className="space-y-8">
            {CONSTRAINTS.map((constraint) => (
              <fieldset key={constraint.id}>
                <legend className="mb-1 text-lg font-semibold">{constraint.label}</legend>
                <p className="mb-4 text-sm text-muted">{constraint.description}</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {constraint.options.map((option) => (
                    <OptionCard
                      key={String(option.value)}
                      name={constraint.id}
                      value={String(option.value)}
                      title={option.label}
                      description={option.description}
                      selected={selectedConstraints[constraint.id] === option.value}
                      onSelect={() => handleConstraintSelect(constraint.id, option.value)}
                    />
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <WizardNav />
      </form>
    </section>
  );
}

export default WizardStepFeatures;
