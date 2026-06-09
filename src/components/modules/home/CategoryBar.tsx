"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "SHOP NOW", href: "/shop" },
  { name: "SHIRT", href: "/shop/shirt" },
  { name: "PANT", href: "/shop/pant" },
  { name: "PANJABI", href: "/shop/panjabi" },
  { name: "JACKET", href: "/shop/jacket" },
];

export const CategoryBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="w-full bg-[#FCFAF6] section-padding">
      <style>{`
        @keyframes spreadFill {
          from {
            clip-path: circle(0% at var(--mouse-x, 50%) var(--mouse-y, 50%));
          }
          to {
            clip-path: circle(150% at var(--mouse-x, 50%) var(--mouse-y, 50%));
          }
        }
      `}</style>
      <div className="container-standard">
        <div className="flex flex-nowrap overflow-x-auto justify-start lg:justify-center gap-4 md:gap-6 pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={handleMouseMove}
              className="group shrink-0 w-[160px] md:w-[220px] h-16 md:h-[72px] flex items-center justify-center relative overflow-hidden rounded-sm"
            >
              {/* Base Background */}
              <div className="absolute inset-0 bg-[#F4EBE4] border border-[#B37068] transition-all duration-300" />

              {/* Spread Overlay - Animates from hover point */}
              {hoveredIndex === index && (
                <div
                  className="absolute inset-0 bg-[#B37068]"
                  style={
                    {
                      "--mouse-x": `${mousePos.x}%`,
                      "--mouse-y": `${mousePos.y}%`,
                      animation: "spreadFill 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                    } as React.CSSProperties
                  }
                />
              )}

              {/* Text */}
              <span
                className={`relative z-10 tracking-[0.12em] text-[13px] md:text-[15px] font-semibold uppercase transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white" : "text-gray-900"
                }`}
              >
                {category.name}
              </span>

              {/* Shadow on hover */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 shadow-[0_8px_24px_-6px_rgba(179,112,104,0.3)] rounded-sm pointer-events-none" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
