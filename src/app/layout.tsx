import type { Metadata } from "next";
import "./globals.css";
import { Homemade_Apple } from "next/font/google";

const homemade = Homemade_Apple({ subsets: ["latin"], weight: "400", variable: "--font-homemade" });

export const metadata: Metadata = {
  title: "Changing Currents — EPK",
  description: "Electronic Press Kit for Changing Currents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={homemade.variable}>
      <body>{children}</body>
    </html>
  );
}
