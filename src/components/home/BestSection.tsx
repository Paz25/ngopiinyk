"use client";

import { useEffect, useState } from "react";
import { CafeCardModel } from "@/models/CafeModel";
import { CategoryModel } from "@/models/CategoryModel";
import CafeCard from "../cards/CafeCard";
import SkeletonCard from "../cards/SkeletonCard";

type BestCafe = CafeCardModel & {
  category: Pick<CategoryModel, "id" | "name">;
};

export default function BestSection() {
  const [cafes, setCafes] = useState<BestCafe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cafes/best");
        const json = await res.json();
        if (!cancelled)
          setCafes(
            json?.status === "OK"
              ? json.data.map((row: any) => ({
                  id: row.cafe_id,
                  name: row.cafe_name,
                  area: row.area,
                  rating: row.rating,
                  image: row.primary_image,
                  category: { id: row.category_id, name: row.category_name },
                }))
              : [],
          );
      } catch (e) {
        console.error("Fetch best cafes error:", e);
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} className="h-[200px]" />
          ))
        : cafes.map((cafe) => (
            <CafeCard
              key={cafe.category.id}
              cafe={cafe}
              bestCategory={cafe.category.name}
              variant="best"
            />
          ))}
    </div>
  );
}
