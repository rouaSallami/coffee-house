import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialBar from "./SocialBar/page";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coffee House - Meilleur café",
  description: "Découvrez nos cafés artisanaux et commandez en ligne.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable}`}>
        <Navbar />
        <SocialBar />
        <div className="h-[0.5px] bg-linear-to-r from-transparent via-accent to-transparent"></div>

        {children}
        
        <Toaster position="top-center" />

        <Footer />
      </body>
    </html>
  );
}
