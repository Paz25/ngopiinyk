import Image from "next/image";
import { Search } from "lucide-react";

import TrendingSection from "@/components/home/TrendingSection";
import BestSection from "@/components/home/BestSection";
import MasonrySection from "@/components/home/MasonrySection";
import BestCafeCard from "@/components/cards/CafeCard";

import { cafeDummies } from "@/data/Cafes";

export default function HomePage() {
  const cafes = cafeDummies;
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[var(--color-background)]">
      <main className="flex flex-col min-h-screen w-full gap-[80px] px-12 pt-2 pb-30">
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
          {/* Search bar */}
          <div className="absolute left-1/2 top-full w-full max-w-4xl -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-stretch overflow-hidden rounded-full bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur">
              <div className="flex flex-1 flex-col justify-center px-5 py-3">
                <span className="text-[11px] font-semibold text-white/70">
                  Lokasi
                </span>
                <input
                  className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
                  placeholder="Cari nama atau daerah..."
                />
              </div>
              <div className="my-3 w-px bg-white/12" />
              <div className="flex flex-1 flex-col justify-center px-5 py-3">
                <span className="text-[11px] font-semibold text-white/70">
                  Jam Operasional
                </span>
                <input
                  className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
                  placeholder="Tambah jam operasional..."
                />
              </div>
              <div className="my-3 w-px bg-white/12" />
              <div className="flex flex-1 flex-col justify-center px-5 py-3">
                <span className="text-[11px] font-semibold text-white/70">
                  Kategori
                </span>
                <input
                  className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
                  placeholder="Hangout, kerja, lainnya..."
                />
              </div>
              <button
                className="self-center m-2 cursor-pointer rounded-full flex w-[52px] aspect-square items-center justify-center bg-[var(--color-primary)]"
                aria-label="Cari"
                type="button"
              >
                <Search
                  size={18}
                  className="opacity-95 transition duration 150 ease-in group-hover:scale-130"
                />
                {/* <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-95 transition group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="rgba(0,0,0,0.75)"
                    strokeWidth="2"
                  />
                  <path
                    d="M16.5 16.5 21 21"
                    stroke="rgba(0,0,0,0.75)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg> */}
              </button>
            </div>
          </div>
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
    </div>
  );
}
