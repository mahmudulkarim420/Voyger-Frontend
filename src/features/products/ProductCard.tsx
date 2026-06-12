import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export const ProductCard = ({ product, priority = false, className = "" }: ProductCardProps) => {
  const primaryImage = product.images[0] ?? "/images/solid-shirtssss.jpg.jpeg";
  const secondaryImage = product.images[1];
  const isLowStock = product.stock > 0 && product.stock <= 8;
  const isSoldOut = product.stock <= 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group block ${className}`}
      aria-label={`View ${product.name}`}
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#EFE6DE] shadow-sm">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition duration-700 group-hover:scale-[1.035] ${
              secondaryImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
            />
          )}


          {(isSoldOut || isLowStock) && (
            <span className="absolute left-3 top-3 bg-[#FCFAF6]/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A322B] shadow-sm">
              {isSoldOut ? "Sold Out" : "Low Stock"}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col border-b border-[#D5C1B6]/50 px-1 py-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-product-name transition-colors group-hover:text-[#A05C55]">
              {product.name}
            </h3>
            <div className="shrink-0 text-right">
              <p className="text-product-price">{formatPrice(product.price)}</p>
              {product.oldPrice && (
                <p className="text-xs italic text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="border border-[#D5C1B6]/70 px-2 py-1 text-xs font-medium text-[#6A5A4A]"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
