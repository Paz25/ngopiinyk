import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import TrendingSection from "@/components/home/TrendingSection";
import BestSection from "@/components/home/BestSection";
import MasonrySection from "@/components/home/MasonrySection";
import BestCafeCard from "@/components/cards/CafeCard";

import { cafeDummies } from "@/data/Cafes";

export default function HomePage() {
  const cafes = cafeDummies;
  return (
    <main className="flex flex-col min-h-screen w-full gap-[80px] px-12 pt-2 pb-30 bg-[var(--color-background)]">
      <div id="hero-banner" className="relative w-full h-[400px]">
        <div className="relative h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-banner.jpg"
            alt="Hero Kafe Jogja"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-balance text-white text-3xl font-semibold">
              Temukan Kafe yang Tepat untuk Setiap Momen
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm text-white/80 sm:text-base">
              Jelajahi kafe di Jogja sesuai kebutuhan dan ceritamu hari ini.
            </p>
          </div>
        </div>
        <SearchBar position="absolute left-1/2 top-full  -translate-x-1/2 -translate-y-1/2" />
      </div>
      <TrendingSection />
      <BestSection />
      <MasonrySection>
        {cafes.map((cafe) => (
          <div key={cafe.id} className="break-inside-avoid mb-6">
            <BestCafeCard
              title={cafe.name}
              content={cafe.area}
              imageUrl={cafe.image}
            />
          </div>
        ))}
      </MasonrySection>
    </main>
  );
}
