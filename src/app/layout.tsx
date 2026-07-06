import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopProvider } from "./context/ShopContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NOVA — Premium Fashion Destination",
  description: "Shop premium fashion from 1000+ brands. Free delivery, easy returns. New arrivals daily.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${fraunces.variable}`}>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
