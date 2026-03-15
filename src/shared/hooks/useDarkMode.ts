import { useState } from "react";
import { useCookies } from "react-cookie";

export type Theme = "light" | "dark";

export const useDarkMode = (defaultTheme: Theme = "dark") => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    // rimuove tutte le classi e aggiunge quella nuova
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    setCookie("theme", newTheme, { path: "/" }); // path necessario per cookie globali
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};