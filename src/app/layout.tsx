import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import useServerDarkMode from "@/shared/hooks/useServerDarkMode";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tipi del tema
type Theme = "light" | "dark";

// Funzione server per leggere il cookie dei temi
// function getServerTheme(defaultTheme: Theme = "dark"): Theme {
//   const allCookies = cookies(); // <-- correttamente restituisce ReadonlyRequestCookies
//   const cookieTheme = allCookies.get("theme")?.value; // <-- get() esiste
//   if (cookieTheme === "light" || cookieTheme === "dark") {
//     return cookieTheme;
//   }
//   return defaultTheme;
// }

export const metadata: Metadata = {
  title: "Finance App - Udemy",
  description: "finance traking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const allCookies = await cookies(); // qui aspetti la promise
  //const theme = getServerTheme(); //leggo il tema dal cookie lato server. NON USO uso useServerDarkMode. xk questo comp layout.tsxè un server side component, non posso usare useState / useCookies
  const theme = allCookies.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html lang="en" className={theme}>  {/*aggiungo qu theme cosi setto globalmente in tutta l'app il theme chiaro/scuro*/}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
