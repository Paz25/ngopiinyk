"use client";

import { useRouter } from "next/navigation";
import { CafeCardModel } from "@/models/CafeModel";
import { encodeId } from "@/lib/hashid";

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
      onClick={() => router.push(`/cafes/${encodeId(cafe.id)}`)}
    >
      <div
        className={[
          "relative w-full overflow-hidden rounded-2xl bg-white",
          isBest ? "h-[200px]" : "",
        ].join(" ")}
        style={isBest ? { height: imageHeight } : undefined}
      >
        {cafe.rating != null && (
          <div className="absolute top-2 right-2 z-10 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ⭐ {cafe.rating}
          </div>
        )}
        {bestCategory && (
          <div className="absolute bottom-2 left-2 bg-primary text-xs font-semibold px-2 py-1 rounded-full text-[var(--color-background)] w-fit">
            Terpopuler untuk {bestCategory}
          </div>
        )}

        {cafe.image ? (
          <img
            src={cafe.image}
            alt={cafe.name}
            loading="lazy"
            className={[
              "block w-full min-h-[200px] object-cover",
              isBest ? "h-full object-cover" : "h-auto object-cover",
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

      <div className="flex flex-col px-2 gap-1">
        <h3 className="text-sm font-semibold">{cafe.name}</h3>
        <p className="text-xs font-normal leading-tight text-white/70">
          {cafe.area}
        </p>
      </div>
    </div>
  );
}
