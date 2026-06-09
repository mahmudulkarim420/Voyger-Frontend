import React from "react";

export default function RefundPolicy() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#3A322B] text-center mb-16 tracking-wide">
          Refund policy
        </h1>

        <div className="space-y-12 text-[#6A5A4A] font-serif leading-relaxed">
          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Return :</h2>
            <p className="text-lg">
              Check the product while the delivery man is at your place. If the product does not meet your expectations, please return it by the delivery man with delivery charges only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Exchange :</h2>
            <div className="space-y-6 text-lg">
              <p>You can change only size not color. ( Within 72hours. )</p>
              <p>It is within 03 Days from the delivery date.</p>
              <p>
                All items to be exchanged must be unused and in their original condition with all original tags and packaging intact and should not be broken or tampered with.
              </p>
              <p>
                Replacement for products are subject to inspection and checking by <span className="tracking-[0.3em] font-bold">V O Y A G E</span> team.
              </p>
              <p>
                Replacement is subject to availability of stock with the Supplier. If the product is out of stock, you will receive a full refund, no questions asked.
              </p>
              <p>
                Please note that the Cash on Delivery convenience charge and the shipping charge would not be included in the refund value of your order as these are non-refundable charges.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-[#3A322B]">Note :</h2>
            <p className="text-lg italic">
              Please note: Colors may appear slightly different due to lighting during photography or variations in your screen settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
