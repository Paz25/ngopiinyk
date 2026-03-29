"use client";

import { useRouter } from "next/navigation";
import { CafeCardModel } from "@/models/CafeModel";
import { Star, Trophy } from "lucide-react";

type CafeCardProps = {
  cafe: CafeCardModel;
  className?: string;
  imageClassName?: string;
  variant?: "masonry" | "best";
  bestCategory?: string;
  imageHeight?: number;
};

export default function CafeCard({
  cafe,
  className = "",
  imageClassName = "",
  variant = "masonry",
  bestCategory,
  imageHeight = 200,
}: CafeCardProps) {
  const router = useRouter();
  if (!cafe) return null;
  const isBest = variant === "best";

  return (
    <div
      className={`flex flex-col gap-3 transition duration-300 hover:scale-[1.02] cursor-pointer ${className}`}
      onClick={() => router.push(`/cafes/${cafe.id}`)}
    >
      {/* ── Image container ─────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white/10"
        style={isBest ? { height: imageHeight } : undefined}
      >
        {cafe.rating != null && (
          <div className="absolute top-2 right-2 z-10 flex gap-1 items-center bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            <Star size={11} className="text-yellow-400" fill="currentColor" />
            {cafe.rating}
          </div>
        )}

        {bestCategory && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-bold px-2 py-1 rounded-full shadow">
            <Trophy size={14} />
            {bestCategory}
          </div>
        )}

        {bestCategory && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        )}

        {cafe.image ? (
          <img
            src={cafe.image}
            alt={cafe.name}
            loading="lazy"
            className={[
              "block object-cover object-center",
              isBest ? "h-full" : "h-auto",
              imageClassName || "w-full min-h-[200px]",
            ].join(" ")}
          />
        ) : (
          <div
            className={[
              "bg-white/20",
              isBest ? "h-full" : "h-auto",
              imageClassName || "w-full min-h-[200px]",
            ].join(" ")}
          />
        )}
      </div>

      {/* ── Card info ───────────────────────────────────────────────────── */}
      <div className="flex flex-col px-2 gap-1.5">
        <h3 className="text-sm font-semibold text-white leading-snug">
          {cafe.name}
        </h3>
        <p className="text-xs text-white/70 leading-tight">{cafe.area}</p>
      </div>
    </div>
  );
}
