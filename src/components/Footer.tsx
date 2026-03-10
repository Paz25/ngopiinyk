import { koulen } from "@/utils/fonts";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col gap-[60px] px-6 md:px-12 z-50 border-t border-[var(--color-primary)] bg-[var(--color-background)] shadow-sm pt-[40px] pb-[20px]">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-12">
        <div className="md:col-span-4">
          <span className={`${koulen.className} text-2xl`}>Ngopiin.yk</span>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-2">
          <div>
            <span className="block font-semibold mb-[20px] text-sm md:text-base">
              Eksplor
            </span>
            <div className="flex flex-col gap-3 text-xs md:text-sm">
              <span className="cursor-pointer hover:underline">
                Kafe untuk WFC
              </span>
              <span className="cursor-pointer hover:underline">
                Kafe untuk Nongkrong
              </span>
              <span className="cursor-pointer hover:underline">
                Kafe Dekat Wisata
              </span>
              <span className="cursor-pointer hover:underline">
                Kafe 24 Jam
              </span>
            </div>
          </div>
          <div>
            <span className="block font-semibold mb-[20px] text-sm md:text-base">
              Seputar Platform
            </span>
            <div className="flex flex-col gap-3 text-xs md:text-sm">
              <span className="cursor-pointer hover:underline">
                Tentang Kami
              </span>
              <span className="cursor-pointer hover:underline">
                Panduan Penggunaan
              </span>
              <span className="cursor-pointer hover:underline">
                Cara Kerja Review
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-[10px] md:text-xs md:text-sm">
          © 2026 Pasha Rakha. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
