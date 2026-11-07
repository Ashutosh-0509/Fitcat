import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

const PLACEHOLDER_REVIEWS = [
  {
    id: 1,
    name: "Riya M.",
    rating: 5,
    body: "The chutney cheese sandwich is absolutely amazing! So fresh and flavourful. Will definitely order again.",
  },
  {
    id: 2,
    name: "Aditya K.",
    rating: 5,
    body: "Best healthy food delivery in Vikhroli. The chia pudding is to die for. Love that everything is made fresh.",
  },
  {
    id: 3,
    name: "Sneha P.",
    rating: 5,
    body: "Finally a healthy option near the railway station. The assorted fruits are so fresh and the portions are great for the price.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "h-3.5 w-3.5",
            s <= rating ? "fill-[#ff632b] text-[#ff632b]" : "fill-transparent text-[#dfd4c7]"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(PLACEHOLDER_REVIEWS);

  const handleNewReview = ({ name, body, rating }) => {
    setReviews((prev) => [
      { id: Date.now(), name, body, rating },
      ...prev,
    ]);
  };

  return (
    <section
      id="reviews"
      className="bg-[#f8f5ef] px-5 py-20 text-[#142820] sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#ff632b]">
            05 / REVIEWS
          </p>
          <h2 className="mt-3 font-display text-[32px] sm:text-[46px] font-extrabold uppercase tracking-tight text-[#142820]">
            What People Say.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#2c5240]/80">
            Real feedback from our regular guests and healthy food lovers in Mumbai.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col gap-4 rounded-[22px] border border-[#e5ded0] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <StarRating rating={review.rating} />
              <p className="text-[15px] leading-relaxed text-[#2c5240]/85 italic">
                "{review.body}"
              </p>
              <p className="mt-auto font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#8c6b53]">
                {review.name}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 mx-auto max-w-lg rounded-[24px] border border-[#e5ded0] bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-display text-[18px] font-bold text-[#142820] mb-4">
            Share Your Feedback
          </h3>
          <ReviewForm onSuccess={handleNewReview} />
        </div>
      </div>
    </section>
  );
}
