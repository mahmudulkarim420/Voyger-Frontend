import type { Metadata } from "next";
import { Baskervville } from "next/font/google";
import "@/app/globals.css";

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-baskervville",
});

export const metadata: Metadata = {
  title: "VOYAGE",
  description: "Voyage store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baskervville.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
