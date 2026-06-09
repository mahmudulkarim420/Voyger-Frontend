import React from "react";

export default function TermsOfService() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#3A322B] text-center mb-16 tracking-wide">
          Terms of Service
        </h1>

        <div className="space-y-12 text-[#6A5A4A] font-serif leading-relaxed">
          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">User Agreement :</h2>
            <p className="text-lg">
              By using our website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Product Accuracy :</h2>
            <p className="text-lg">
              We attempt to be as accurate as possible in the description of our products. However, we do not warrant that product descriptions are accurate, complete, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Liability :</h2>
            <p className="text-lg italic">
              Voyage shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
