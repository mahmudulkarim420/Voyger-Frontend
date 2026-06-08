import Link from "next/link";
import Image from "next/image";


export const PromotionalBanners = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 bg-[#FCFAF6]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
        {/* Denim Jacket Banner (Left) */}
        <Link
          href="/shop/denim-jacket"
          className="relative group overflow-hidden rounded-sm col-span-1 h-[400px] md:h-full shadow-sm"
        >
          
          <Image
            src="/images/denim-cuban_6dea078c-865b-4dfc-98e9-0795b6bab21b.jpg.jpeg"
            alt="Denim Jacket"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-none">
              DENIM
              <br />
              JACKET
            </h3>
          </div>
          {/* Faint Logo Top Left */}
          <div className="absolute top-6 left-6 opacity-50 flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10 L16 30 L28 10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="miter"
              />
              <path d="M16 2 L16 30" stroke="white" strokeWidth="1.5" />
              <path d="M10 6 L10 20" stroke="white" strokeWidth="1.5" />
              <path d="M22 6 L22 20" stroke="white" strokeWidth="1.5" />
              <path d="M4 10 L10 10" stroke="white" strokeWidth="1.5" />
              <path d="M22 10 L28 10" stroke="white" strokeWidth="1.5" />
            </svg>
            <span className="text-white text-xs tracking-widest">VOYAGE</span>
          </div>
        </Link>

        {/* Center Text & Small Banner */}
        <div className="col-span-1 flex flex-col gap-4 h-[500px] md:h-full">
          {/* Top Text Block */}
          <div className="bg-[#EBE5DE] flex-1 rounded-sm p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-6 opacity-30 flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10 L16 30 L28 10"
                  stroke="#B37068"
                  strokeWidth="1.5"
                  strokeLinejoin="miter"
                />
                <path d="M16 2 L16 30" stroke="#B37068" strokeWidth="1.5" />
                <path d="M10 6 L10 20" stroke="#B37068" strokeWidth="1.5" />
                <path d="M22 6 L22 20" stroke="#B37068" strokeWidth="1.5" />
              </svg>
              <span className="text-[#B37068] text-[10px] tracking-widest">VOYAGE</span>
            </div>

            <h3 className="text-3xl font-bold text-[#B37068] mb-4 mt-8">
              WEAR CLASSY
              <br />& STAY FIT
            </h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed max-w-[250px]">
              VOYAGE IS A JOURNEY OF CONFIDENCE THROUGH TIMELESS STYLE CREATED FOR THE MODERN MAN.
            </p>
          </div>

          {/* Bottom Small Banner */}
          <Link
            href="/shop/denim"
            className="h-[200px] md:h-[240px] relative group overflow-hidden rounded-sm shadow-sm shrink-0"
          >
            
            <Image
            src="/images/denim-cata_079a348d-72f4-4bf9-996c-574501401121.jpg.jpeg"
            alt="Denim Collection"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
          </Link>
        </div>

        {/* Style Banner (Right) */}
        <Link
          href="/shop/formal"
          className="relative group overflow-hidden rounded-sm col-span-1 h-[400px] md:h-full shadow-sm"
        >
          
          <Image
            src="/images/white-formal.jpg.jpeg"
            alt="Formal Style"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Decorative cursive text overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-white/20 font-serif italic text-8xl md:text-9xl transform -rotate-12 scale-150">
              Style
            </span>
          </div>

          <div className="absolute bottom-8 right-8 text-right">
            <div className="text-white text-xs tracking-widest mb-2 opacity-80">ORDER NOW</div>
            <h3 className="text-white text-2xl font-bold tracking-widest uppercase">
              FORMAL
              <br />
              SHIRT
            </h3>
          </div>
        </Link>
      </div>
    </section>
  );
};
