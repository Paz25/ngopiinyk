"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { CategoryModel } from "@/models/CategoryModel";

export default function Explore() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();

        if (!cancelled) {
          if (json?.status === "OK")
            setCategories(json.data as CategoryModel[]);
          else setCategories([]);
        }
      } catch (e) {
        console.error("Fetch categories error:", e);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full px-12 pt-2 pb-30 gap-[20px]">
      <div
        id="explore-banner"
        className="relative w-full flex flex-col justify-center items-center py-[40px] gap-[20px]"
      >
        <h1 className="text-balance text-white text-center text-[24px] font-semibold">
          Kafe kayak apa yang kamu cari?
        </h1>
        <SearchBar />
      </div>

      <div id="category" className="flex flex-wrap justify-center gap-[20px]">
        {loading ? (
          <div className="text-sm text-black/60">Loading kategori...</div>
        ) : categories.length === 0 ? (
          <div className="text-sm text-black/60">Belum ada kategori.</div>
        ) : (
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              active={activeId === cat.id}
              onClick={() =>
                console.log(`Kategori ${cat.name} dengan id ${cat.id} diklik`)
              }
            />
          ))
        )}
      </div>
    </main>
  );
}

function CategoryCard(props: {
  category: CategoryModel;
  active: boolean;
  onClick: () => void;
}) {
  const { category, active, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={[
        "relative overflow-hidden cursor-pointer group",
        "w-full sm:w-[48%] lg:w-[30%]",
        "rounded-2xl h-[200px] text-left transition",
        active ? "ring-2 ring-black" : "hover:scale-[1.01]",
      ].join(" ")}
    >
      {category.top_cafe_image ? (
        <img
          src={category.top_cafe_image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/50 transition-all duration-300" />

      <div className="absolute bottom-0 left-0 p-5">
        <div className="text-lg font-semibold text-white">{category.name}</div>
        <div className="mt-1 text-xs text-white/80 max-h-0 overflow-hidden opacity-0 translate-y-2 group-hover:max-h-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          Klik untuk lihat lebih banyak
        </div>
      </div>
    </div>
  );
}
