'use client'
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export type Theme = "light" | "dark";

export const useDarkMode = (defaultTheme: Theme = "dark") => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);  //tiene traccia del theme corrente
  const [_, setCookie] = useCookies(["theme"]);  //_ per ignorare il valore attuale, usi solo setCookie

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);  //modifica l'<html> della pagina  <html class="dark">

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme);  //aggiorna lo stato

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    //cambia visivamente il theme

    setCookie("theme", newTheme, { path: "/" });  //salva il cookie (persiste il tema)
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};
