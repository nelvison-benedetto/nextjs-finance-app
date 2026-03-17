import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import { getServerTheme, type Theme } from '@/shared/hooks/useServerDarkMode';
import Providers from './Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Finance App",
    template: "%s | Finance App",
  },
  description: "Personal finance tracking app — manage income, expenses, savings and investments.",
  keywords: ["finance", "budget", "transactions", "savings", "investments"],
  authors: [{ name: "Finance App" }],
  openGraph: {
    title: "Finance App",
    description: "Personal finance tracking app — manage income, expenses, savings and investments.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: Theme = await getServerTheme();

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col px-8`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
