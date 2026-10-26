import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

function getInitialTheme(): Theme {
  // Check localStorage first, then system preference
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies)
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme class
    root.classList.remove("light", "dark");

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors, the theme still applies for this session
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
