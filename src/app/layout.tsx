import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopProvider } from "./context/ShopContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NOVA — Premium Fashion Destination",
  description: "Shop premium fashion from 1000+ brands. Free delivery, easy returns. New arrivals daily.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
