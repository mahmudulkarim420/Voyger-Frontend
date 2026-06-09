import Link from "next/link";
import Image from "next/image";

const smallProducts = [
  {
    id: "vc-433",
    image: "/images/vc-433.jpg.jpeg",
    price: "Tk 1,490.00",
    oldPrice: "Tk 1,790.00",
  },
  {
    id: "vc-434",
    image: "/images/vc-434.jpg.jpeg",
    price: "Tk 1,290.00",
    oldPrice: "Tk 1,890.00",
  },
  {
    id: "vc-435",
    image: "/images/vc-435.jpg.jpeg",
    price: "Tk 1,290.00",
    oldPrice: "Tk 1,890.00",
  },
  {
    id: "vc-436",
    image: "/images/vc-436.jpg.jpeg",
    price: "Tk 1,290.00",
    oldPrice: "Tk 1,950.00",
  },
  {
    id: "vc-437",
    image: "/images/vc-437i.jpg.jpeg",
    price: "Tk 1,290.00",
    oldPrice: "Tk 1,950.00",
  },
];

export const CasualShirtSection = () => {
  return (
    <section className="container-standard section-padding bg-[#FCFAF6]">
      <h2 className="heading-section text-center mb-12">Casual Shirt</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large Left Item */}
        <Link
          href="/shop/casual-shirt/checked"
          className="col-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0 shadow-sm"
        >
          <Image
            src="/images/kabli-cate.jpg.jpeg"
            alt="Checked Shirt"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="text-white font-bold tracking-widest text-lg drop-shadow-md">
              CHECKED SHIRT
            </span>
          </div>
        </Link>

        {/* Small Items */}
        {smallProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
          >
            <Image
              src={product.image}
              alt="Casual Shirt"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#FCFAF6]/95 px-3 py-1.5 flex items-center gap-2 rounded-sm shadow-sm whitespace-nowrap">
              <span className="text-sm font-bold text-gray-900">{product.price}</span>
              <span className="text-xs text-gray-500 line-through">{product.oldPrice}</span>
            </div>
          </Link>
        ))}

        {/* View More Item */}
        <Link
          href="/shop/casual-shirt"
          className="col-span-1 relative group overflow-hidden rounded-sm aspect-[4/5] shadow-sm"
        >
          <Image
            src="/images/vc-505.jpg.jpeg"
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
