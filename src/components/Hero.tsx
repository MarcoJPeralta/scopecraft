import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  description?: string;
  buttonUrl?: string;
  buttonText?: string;
}

function Hero(props: HeroProps) {
  const { title, description, buttonUrl, buttonText } = props;
  return (
    <section
      className="hero flex flex-col items-center justify-center max-w-7xl mx-auto py-16 px-4 gap-4 text-center"
      aria-labelledby="hero-title"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center">{title}</h1>
      <span aria-hidden="true" className="bg-brand-gradient h-1 w-24 rounded-full" />
      {description && (
        <p className="max-w-3xl mx-auto text-lg md:text-xl mb-10 text-muted">
          {description}
        </p>
      )}
      {buttonUrl && (
        <Link to={buttonUrl} className="button text-center px-6 py-3">
          {buttonText}
        </Link>
      )}
    </section>
  );
}

export default Hero;
