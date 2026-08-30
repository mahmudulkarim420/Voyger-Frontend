"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { fetchApi } from "@/lib/api";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    const res = await fetchApi("newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.success) {
      setStatus("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      setStatus(res.message || "Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="container-standard section-padding bg-[#FCFAF6] border-t border-[#D5C1B6]/20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="heading-section text-[#3A322B] mb-6">Subscribe To Our Newsletter</h2>
        <p className="text-gray-500 mb-10 leading-relaxed font-light italic">
          Subscribing to our newsletter allows you access in to what we do and
          <br className="hidden md:block" /> our corporate activities.
        </p>

        {status && (
          <div className="mb-6 text-sm font-medium text-[#B37068]">
            {status}
          </div>
        )}

        <form
          className="flex flex-col md:flex-row gap-0 mb-12 shadow-sm rounded-md overflow-hidden"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 bg-white border border-gray-200 focus:outline-none text-gray-700"
            required
          />
          <Button disabled={loading} className="px-10 rounded-none uppercase bg-[#B37068] tracking-widest cursor-pointer">
            {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-6">
            <a href="#" className="text-[#B37068] hover:scale-110 transition-transform">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-[#B37068] hover:scale-110 transition-transform">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-[#B37068] hover:scale-110 transition-transform">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-[#B37068] hover:scale-110 transition-transform">
              <FaYoutube size={20} />
            </a>
          </div>

          <a
            href="/find-store"
            className="flex items-center gap-3 px-8 py-3 border border-[#B37068] text-[#B37068] rounded-md hover:bg-[#B37068] hover:text-white transition-all group"
          >
            <div className="bg-[#B37068] text-white p-1.5 rounded-full group-hover:bg-white group-hover:text-[#B37068] transition-colors">
              <FaMapMarkerAlt size={14} />
            </div>
            <span className="font-medium tracking-wide">Store Location</span>
          </a>
        </div>
      </div>
    </section>
  );
};
