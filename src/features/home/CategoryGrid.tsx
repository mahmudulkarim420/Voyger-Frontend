import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const gridCategories = [
  {
    name: "Panjabi",
    image: "/images/vk-2000i.jpg.jpeg",
  },
  {
    name: "Checked Shirt",
    image: "/images/vc-433.jpg.jpeg",
  },
  {
    name: "Solid Shirt",
    image: "/images/white-formal.jpg.jpeg",
  },
  {
    name: "Cuban Shirt",
    image: "/images/vc-434.jpg.jpeg",
  },
  {
    name: "Denim Shirt",
    image: "/images/Destryed-Blue-i.jpg.jpeg",
  },
  {
    name: "Denim Jacket",
    image: "/images/denim-cuban_6dea078c-865b-4dfc-98e9-0795b6bab21b.jpg.jpeg",
  },
  {
    name: "Formal Pant",
    image: "/images/vp-1010i.jpg.jpeg",
  },
  {
    name: "Denim Pant",
    image: "/images/deep-denim-i.jpg.jpeg",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {gridCategories.map((item, index) => (
          <Link
            key={item.name}
            href={`/shop/${item.name.toLowerCase().replace(" ", "-")}`}
            className="group relative block overflow-hidden rounded-md aspect-[3/4] shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Label overlay - মোবাইলের জন্য ছোট করা হয়েছে */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 bg-[#FCFAF6] py-1 md:px-6 md:py-2 rounded-md shadow-sm border border-[#D5C1B6]/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-white w-[85%] md:w-auto text-center">
              <span className="text-[12px] md:text-[14px] font-medium text-gray-900 whitespace-nowrap md:tracking-wide">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};