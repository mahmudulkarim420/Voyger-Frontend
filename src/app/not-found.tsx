import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shared/CartDrawer";
import { HoverButton } from "@/components/ui/HoverButton";
import { FiHome, FiShoppingBag } from "react-icons/fi";

export const metadata: Metadata = {
  title: "404 — Page Not Found | VOYAGE",
  description: "The page you are looking for does not exist or has drifted away.",
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#FCFAF6] font-sans overflow-hidden">
      <MobileNavigation />
      <Navbar />
      <CartDrawer />

      {/* ─── Ambient background gradients ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#A05C55]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-32 -right-16 w-[700px] h-[700px] rounded-full bg-[#E3C6C3]/[0.18] blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-[#A05C55]/[0.04] blur-[100px]" />
      </div>

      {/* ─── Decorative ruled lines ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[18%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A322B]/[0.06] to-transparent" />
        <div className="absolute top-[22%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A322B]/[0.04] to-transparent" />
        <div className="absolute bottom-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A322B]/[0.06] to-transparent" />
        <div className="absolute bottom-[24%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A322B]/[0.04] to-transparent" />
        <div className="hidden lg:block absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#3A322B]/[0.05] to-transparent" />
        <div className="hidden lg:block absolute top-0 right-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#3A322B]/[0.05] to-transparent" />
      </div>

      {/* ─── Floating compass rose ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] lg:right-[6%] top-[10%] lg:top-[14%] w-[160px] lg:w-[240px] opacity-[0.06] animate-[compassFloat_8s_ease-in-out_infinite] hidden md:block"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="130" cy="130" r="124" stroke="#3A322B" strokeWidth="0.75" />
          <circle cx="130" cy="130" r="110" stroke="#3A322B" strokeWidth="0.4" />
          <circle cx="130" cy="130" r="6" fill="#3A322B" />
          <line x1="130" y1="6" x2="130" y2="254" stroke="#3A322B" strokeWidth="0.5" />
          <line x1="6" y1="130" x2="254" y2="130" stroke="#3A322B" strokeWidth="0.5" />
          <line x1="42" y1="42" x2="218" y2="218" stroke="#3A322B" strokeWidth="0.35" />
          <line x1="218" y1="42" x2="42" y2="218" stroke="#3A322B" strokeWidth="0.35" />
          <polygon points="130,10 124,50 130,42 136,50" fill="#A05C55" />
          <polygon points="130,130 124,50 130,42 136,50" fill="#A05C55" opacity="0.4" />
          <polygon points="130,250 124,210 130,218 136,210" fill="#3A322B" />
          <polygon points="250,130 210,124 218,130 210,136" fill="#3A322B" />
          <polygon points="10,130 50,124 42,130 50,136" fill="#3A322B" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 130 + 110 * Math.sin(angle);
            const y1 = 130 - 110 * Math.cos(angle);
            const x2 = 130 + 118 * Math.sin(angle);
            const y2 = 130 - 118 * Math.cos(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3A322B" strokeWidth="0.75" />
            );
          })}
        </svg>
      </div>

      {/* ─── Floating small dot cluster ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] bottom-[20%] lg:bottom-[28%] opacity-[0.1] hidden lg:block animate-[compassFloat_10s_ease-in-out_1.5s_infinite]"
      >
        <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
          <circle cx="10" cy="10" r="2" fill="#A05C55" />
          <circle cx="40" cy="8" r="1.5" fill="#3A322B" />
          <circle cx="70" cy="12" r="2" fill="#A05C55" />
          <circle cx="12" cy="40" r="1.5" fill="#3A322B" />
          <circle cx="68" cy="40" r="2" fill="#A05C55" />
          <circle cx="10" cy="68" r="2" fill="#3A322B" />
          <circle cx="40" cy="72" r="1.5" fill="#A05C55" />
          <circle cx="70" cy="70" r="2" fill="#3A322B" />
          <circle cx="40" cy="40" r="3" fill="#A05C55" />
        </svg>
      </div>

      {/* ─── Main content ─── */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-10 w-full py-6 md:py-10">
        {/* Adjusted margins and removed hardcoded padding to make it compact */}
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
          
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-4 md:mb-6 animate-[fadeSlideDown_0.7s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
            <div className="h-px w-6 md:w-8 bg-[#A05C55]/50" />
            <span className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-[#A05C55] font-medium">
              Error 404
            </span>
          </div>

          {/* Giant 404 Typography */}
          <div className="relative mb-0 overflow-hidden animate-[fadeSlideDown_0.9s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
            <div className="relative select-none leading-none">
              {/* Scaled down clamp values so it perfectly fits screens */}
              <span
                aria-hidden="true"
                className="block text-[clamp(90px,16vw,200px)] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#A05C55]/[0.12] to-[#E3C6C3]/[0.20]"
                style={{ WebkitTextStroke: "1px rgba(160,92,85,0.13)" }}
              >
                404
              </span>

              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 700 220"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <clipPath id="text-clip-404">
                      <text
                        x="350"
                        y="196"
                        textAnchor="middle"
                        fontSize="220"
                        fontWeight="900"
                        fontFamily="system-ui, -apple-system, sans-serif"
                        letterSpacing="-4"
                      >
                        404
                      </text>
                    </clipPath>
                    <mask id="reveal-mask">
                      <rect
                        x="0"
                        y="0"
                        width="700"
                        height="220"
                        fill="white"
                        className="animate-[revealLeft_1.4s_cubic-bezier(0.76,0,0.24,1)_0.4s_both]"
                        style={{ transformOrigin: "left center" }}
                      />
                    </mask>
                  </defs>

                  <g clipPath="url(#text-clip-404)" mask="url(#reveal-mask)">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 7} x2="700" y2={i * 7} stroke="#A05C55" strokeWidth="0.6" opacity={0.35 + (i % 4) * 0.08} />
                    ))}
                    {Array.from({ length: 22 }).map((_, i) => (
                      <line key={`d-${i}`} x1={i * 32 - 20} y1="0" x2={i * 32 + 200} y2="220" stroke="#3A322B" strokeWidth="0.4" opacity="0.12" />
                    ))}
                  </g>

                  <text
                    x="350"
                    y="196"
                    textAnchor="middle"
                    fontSize="220"
                    fontWeight="900"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="-4"
                    fill="none"
                    stroke="#A05C55"
                    strokeWidth="0.8"
                    opacity="0.25"
                    mask="url(#reveal-mask)"
                    className="animate-[fadeIn_0.5s_ease_1.6s_both]"
                  >
                    404
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 md:my-8 animate-[fadeSlideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.55s_both]">
            <div className="flex-1 h-px bg-gradient-to-r from-[#3A322B]/10 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[#A05C55]/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-[#3A322B]/10 to-transparent" />
          </div>

          {/* Headline + body copy */}
          <div className="max-w-xl mb-8 md:mb-10 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.65s_both]">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#3A322B] tracking-tight leading-[1.15] mb-3 md:mb-4">
              Off the charted course
            </h1>
            <p className="text-[#6A5A4A] text-[14px] md:text-[15px] leading-relaxed max-w-sm">
              This page has drifted beyond our map. It may have moved, been removed, or never set sail to begin with.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.8s_both]">
            <HoverButton
              variant="primary"
              size="lg"
              href="/"
              className="group w-full sm:w-auto min-w-[180px] rounded-[2px] shadow-[0_1px_3px_rgba(58,50,43,0.08)] hover:shadow-[0_4px_16px_rgba(160,92,85,0.18)] transition-all duration-300"
            >
              <FiHome size={16} className="transition-transform duration-300 group-hover:-translate-y-px" />
              <span className="ml-2 tracking-wide text-sm font-medium">Return Home</span>
            </HoverButton>

            <HoverButton
              variant="secondary"
              size="lg"
              href="/products"
              className="group w-full sm:w-auto min-w-[180px] rounded-[2px] border border-[#3A322B]/20 hover:border-[#A05C55]/40 hover:bg-[#A05C55]/[0.04] transition-all duration-300"
            >
              <FiShoppingBag size={16} className="transition-transform duration-300 group-hover:-translate-y-px" />
              <span className="ml-2 tracking-wide text-sm font-medium">Continue Shopping</span>
            </HoverButton>
          </div>

          {/* Bottom metadata line */}
          <div className="mt-10 md:mt-12 flex items-center gap-3 animate-[fadeIn_0.7s_ease_1.1s_both]">
            <div className="h-px w-5 bg-[#3A322B]/15" />
            <span className="text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-[#3A322B]/35">
              VOYAGE — Est. wherever you are
            </span>
          </div>
        </div>
      </main>

      <Footer />

      {/* ─── Keyframe animations ─── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeSlideDown {
              from { opacity: 0; transform: translateY(-18px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes revealLeft {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }

            @keyframes compassFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(1.2deg); }
              66% { transform: translateY(-4px) rotate(-0.8deg); }
            }

            @media (prefers-reduced-motion: reduce) {
              [class*="animate-"] {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}