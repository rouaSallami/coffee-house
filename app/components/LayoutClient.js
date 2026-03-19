"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialBar from "../SocialBar/page";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hide = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hide && <Navbar />}
      {!hide && <SocialBar />}
      {!hide && (
        <div className="h-[0.5px] bg-linear-to-r from-transparent via-accent to-transparent"></div>
      )}

      {children}

      {!hide && <Footer />}
    </>
  );
}