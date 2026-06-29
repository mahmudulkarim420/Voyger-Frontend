import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { BrandPillars } from "@/components/shared/BrandPillars";
import { PageHero } from "@/components/shared/PageHero";
import { FiCheck } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <PageHero title="About Us" image="/images/hero-slider-img.webp.jpeg" imageAlt="About Voyage" />

      {/* Our Story Section */}
      <section className="py-20 lg:py-28">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Story Image */}
            <div className="relative aspect-[16/9] lg:aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/collection-img6.webp.jpeg"
                alt="Our Story Campaign"
                fill
                className="object-cover"
              />
            </div>

            {/* Story Content */}
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <span className="text-[#B37068] text-sm font-bold tracking-[0.2em] uppercase">
                  Est. 2024
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2F2923]">
                  The Story of <span className="italic">Voyage</span>
                </h2>
              </div>
              <ul className="space-y-8">
                {[
                  "Born in Bangladesh, VOYAGE blends local culture with global streetwear to create fashion with meaning.",
                  "We redefine style by fusing street influence with cultural roots, crafting pieces that tell a story.",
                  "VOYAGE stands for confidence, self-expression, and pride in who you are—no matter your journey.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-5 items-start group">
                    <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#B37068]/10 flex items-center justify-center text-[#B37068] transition-all duration-300 group-hover:bg-[#B37068] group-hover:text-white">
                      <FiCheck size={18} strokeWidth={3} />
                    </span>
                    <p className="text-gray-700 leading-relaxed text-lg font-light">
                      {text.split("VOYAGE").map((part, index, array) => (
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span className="font-bold text-[#2F2923] tracking-wider">VOYAGE</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BrandPillars description="The core principles that define our journey and your style." />
    </div>
  );
}
