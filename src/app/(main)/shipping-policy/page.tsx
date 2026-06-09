import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#3A322B] text-center mb-16 tracking-wide">
          Shipping Policy
        </h1>

        <div className="space-y-12 text-[#6A5A4A] font-serif leading-relaxed">
          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Delivery Areas :</h2>
            <p className="text-lg">
              We deliver all across Bangladesh. Shipping charges vary based on the delivery location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Delivery Timeline :</h2>
            <div className="space-y-4 text-lg">
              <p>• Inside Dhaka: 2-3 business days</p>
              <p>• Sub-Dhaka: 3-5 business days</p>
              <p>• Outside Dhaka: 5-7 business days</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Note :</h2>
            <p className="text-lg italic">
              Delivery timelines are estimates and may vary during peak seasons or due to unforeseen circumstances.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
