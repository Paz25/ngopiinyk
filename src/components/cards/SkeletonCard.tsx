export default function SkeletonCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        "bg-white/40 rounded-2xl animate-pulse min-h-[200px]",
        className,
      ].join(" ")}
    />
  );
}
