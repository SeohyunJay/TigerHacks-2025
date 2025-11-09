import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Trash to Stars: WALL•E's EVE-olution Mission",
  description:
    "A WALL•E-inspired space sustainability game: learn about orbital junk, clean up debris, and take a mission photo with your adopted planet.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="app-root">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
