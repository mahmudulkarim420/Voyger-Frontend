import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const denimShirtProducts = [
  {
    id: "destroyed-blue-denim-shirt",
    image: "/images/Destryed-Blue-i.jpg.jpeg",
    price: "Tk 990.00",
    oldPrice: "Tk 1,490.00",
  },
  {
    id: "deep-denim-shirt",
    image: "/images/deep-denim-i.jpg.jpeg",
    price: "Tk 990.00",
    oldPrice: "Tk 1,490.00",
  },
  {
    id: "black-smith-denim-shirt",
    image: "/images/black-smith-i.jpg.jpeg",
    price: "Tk 990.00",
    oldPrice: "Tk 1,490.00",
  },
  {
    id: "denim-cuban-shirt",
    image: "/images/denim-cuban_6dea078c-865b-4dfc-98e9-0795b6bab21b.jpg.jpeg",
    price: "Tk 990.00",
    oldPrice: "Tk 1,490.00",
  },
  {
    id: "denim-jacket-classic",
    image: "/images/denim-jacks-pc.jpg.jpeg",
    price: "Tk 1,290.00",
    oldPrice: "Tk 1,890.00",
  },
];

export const CasualDenimShirtSection = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <h2 className="heading-section text-center mb-12">Casual Denim Shirt</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/shop/denim-shirt"
          className="col-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0 shadow-sm"
        >
          <Image
            src="/images/denim-cata.jpg.jpeg"
            alt="Denim Shirt"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-block px-6 py-2 text-white font-bold tracking-widest text-lg drop-shadow-md transition-all duration-300 group-hover:bg-white group-hover:text-black rounded-md">
              DENIM SHIRT
            </span>
          </div>
        </Link>

        {denimShirtProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
          >
            <Image
              src={product.image}
              alt="Denim Shirt"
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

        <Link
          href="/shop/denim-shirt"
          className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
        >
          <Image
            src="/images/denim-shirt-cata.jpg.jpeg"
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
