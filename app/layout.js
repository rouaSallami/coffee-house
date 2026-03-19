import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutClient from "./components/LayoutClient";

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
        <LayoutClient>
          {children}
          <Toaster position="top-center" />
        </LayoutClient>
      </body>
    </html>
  );
}