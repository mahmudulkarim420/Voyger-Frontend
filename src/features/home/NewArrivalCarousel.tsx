"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const bannerSlides = [
  {
    id: 1,
    image: "/images/panjabi-web-cover-2-pc.jpg.jpeg",
    title: "EID 2026 COLLECTION",
    tags: ["MADE FOR EID", "WORN BEYOND IT", "DESIGNED FOR EID"],
  },
  {
    id: 2,
    image: "/images/panjabi-web-cover-3-pc.jpg.jpeg",
    title: "SUMMER LUXURY",
    tags: ["NEW ARRIVALS", "PREMIUM FABRIC", "MODERN FIT"],
  },
  {
    id: 3,
    image: "/images/solid-shirtssss.jpg.jpeg",
    title: "SIGNATURE SERIES",
    tags: ["EXCLUSIVE", "LIMITED EDITION", "CRAFTED"],
  },
];

export const NewArrivalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#FCFAF6] section-padding">
      <div className="relative w-full aspect-[21/9] md:aspect-[24/9] lg:aspect-[3/1] overflow-hidden group">
        {/* Slides */}
        {bannerSlides.map((slide, index) => (
          <Link
            href="/shop/new-arrivals"
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-center"
            />
          </Link>
        ))}

        {/* Left Navigation Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 border border-white ${
                index === currentSlide ? "bg-white" : "bg-transparent hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
