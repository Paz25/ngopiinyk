import { Metadata } from "next";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import TrendingSection from "@/components/home/TrendingSection";
import BestSection from "@/components/home/BestSection";
import MasonrySection from "@/components/home/MasonrySection";

export const metadata: Metadata = {
  title:
    "Ngopiinyk | Jelajahi kafe di Jogja sesuai kebutuhan dan ceritamu hari ini.",
  description: "Temukan Kafe yang Tepat untuk Setiap Momen",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-16 md:gap-20 px-4 sm:px-12 pb-16 md:pb-20 bg-[var(--color-background)]">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div id="hero-banner" className="relative w-full h-[300px] md:h-[400px]">
        <div className="relative h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-banner.jpg"
            alt="Hero Kafe Jogja"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-balance text-white text-2xl md:text-3xl font-semibold">
              Temukan Kafe yang Tepat untuk Setiap Momen
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm md:text-base text-white/70">
              Jelajahi kafe di Jogja sesuai kebutuhan dan ceritamu hari ini.
            </p>
          </div>
        </div>
        <SearchBar position="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* ── Trending ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Yang Lagi Ngetren
        </h2>
        <TrendingSection />
      </div>

      {/* ── Best per Category ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Terbaik di Setiap Kategori
        </h2>
        <BestSection />
      </div>

      {/* ── Masonry ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Lihat Mana Yang Kamu Suka
        </h2>
        <MasonrySection />
      </div>
    </main>
  );
}
