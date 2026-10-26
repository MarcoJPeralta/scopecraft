import { useState } from "react";
import { useWizardStore } from "../../store/wizard-store.ts";
import WizardNav from "./WizardNav";

function WizardStepInfo() {
  const { formData: storeFormData, updateFormData, nextStep } = useWizardStore();

  const [formData, setFormData] = useState({
    projectName: storeFormData.project.title,
    projectDescription: storeFormData.project.summary,
    clientName: storeFormData.client.name,
    clientCompany: storeFormData.client.company,
    clientEmail: storeFormData.client.email,
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.projectName.trim() || !formData.projectDescription.trim()) {
      setError("Project Name and Project Description are required");
      return;
    }

    updateFormData({
      project: {
        title: formData.projectName.trim(),
        summary: formData.projectDescription.trim(),
      },
      client: {
        name: formData.clientName.trim(),
        company: formData.clientCompany.trim(),
        email: formData.clientEmail.trim(),
      },
    });
    nextStep();
  };

  return (
    <section>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">Project Information</h2>
      <p className="mb-10 text-muted">
        Tell us about the project and who the proposal is for.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          <div>
            <label htmlFor="projectName" className="label">
              Project Name *
            </label>
            <input
              id="projectName"
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="e.g. Acme Corporate Website Redesign"
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="label">
              Project Description *
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="What is the project about and what should it achieve?"
              rows={4}
              className="input resize-y"
              required
            />
          </div>

          <fieldset className="rounded-xl border border-border p-5">
            <legend className="px-2 text-sm font-semibold">Client (optional)</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="clientName" className="label">
                  Contact Name
                </label>
                <input
                  id="clientName"
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="clientCompany" className="label">
                  Company
                </label>
                <input
                  id="clientCompany"
                  type="text"
                  name="clientCompany"
                  value={formData.clientCompany}
                  onChange={handleInputChange}
                  placeholder="Acme Inc."
                  className="input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="clientEmail" className="label">
                  Email
                </label>
                <input
                  id="clientEmail"
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="jane@acme.com"
                  className="input"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <WizardNav error={error} />
      </form>
    </section>
  );
}

export default WizardStepInfo;
