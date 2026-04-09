"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialBar from "../SocialBar/page";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  const hide =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin");

  useEffect(() => {
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";

    const publicRoutes = ["/login", "/register"];

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      window.location.href = "/login";
    } else {
      setChecked(true);
    }
  }, [pathname]);

  if (!checked) return null;

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