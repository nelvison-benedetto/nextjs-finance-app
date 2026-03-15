'use client'
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export type Theme = "light" | "dark";

export const useDarkMode = (defaultTheme: Theme = "dark") => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    setCookie("theme", newTheme, { path: "/" });
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};
