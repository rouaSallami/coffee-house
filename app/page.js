import Hero from "./components/Home/Hero";
import HomeCoffeesSection from "./components/Home/HomeCoffeesSection";
import HomeAddonsSection from "./components/Home/HomeAddonsSection";
import HowItWorks from "./components/Home/HowItWorks";
import AvisPreview from "./components/Home/AvisPreview";
import RewardsTeaser from "./components/Home/RewardsTeaser";
import PourquoiNous from "./components/Home/PourquoiNous";
import FinalCTA from "./components/Home/ctaFinal";


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
      <FinalCTA/>
    </div>
  );
}
