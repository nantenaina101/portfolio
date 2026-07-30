import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Jean Gilbert Randrianantenainasoa — Expert Data & Développeur Web",
  description:
    "Portfolio de Jean Gilbert Randrianantenainasoa, expert en extraction de données (web scraping) et développeur web full-stack basé à Antananarivo, Madagascar.",
  keywords: [
    "web scraping",
    "data extraction",
    "développeur web",
    "Python",
    "Next.js",
    "Madagascar",
  ],
  authors: [{ name: "Jean Gilbert Randrianantenainasoa" }],
  openGraph: {
    title: "Jean Gilbert Randrianantenainasoa — Portfolio",
    description:
      "Expert en extraction de données et développement web full-stack.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${manrope.variable} ${mono.variable} font-sans grain`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
