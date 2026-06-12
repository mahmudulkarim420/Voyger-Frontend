import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const luxuryProducts = [
  {
    id: "vk-2000",
    image: "/images/vk-2000i.jpg.jpeg",
    price: "Tk 2,790.00",
    oldPrice: "Tk 3,490.00",
  },
  {
    id: "vk-2001",
    image: "/images/vk-2001i.jpg.jpeg",
    price: "Tk 2,790.00",
    oldPrice: "Tk 3,490.00",
  },
  {
    id: "vk-2003",
    image: "/images/vk-2003i.jpg.jpeg",
    price: "Tk 2,790.00",
    oldPrice: "Tk 3,490.00",
  },
  {
    id: "vk-2004",
    image: "/images/vk-2004.jpg.jpeg",
    price: "Tk 2,790.00",
    oldPrice: "Tk 3,490.00",
  },
  {
    id: "vk-2005",
    image: "/images/vk-2005i.jpg.jpeg",
    price: "Tk 2,790.00",
    oldPrice: "Tk 3,490.00",
  },
];

export const LuxuryPanjabiSection = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <h2 className="heading-section text-center mb-12">Luxury Panjabi Collection</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large Left Item */}
        <Link
          href="/shop/panjabi"
          className="col-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0 shadow-sm"
        >
          <Image
            src="/images/vk-2006i.jpg.jpeg"
            alt="Luxury Panjabi"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="text-white font-bold tracking-widest text-lg drop-shadow-md">
              PANJABI
            </span>
          </div>
        </Link>

        {/* Small Items */}
        {luxuryProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
          >
            <Image
              src={product.image}
              alt="Luxury Panjabi"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#FCFAF6]/95 px-3 py-1.5 flex items-center gap-2 rounded-[2px] shadow-sm whitespace-nowrap transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-white">
              <span className="text-sm font-bold text-gray-900">{product.price}</span>
              <span className="text-xs text-gray-500 line-through">{product.oldPrice}</span>
            </div>
          </Link>
        ))}

        {/* View More Item */}
        <Link
          href="/shop/luxury-panjabi"
          className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
        >
          <Image
            src="/images/kabli-cate-i_66d6c9b9-4efb-4e53-8c42-32c62d4f20f0.jpg.jpeg"
            alt="View More"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white font-bold tracking-widest text-sm drop-shadow-md">
              VIEW MORE
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};
