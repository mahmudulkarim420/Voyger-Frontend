"use client";

import Link from "next/link";
import { BrandPillars } from "@/components/shared/BrandPillars";
import { PageHero } from "@/components/shared/PageHero";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { HoverButton } from "@/components/ui/HoverButton";

const faqs = [
  {
    question: "How can I contact VOYAGE support?",
    answer:
      "You can reach us via phone at +880 9639279055 for immediate assistance. For general inquiries, email us at support@voyagetm.com. Our team is available from 10 AM to 8 PM, Saturday to Thursday.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we focused on providing the best experience within Bangladesh. Stay tuned to our social media for updates regarding global shipping in the future.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer a 7-day hassle-free return and exchange policy for all unworn and unwashed items with original tags. Visit our Return Policy page for more details.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking ID via SMS. You can use this ID on our logistics partner's website or contact us directly for updates.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FCFAF6] min-h-screen font-sans">
      <PageHero
        title="FAQ"
        image="/images/hero-slider-img2.webp.jpeg"
        imageAlt="FAQ Voyage"
        heightClassName="h-[300px] md:h-[400px]"
      />

      {/* FAQ Content Section */}
      <section className="py-24">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column */}
            <div className="flex flex-col items-start gap-8 sticky top-32">
              <div className="space-y-4">
                <span className="text-[#B37068] text-sm font-bold tracking-[0.2em] uppercase">
                  Support Center
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2F2923] leading-tight uppercase tracking-tight">
                  Frequently Asked <br /> Questions
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg font-light max-w-lg">
                Find quick answers to common questions about our products, shipping, and service.
                We&apos;re here to help you make your shopping experience seamless.
              </p>
              <Link href="/about">
                <HoverButton
                  variant="dark"
                  size="lg"
                  className="rounded-none uppercase tracking-widest"
                >
                  About Our Story
                </HoverButton>
              </Link>
            </div>

            {/* Right Column (Accordion) */}
            <div className="flex flex-col border-t border-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 group">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-8 flex items-center justify-between text-left transition-colors"
                  >
                    <span
                      className={`text-base md:text-lg font-medium tracking-wide transition-colors duration-300 ${openIndex === index ? "text-[#B37068]" : "text-[#2F2923] group-hover:text-[#B37068]"}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 ml-4 w-6 h-6 flex items-center justify-center transition-all duration-500 ${openIndex === index ? "text-[#B37068] rotate-180" : "text-gray-400 group-hover:text-[#B37068]"}`}
                    >
                      {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed font-light text-lg">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrandPillars
        description="Our commitment to quality, culture, and your unique style."
        italicDescription
      />
    </div>
  );
}
