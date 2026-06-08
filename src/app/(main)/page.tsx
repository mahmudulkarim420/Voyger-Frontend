import { BannerCarousel } from "@/components/modules/home/BannerCarousel";
import { CategoryBar } from "@/components/modules/home/CategoryBar";
import { CategoryGrid } from "@/components/modules/home/CategoryGrid";
import { CasualShirtSection } from "@/components/modules/home/CasualShirtSection";
import { CottonSolidShirtSection } from "@/components/modules/home/CottonSolidShirtSection";
import { CottonSolidCarousel } from "@/components/modules/home/CottonSolidCarousel";
import { CasualDenimShirtSection } from "@/components/modules/home/CasualDenimShirtSection";
import { TailorFitFormalPantSection } from "@/components/modules/home/TailorFitFormalPantSection";
import { InspiredBySection } from "@/components/modules/home/InspiredBySection";
import { NewsletterSection } from "@/components/modules/home/NewsletterSection";
import { LuxuryPanjabiSection } from "@/components/modules/home/LuxuryPanjabiSection";
import { NewArrivalCarousel } from "@/components/modules/home/NewArrivalCarousel";

export default function Home() {
  return (
    <div className="flex flex-col pb-20 bg-[#FCFAF6]">
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
