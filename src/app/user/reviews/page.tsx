"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { Star, MessageSquare, Plus, X } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const myReviews = [
  {
    id: "rev-1",
    productName: "Classic Silk Panjabi Collection",
    image: "/images/panjabi.jpeg",
    rating: 5,
    comment: "Excellent fabric texture and comfortable fitting for traditional occasions.",
    date: "18 Jul 2026",
  },
];

const eligibleToReview = [
  {
    id: "elig-1",
    orderId: "ORD-98421",
    productName: "Casual Slim Cotton Shirt",
    image: "/images/shirt.jpg.jpeg",
    purchaseDate: "30 Aug 2026",
  },
];

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState(myReviews);
  const [eligible, setEligible] = useState(eligibleToReview);
  const [modalItem, setModalItem] = useState<any>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem || !comment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      productName: modalItem.productName,
      image: modalItem.image,
      rating,
      comment,
      date: "Just Now",
    };

    setReviews([newRev, ...reviews]);
    setEligible(eligible.filter((item) => item.id !== modalItem.id));
    setModalItem(null);
    setComment("");
  };

  return (
    <div className="space-y-8 w-full pb-12">
      <PageHeader
        title="My Product Reviews"
        description="Share your experience and feedback for items you have purchased"
        breadcrumbs={[{ label: "My Reviews" }]}
      />

      {/* Eligible Products to Review */}
      {eligible.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <MessageSquare size={14} className="text-amber-600" /> Products Pending Review
          </h3>

          <div className="space-y-3">
            {eligible.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-amber-200/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-200">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.productName}</p>
                    <p className="text-[10px] text-gray-400">Purchased in Order #{item.orderId}</p>
                  </div>
                </div>

                <button
                  onClick={() => setModalItem(item)}
                  className="bg-[#B37068] hover:bg-[#9c6059] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Write Review</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submitted Reviews List */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Your Published Reviews</h3>

        <div className="divide-y divide-gray-100 text-xs">
          {reviews.map((r) => (
            <div key={r.id} className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-200">
                    <Image src={r.image} alt={r.productName} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{r.productName}</p>
                    <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < r.rating ? "currentColor" : "none"}
                          className={i < r.rating ? "text-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-gray-400 font-medium">{r.date}</span>
              </div>

              <p className="text-gray-600 leading-relaxed pl-13">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Write Review</h3>
              <button
                onClick={() => setModalItem(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <p className="font-bold text-gray-700 mb-1">{modalItem.productName}</p>
                <div className="flex items-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        size={20}
                        fill={star <= rating ? "currentColor" : "none"}
                        className={star <= rating ? "text-amber-500" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Feedback</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about fit, material quality, and overall experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white py-2.5 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
