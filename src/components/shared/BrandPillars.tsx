import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const pillars = [
  {
    title: "Streetwear Influence",
    description: "Trendy and globally inspired designs that capture the pulse of urban culture.",
    image: "/images/denim-cata.jpg.jpeg",
  },
  {
    title: "Cultural Roots",
    description: "Designs that celebrate our local Bangladeshi heritage with a modern twist.",
    image: "/images/kabli-cate.jpg.jpeg",
  },
  {
    title: "Premium Quality",
    description: "Uncompromising standards in durable fabrics and meticulous craftsmanship.",
    image: "/images/solid-shirtssss.jpg.jpeg",
  },
  {
    title: "Versatile Style",
    description: "From effortless casual wear to bold statement pieces for any occasion.",
    image: "/images/chek-cata_1ae23b07-7986-4e91-a4f7-ab8bd4725148.jpg.jpeg",
  },
];

interface BrandPillarsProps {
  description: string;
  italicDescription?: boolean;
}

export function BrandPillars({ description, italicDescription = false }: BrandPillarsProps) {
  return (
    <section className="py-24 bg-white/60 border-y border-gray-100">
      <div className="container-standard">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2F2923] mb-6 tracking-tight">
            Brand Pillars
          </h2>
          <p className={`text-gray-500 text-lg font-light ${italicDescription ? "italic" : ""}`}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-8 group"
            >
              <div className="relative w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#2F2923]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex flex-col justify-center sm:pt-4 text-center sm:text-left">
                <h3 className="text-2xl font-serif font-bold mb-3 text-[#2F2923] tracking-tight hover:text-[#B37068] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
