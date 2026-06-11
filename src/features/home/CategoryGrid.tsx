import Link from "next/link";
import Image from "next/image";

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
        {gridCategories.map((item) => (
          <Link
            key={item.name}
            href={`/shop/${item.name.toLowerCase().replace(" ", "-")}`}
            className="group relative block overflow-hidden rounded-md aspect-[3/4] shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Label overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FCFAF6] px-6 py-2 rounded shadow-sm border border-[#D5C1B6]/50">
              <span className="text-[14px] font-medium text-gray-900 whitespace-nowrap tracking-wide">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
