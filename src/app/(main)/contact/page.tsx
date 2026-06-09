import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#3A322B] text-center mb-16 tracking-wide">
          Contact Us
        </h1>

        <div className="space-y-12 text-[#6A5A4A] font-serif leading-relaxed">
          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Customer Support :</h2>
            <div className="space-y-4 text-lg">
              <p><strong>Phone:</strong> +880 9639279055</p>
              <p><strong>Email:</strong> Info@Voyagetm.Com</p>
              <p>Open 24 Hours A Day, 7 Days A Week</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Office Address :</h2>
            <p className="text-lg">
              Visit us at our physical store locations across Dhaka and other major cities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Social Media :</h2>
            <p className="text-lg italic">
              Follow us on Facebook, Instagram, and Twitter for the latest updates and collections.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
