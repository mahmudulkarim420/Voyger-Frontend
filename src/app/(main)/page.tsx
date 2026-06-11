import { BannerCarousel } from "@/features/home/BannerCarousel";
import { CategoryBar } from "@/features/home/CategoryBar";
import { CategoryGrid } from "@/features/home/CategoryGrid";
import { CasualShirtSection } from "@/features/home/CasualShirtSection";
import { CottonSolidShirtSection } from "@/features/home/CottonSolidShirtSection";
import { CottonSolidCarousel } from "@/features/home/CottonSolidCarousel";
import { CasualDenimShirtSection } from "@/features/home/CasualDenimShirtSection";
import { TailorFitFormalPantSection } from "@/features/home/TailorFitFormalPantSection";
import { InspiredBySection } from "@/features/home/InspiredBySection";
import { NewsletterSection } from "@/features/home/NewsletterSection";
import { LuxuryPanjabiSection } from "@/features/home/LuxuryPanjabiSection";
import { NewArrivalCarousel } from "@/features/home/NewArrivalCarousel";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[#FCFAF6]">
      {/* Banner & Categories Group */}
      <div>
        <BannerCarousel />
        <CategoryBar />
        <CategoryGrid />
        <CasualShirtSection />
        <NewArrivalCarousel />
        <LuxuryPanjabiSection />
        <CottonSolidShirtSection />
        <CottonSolidCarousel />
        <CasualDenimShirtSection />
        <TailorFitFormalPantSection />
        <InspiredBySection />
        <NewsletterSection />
      </div>
    </div>
  );
}
