import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";

function ColorSchemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border bg-surface hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-primary" />
      ) : (
        <SunIcon className="w-5 h-5 text-accent" />
      )}
    </button>
  );
}

export default ColorSchemeToggle;
