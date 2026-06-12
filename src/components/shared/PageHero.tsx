import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  image: string;
  imageAlt: string;
  heightClassName?: string;
}

export function PageHero({
  title,
  image,
  imageAlt,
  heightClassName = "h-[300px] md:h-[450px]",
}: PageHeroProps) {
  return (
    <section
      className={`relative ${heightClassName} flex items-center justify-center overflow-hidden`}
    >
      <Image src={image} alt={imageAlt} fill className="object-cover brightness-[0.5]" priority />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight font-medium drop-shadow-md">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base opacity-100 tracking-widest uppercase font-medium">
          <Link href="/" className="hover:text-[#B37068] transition-colors drop-shadow-sm">
            Home
          </Link>
          <span className="text-white/60">/</span>
          <span className="underline underline-offset-4 decoration-[#B37068] drop-shadow-sm">
            {title}
          </span>
        </nav>
      </div>
    </section>
  );
}
