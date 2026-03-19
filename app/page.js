"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Home/Hero";
import HomeCoffeesSection from "./components/Home/HomeCoffeesSection";
import HomeAddonsSection from "./components/Home/HomeAddonsSection";
import HowItWorks from "./components/Home/HowItWorks";
import AvisPreview from "./components/Home/AvisPreview";
import RewardsTeaser from "./components/Home/RewardsTeaser";
import PourquoiNous from "./components/Home/PourquoiNous";
import FinalCTA from "./components/Home/ctaFinal";

export default function Home() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      window.location.href = "/login";
    } else {
      setChecked(true);
    }
  }, []);

  // باش ما يبان حتى شي قبل ما يعمل check
  if (!checked) return null;

  return (
    <div className="bg-accent min-h-screen">
      <Hero />
      <HomeCoffeesSection />
      <HomeAddonsSection />
      <HowItWorks />
      <RewardsTeaser />
      <PourquoiNous />
      <AvisPreview />
      <FinalCTA />
    </div>
  );
}