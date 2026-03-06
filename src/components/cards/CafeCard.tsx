import { CafeCardModel } from "@/models/CafeModel";

type CafeCardProps = {
  cafe: CafeCardModel;
  className?: string;
  variant?: "masonry" | "best";
  imageHeight?: number;
};

export default function CafeCard({
  cafe,
  className = "",
  variant = "masonry",
  imageHeight = 200,
}: CafeCardProps) {
  if (!cafe) return null;
  const isBest = variant === "best";

  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      <div
        className={[
          "relative w-full overflow-hidden rounded-2xl bg-white",
          isBest ? "h-[200px]" : "",
        ].join(" ")}
        style={isBest ? { height: imageHeight } : undefined}
      >
        {cafe.rating != null && (
          <div className="absolute top-3 right-3 z-10 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ⭐ {cafe.rating}
          </div>
        )}

        {cafe.image ? (
          <img
            src={cafe.image}
            alt={cafe.name}
            loading="lazy"
            className={[
              "block w-full",
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

      <div className="flex flex-col px-[4px] gap-[4px]">
        <h3 className="text-sm font-semibold">{cafe.name}</h3>
        <p className="text-xs font-normal leading-tight text-white/70">
          {cafe.area}
        </p>
      </div>
    </div>
  );
}
