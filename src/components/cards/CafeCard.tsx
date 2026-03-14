"use client";

import { useRouter } from "next/navigation";
import { CafeCardModel } from "@/models/CafeModel";
import { Star, Trophy } from "lucide-react";

type CafeCardProps = {
  cafe: CafeCardModel;
  className?: string;
  variant?: "masonry" | "best";
  bestCategory?: string;
  imageHeight?: number;
};

export default function CafeCard({
  cafe,
  className = "",
  variant = "masonry",
  bestCategory,
  imageHeight = 200,
}: CafeCardProps) {
  const router = useRouter();
  if (!cafe) return null;
  const isBest = variant === "best";

  return (
    <div
      className={`flex flex-col gap-[10px] transition duration-300 hover:scale-[1.04] cursor-pointer ${className}`}
      onClick={() => router.push(`/cafes/${cafe.id}`)}
    >
      <div
        className={[
          "relative w-full overflow-hidden rounded-2xl bg-white/5",
          isBest ? "h-[200px]" : "",
        ].join(" ")}
        style={isBest ? { height: imageHeight } : undefined}
      >
        {/* Rating badge */}
        {cafe.rating != null && (
          <div className="absolute top-2 right-2 z-10 flex gap-1 items-center bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            <Star size={11} className="text-yellow-400" fill="currentColor" />
            {cafe.rating}
          </div>
        )}

        {/* Best category badge */}
        {bestCategory && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            <Trophy size={14} />
            {bestCategory}
          </div>
        )}

        {/* Gradient overlay */}
        {bestCategory && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        )}

        {cafe.image ? (
          <img
            src={cafe.image}
            alt={cafe.name}
            loading="lazy"
            className={[
              "block w-full min-h-[200px] object-cover",
              isBest ? "h-full" : "h-auto",
            ].join(" ")}
          />
        ) : (
          <div
            className={
              isBest
                ? "w-full h-full bg-white/10"
                : "w-full h-[200px] bg-white/10"
            }
          />
        )}
      </div>

      <div className="flex flex-col px-2 gap-1 md:gap-2">
        <h3 className="text-sm font-semibold leading-snug">{cafe.name}</h3>
        <p className="text-xs font-normal leading-tight text-white/50">
          {cafe.area}
        </p>
      </div>
    </div>
  );
}
