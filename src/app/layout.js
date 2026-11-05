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
  title: "Jean Gilbert Randrianantenainasoa — Docteur en Physique Nucléaire Appliquée",
  description:
    "Portfolio de Jean Gilbert Randrianantenainasoa, docteur en physique nucléaire appliquée : télédétection, érosion et sédimentation, changement climatique et géochronologie ²¹⁰Pb/¹³⁷Cs. Antananarivo, Madagascar.",
  keywords: [
    "télédétection",
    "érosion",
    "sédimentation",
    "changement climatique",
    "géochronologie",
    "plomb-210",
    "Madagascar",
    "Python",
  ],
  authors: [{ name: "Jean Gilbert Randrianantenainasoa" }],
  openGraph: {
    title: "Jean Gilbert Randrianantenainasoa — Portfolio",
    description:
      "Docteur en physique nucléaire appliquée — télédétection, érosion et changement climatique à l'échelle d'un bassin versant.",
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
