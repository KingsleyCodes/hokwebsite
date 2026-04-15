import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/ui/landingPage/Footer";
import Navbar from "@/components/ui/landingPage/Navbar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Montserrat, Playfair, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const valky = localFont({
  src: "./fonts/Valky.woff2",
  variable: "--font-valky",
  weight: "100 900",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});
const playfair = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Home of Korean Beauty",
  description: "Welcome to our Store, Enjoy the best Beauty Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${valky.variable} ${roboto.variable} ${playfair.variable} ${inter.variable} bg-[#f9f4E1]`}
      >
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
