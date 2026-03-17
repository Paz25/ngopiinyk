import { Metadata } from "next";

import SearchBar from "@/components/SearchBar";
import CategoryCardSection from "@/components/explore/CategoryCardSection";

export const metadata: Metadata = {
  title: "Ngopiinyk | Eksplor Kafe yang Cocok Untukmu",
  description: "Temukan kafe terbaik di Yogyakarta",
};

export default function Explore() {
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
      <CategoryCardSection />
    </main>
  );
}
