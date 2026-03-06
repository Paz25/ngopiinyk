"use client";

import { CafeCardModel } from "@/models/CafeModel";
import { useEffect, useState } from "react";
import CafeCard from "../cards/CafeCard";
import SkeletonCard from "../cards/SkeletonCard";

const SKELETON_HEIGHTS = [
  "h-[290px]",
  "h-[270px]",
  "h-[160px]",
  "h-[320px]",
  "h-[240px]",
  "h-[260px]",
];

export default function MasonrySection() {
  const [cafes, setCafes] = useState<CafeCardModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cafes");
        const json = await res.json();
        if (!cancelled)
          setCafes(json?.status === "OK" ? (json.data as CafeCardModel[]) : []);
      } catch (e) {
        console.error("Fetch cafes error:", e);
        if (!cancelled) setCafes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Lihat Mana Yang Kamu Suka</h2>
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6">
        {loading
          ? SKELETON_HEIGHTS.map((h, i) => (
              <div key={i} className="break-inside-avoid mb-6">
                <SkeletonCard className={h} />
              </div>
            ))
          : cafes.map((cafe) => (
              <div key={cafe.id} className="break-inside-avoid mb-6">
                <CafeCard cafe={cafe} />
              </div>
            ))}
      </div>
    </div>
  );
}
