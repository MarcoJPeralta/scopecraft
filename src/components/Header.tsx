import "../css/header.scss";
import "../css/buttons.scss";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import ColorSchemeToggle from "./colorScheme";

const NAV_LINKS = [
  { to: "/wizard", label: "Wizard" },
  { to: "/scope-builder", label: "Scope Builder" },
  { to: "/preview", label: "Preview" },
];

function Header() {
  return (
    <header className="site-header flex flex-wrap items-center justify-between gap-4 p-4 transition-colors duration-300">
      <Link to="/" className="flex items-center">
        <Logo className="site-header__logo w-auto" />
      </Link>
      <nav aria-label="Main" className="order-last w-full md:order-none md:w-auto">
        <ul className="flex gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? "underline decoration-primary decoration-2 underline-offset-8" : ""
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/wizard" className="button">
          Create Proposal
        </Link>
        <ColorSchemeToggle />
      </div>
    </header>
  );
}

export default Header;
