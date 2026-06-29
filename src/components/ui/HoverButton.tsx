"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
}

export const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      href,
      onMouseMove,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (localRef.current) {
        const rect = localRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
      onMouseMove?.(e);
    };

    const variantConfig = {
      primary: {
        base: "bg-[#A05C55] text-white",
        bgColor: "#A05C55",
        textColor: "white",
        hoverBg: "white",
        hoverText: "#A05C55",
        hoverBorder: "1px solid #A05C55",
      },
      secondary: {
        base: "border border-gray-200 bg-white text-gray-900",
        bgColor: "white",
        textColor: "#111827",
        hoverBg: "#111827",
        hoverText: "white",
        hoverBorder: "1px solid #111827",
      },
      accent: {
        base: "bg-[#B37068] text-white",
        bgColor: "#B37068",
        textColor: "white",
        hoverBg: "white",
        hoverText: "#B37068",
        hoverBorder: "1px solid #B37068",
      },
      success: {
        base: "bg-[#6C714D] text-white",
        bgColor: "#6C714D",
        textColor: "white",
        hoverBg: "white",
        hoverText: "#6C714D",
        hoverBorder: "1px solid #6C714D",
      },
      dark: {
        base: "bg-black text-white",
        bgColor: "black",
        textColor: "white",
        hoverBg: "white",
        hoverText: "black",
        hoverBorder: "1px solid black",
      },
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const buttonClass = cn(
      "relative inline-flex items-center justify-center font-bold rounded-[1px] focus:outline-none focus:ring-2 focus:ring-black/5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] uppercase tracking-wider overflow-hidden shadow-sm transition-colors duration-500",
      variantConfig[variant].base,
      sizes[size],
      className,
    );

    const style = {
      "--mouse-x": `${mousePosition.x}%`,
      "--mouse-y": `${mousePosition.y}%`,
      "--hover-color": variantConfig[variant].hoverBg,
      color: isHovering ? variantConfig[variant].hoverText : variantConfig[variant].textColor,
    } as React.CSSProperties & {
      "--mouse-x": string;
      "--mouse-y": string;
      "--hover-color": string;
    };

    const buttonContent = (
      <>
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </>
    );

    const spreadFillStyle = `
      @keyframes spreadFill {
        from {
          clip-path: circle(0% at var(--mouse-x, 50%) var(--mouse-y, 50%));
        }
        to {
          clip-path: circle(150% at var(--mouse-x, 50%) var(--mouse-y, 50%));
        }
      }

      .spread-fill-animation {
        animation: spreadFill 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
    `;

    if (href) {
      return (
        <Link href={href} className="inline-flex">
          <button
            ref={localRef || ref}
            disabled={disabled || isLoading}
            style={style}
            className={buttonClass}
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => {
              setIsHovering(true);
              const overlay = (e.currentTarget as HTMLButtonElement).querySelector(
                ".spread-fill-overlay",
              ) as HTMLElement;
              if (overlay) {
                overlay.classList.add("spread-fill-animation");
              }
            }}
            onMouseLeave={(e) => {
              setIsHovering(false);
              const overlay = (e.currentTarget as HTMLButtonElement).querySelector(
                ".spread-fill-overlay",
              ) as HTMLElement;
              if (overlay) {
                overlay.classList.remove("spread-fill-animation");
              }
            }}
            {...props}
          >
            <style>{spreadFillStyle}</style>
            <div className="relative z-10 flex items-center justify-center gap-2">
              {buttonContent}
            </div>
            <div
              className="spread-fill-overlay absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: variantConfig[variant].hoverBg,
                border: variantConfig[variant].hoverBorder,
                clipPath: `circle(0% at var(--mouse-x) var(--mouse-y))`,
              }}
            />
          </button>
        </Link>
      );
    }

    return (
      <>
        <style>{spreadFillStyle}</style>
        <button
          ref={localRef || ref}
          disabled={disabled || isLoading}
          style={style}
          className={buttonClass}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            setIsHovering(true);
            const overlay = (e.currentTarget as HTMLButtonElement).querySelector(
              ".spread-fill-overlay",
            ) as HTMLElement;
            if (overlay) {
              overlay.classList.add("spread-fill-animation");
            }
          }}
          onMouseLeave={(e) => {
            setIsHovering(false);
            const overlay = (e.currentTarget as HTMLButtonElement).querySelector(
              ".spread-fill-overlay",
            ) as HTMLElement;
            if (overlay) {
              overlay.classList.remove("spread-fill-animation");
            }
          }}
          {...props}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {buttonContent}
          </div>
          <div
            className="spread-fill-overlay absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: variantConfig[variant].hoverBg,
              border: variantConfig[variant].hoverBorder,
              clipPath: `circle(0% at var(--mouse-x) var(--mouse-y))`,
            }}
          />
        </button>
      </>
    );
  },
);

HoverButton.displayName = "HoverButton";
