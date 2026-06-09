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

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baskervville.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
