type CafeCardProps = {
  className?: string;
  title?: string;
  content?: string;
  bestCategory?: string;
  imageUrl?: string;
  variant?: "masonry" | "best";
  imageHeight?: number;
};

export default function CafeCard({
  className = "",
  title = "",
  content = "",
  bestCategory = "",
  imageUrl = "",
  variant = "masonry",
  imageHeight = 200,
}: CafeCardProps) {
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
        {bestCategory && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-[var(--color-primary)] px-[10px] py-[5px] text-xs font-semibold text-white">
            Terbaik untuk {bestCategory}
          </div>
        )}

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
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
      {title && (
        <div className="flex flex-col px-[4px] gap-[4px]">
          <h3 className="text-sm font-semibold">{title}</h3>
          {content && (
            <p className="text-xs font-normal leading-tight text-white/70">
              {content}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
