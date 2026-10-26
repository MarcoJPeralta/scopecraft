import logo from "../assets/Logo.svg";
import logoWhite from "../assets/Logo-white.svg";

interface LogoProps {
  className?: string;
}

// Color logo in light mode, white logo in dark mode. Printing always uses
// the color version because proposals print on white paper.
function Logo({ className = "" }: LogoProps) {
  return (
    <>
      <img src={logo} alt="ScopeCraft" className={`${className} dark:hidden print:block`} />
      <img
        src={logoWhite}
        alt="ScopeCraft"
        className={`${className} hidden dark:block print:hidden`}
      />
    </>
  );
}

export default Logo;
