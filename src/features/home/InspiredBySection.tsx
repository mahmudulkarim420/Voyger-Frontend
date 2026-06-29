import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
const influencers = [
  {
    name: "Fazle Rabbi Khan",
    image: "/images/606475829_2095555847925765_5803110597960819625_n.jpg.jpeg",
  },
  {
    name: "Nahid Khan",
    image: "/images/600083214_25966825382902915_1106089753104910561_n.jpg.jpeg",
  },
  {
    name: "Amit K Roy",
    image: "/images/504013131_2897964437080261_2636334434912220936_n.jpg.jpeg",
  },
  {
    name: "Farrukh Ahmed Rehan",
    image: "/images/fb-cover.jpg.jpeg",
  },
];

export const InspiredBySection = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <h2 className="heading-section text-center mb-12">
        Inspired By <span className="text-[#B37068]">VOYAGE</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {influencers.map((person) => (
          <div key={person.name} className="flex flex-col items-center group">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md mb-4">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              />
            </div>
            <div className="bg-[#F3E9E2]/50 px-6 py-2 rounded-md shadow-sm border border-[#D5C1B6]/30 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md group-hover:bg-white group-hover:border-[#D5C1B6]/50">
              <span className="text-sm font-medium text-gray-800 italic tracking-wide group-hover:text-[#A05C55] transition-colors">
                {person.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
