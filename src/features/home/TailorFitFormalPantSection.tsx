import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const formalPantProducts = [
  {
    id: "vp-1010",
    image: "/images/vp-1010i.jpg.jpeg",
    price: "Tk 1,320.00",
    oldPrice: "Tk 1,720.00",
  },
  {
    id: "vp-1011",
    image: "/images/vp-1011i.jpg.jpeg",
    price: "Tk 1,480.00",
    oldPrice: "Tk 1,880.00",
  },
  {
    id: "vp-1022",
    image: "/images/vp-1022I.jpg.jpeg",
    price: "Tk 1,480.00",
    oldPrice: "Tk 1,880.00",
  },
  {
    id: "vp-1033",
    image: "/images/vp-1033i.jpg.jpeg",
    price: "Tk 1,420.00",
    oldPrice: "Tk 1,820.00",
  },
  {
    id: "vp-1067",
    image: "/images/vp-1067i.jpg.jpeg",
    price: "Tk 1,480.00",
    oldPrice: "Tk 1,880.00",
  },
];

export const TailorFitFormalPantSection = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <h2 className="heading-section text-center mb-12">Tailor Fit Formal Pant</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/shop/formal-pant"
          className="col-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0 shadow-sm"
        >
          <Image
            src="/images/vp-1072.jpg.jpeg"
            alt="Formal Pant"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-block px-6 py-2 text-white font-bold tracking-widest text-lg drop-shadow-md transition-all duration-300 group-hover:bg-white group-hover:text-black rounded-md">
              FORMAL PANT
            </span>
          </div>
        </Link>

        {formalPantProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
          >
            <Image
              src={product.image}
              alt="Formal Pant"
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
          href="/shop/formal-pant"
          className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
        >
          <Image
            src="/images/Charcol-Ash-Pant.jpg.jpeg"
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
