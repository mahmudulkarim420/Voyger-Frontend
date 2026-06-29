"use client";

import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero-slider-img.webp.jpeg",
    subtitle: "Summer Collection 2026",
    title: "ESSENTIAL ELEGANCE",
    description:
      "Discover our curated collection of luxury fashion pieces designed for the modern individual.",
    buttonText: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/hero-slider-img2.webp.jpeg",
    subtitle: "New Arrivals",
    title: "LUXURY REDEFINED",
    description:
      "Experience the ultimate comfort with our premium silk and organic cotton collections.",
    buttonText: "Discover",
    link: "/products",
  },
  {
    id: 3,
    image: "/images/single-banner-img3.webp.jpeg",
    subtitle: "Exclusive Editorial",
    title: "MODERN MINIMALISM",
    description: "Clean lines and sophisticated silhouettes for your everyday wardrobe.",
    buttonText: "Explore Collection",
    link: "/shop",
  },
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlay(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlay(false);
  };

  return (
    <section className="group relative w-full aspect-[21/9] md:aspect-[24/9] lg:aspect-[3/1] overflow-hidden bg-[#1a1a1a]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0} // Preload the first slide for LCP
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
          </div>

          {/* Content Overlays can be added here if needed, but keeping current structure */}
        </div>
      ))}

      {/* Left Navigation Button */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrevSlide}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/50 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-all"
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Right Navigation Button */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleNextSlide}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/50 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-all"
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};
