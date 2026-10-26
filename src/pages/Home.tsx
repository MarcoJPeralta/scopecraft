import Hero from "../components/Hero";

const STEPS = [
  {
    title: "Answer a few questions",
    description: "Pick the project type, features and constraints in a guided wizard.",
  },
  {
    title: "Fine-tune the budget",
    description: "Adjust hours, rates, contingency, discounts and taxes with live totals.",
  },
  {
    title: "Send a polished proposal",
    description: "Preview a client-ready proposal and save it as a PDF in one click.",
  },
];

function Home() {
  return (
    <>
      <Hero
        title="Craft Winning Proposals, Effortlessly"
        description="ScopeCraft empowers freelancers and agencies to create professional, standardized project proposals with ease. Impress clients and secure more projects with an intuitive platform."
        buttonUrl="/wizard"
        buttonText="Create Proposal"
      />
      <section aria-labelledby="how-it-works" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 id="how-it-works" className="mb-8 text-center text-2xl font-bold">
          How it works
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-surface p-6">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                {index + 1}
              </span>
              <h3 className="mb-2 font-semibold">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default Home;
