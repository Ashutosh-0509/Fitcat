import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewForm({ onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    // Store locally since we have no backend connection here
    setSubmitted(true);
    if (onSuccess) onSuccess({ name, body, rating });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-linen/10 bg-forest-soft/60 p-6 text-center">
        <p className="text-[16px] font-medium text-linen">Thank you for your review! 🙏</p>
        <p className="mt-2 text-[14px] text-linen/60">We appreciate your feedback.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-linen/10 bg-forest-soft/60 p-6 space-y-5">
      <h3 className="fc-label text-[10px] text-primary">Leave a Review</h3>

      {/* Star rating */}
      <div className="flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 text-linen/30 transition-colors"
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                star <= (hovered || rating) ? "fill-primary text-primary" : "fill-transparent"
              )}
            />
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reviewer-name" className="text-linen/70 text-[13px]">Your name</Label>
        <Input
          id="reviewer-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Priya S."
          required
          className="bg-forest/40 border-linen/15 text-linen placeholder:text-linen/30"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reviewer-body" className="text-linen/70 text-[13px]">Your review</Label>
        <Textarea
          id="reviewer-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What did you think?"
          rows={3}
          required
          className="bg-forest/40 border-linen/15 text-linen placeholder:text-linen/30"
        />
      </div>

      <button
        type="submit"
        disabled={!rating}
        className="rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        Submit Review
      </button>
    </form>
  );
}
