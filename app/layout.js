import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialBar from "./SocialBar/page";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coffee Shop Ordering",
  description:
    "Order your favorite coffee online with custom options, first-order discounts, and a loyalty rewards system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable}`}>
        <Navbar />
        <SocialBar />
        <div className="h-[0.5px] bg-linear-to-r from-transparent via-accent to-transparent"></div>

        {children}

        <Footer />
      </body>
    </html>
  );
}
