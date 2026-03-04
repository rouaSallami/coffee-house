import Image from "next/image";
import Hero from "./components/Home/Hero";
import HomeCoffeesSection from "./components/Home/HomeCoffeesSection";
import HomeAddonsSection from "./components/Home/HomeAddonsSection";
import HowItWorks from "./components/Home/HowItWorks";
import AvisPreview from "./components/Home/AvisPreview";
import AvisForm from "./avisClient/avisClient";
import RewardsTeaser from "./components/Home/RewardsTeaser";
import DeliveryZones from "./components/Home/DeliveryZones";
import PourquoiNous from "./components/Home/PourquoiNous";

export default function Home() {
  return (
    <div className="bg-accent min-h-screen">
      <Hero />
      <HomeCoffeesSection />
      <HomeAddonsSection />
      <HowItWorks />
      <RewardsTeaser />
      <PourquoiNous />
      <AvisPreview />
      <AvisForm />
    </div>
  );
}
