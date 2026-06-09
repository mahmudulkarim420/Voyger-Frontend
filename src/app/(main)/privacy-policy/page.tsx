import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#3A322B] text-center mb-16 tracking-wide">
          Privacy Policy
        </h1>

        <div className="space-y-12 text-[#6A5A4A] font-serif leading-relaxed">
          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Information Collection :</h2>
            <p className="text-lg">
              We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">How We Use Your Data :</h2>
            <p className="text-lg">
              Your data is used to process your orders, provide customer support, and send you updates about our products and promotions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Security :</h2>
            <p className="text-lg italic">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
