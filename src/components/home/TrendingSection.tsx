"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonCard from "../cards/SkeletonCard";

type TrendingCafe = {
  id: number;
  name: string;
  area: string;
  rating: number | null;
  view_count: number;
  image: string | null;
};

export default function TrendingSection() {
  const [cafes, setCafes] = useState<TrendingCafe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cafes/trending");
        const json = await res.json();
        if (!cancelled) {
          setCafes(json?.status === "OK" ? json.data : []);
        }
      } catch (e) {
        console.error("Fetch trending error:", e);
        if (!cancelled) setCafes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const colSpanClass = [
    "col-span-6 md:col-span-4 lg:col-span-3 md:row-span-2",
    "col-span-6 md:col-span-4 lg:col-span-3",
    "col-span-6 md:col-span-4 lg:col-span-3 md:row-span-2",
    "col-span-6 md:col-span-4 lg:col-span-3",
    "col-span-6 md:col-span-6 lg:col-span-3",
    "col-span-6 md:col-span-6 lg:col-span-3",
  ];

  return (
    <div className="grid grid-cols-12 gap-3 md:gap-4">
      {loading
        ? colSpanClass.map((cls, i) => <SkeletonCard key={i} className={cls} />)
        : cafes.map((cafe, i) => (
            <TrendingCard
              key={cafe.id}
              cafe={cafe}
              className={colSpanClass[i] ?? "col-span-6"}
            />
          ))}
    </div>
  );
}

function TrendingCard({
  cafe,
  className,
}: {
  cafe: TrendingCafe;
  className: string;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/cafes/${cafe.id}`)}
      className={[
        "relative overflow-hidden cursor-pointer group",
        "rounded-2xl min-h-[200px]",
        "transition duration-300 hover:scale-[1.02]",
        className,
      ].join(" ")}
    >
      {cafe.image ? (
        <img
          src={cafe.image}
          alt={cafe.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-white/10" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:bg-black/50" />

      <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1.5">
        <p className="text-sm md:text-base font-semibold text-white">
          {cafe.name}
        </p>
        <p className="text-xs md:text-sm text-white/70">{cafe.area}</p>
      </div>
    </div>
  );
}
