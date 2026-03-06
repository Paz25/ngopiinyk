import { koulen } from "@/utils/fonts";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col gap-[60px] px-12 z-50 border-t-1 border-[var(--color-primary)] bg-[var(--color-background)] shadow-sm pt-[40px] pb-[20px]">
      <div className="grid grid-cols-12 ">
        <div className="col-span-4">
          <span className={`${koulen.className} text-2xl`}>Ngopiin.yk</span>
        </div>
        <div className="col-span-4">
          <span className="block font-semibold mb-[20px] text-sm">Eksplor</span>
          <div className="flex flex-col gap-[16px] text-xs">
            <span className="cursor-pointer hover:underline">
              Kafe untuk WFC
            </span>
            <span className="cursor-pointer hover:underline">
              Kafe untuk Nongkrong
            </span>
            <span className="cursor-pointer hover:underline">
              Kafe Dekat Wisata
            </span>
            <span className="cursor-pointer hover:underline">Kafe 24 Jam</span>
          </div>
        </div>
        <div className="col-span-4">
          <span className="block font-semibold mb-[20px] text-sm">
            Seputar Platform
          </span>
          <div className="flex flex-col gap-[16px] text-xs">
            <span className="cursor-pointer hover:underline">Tentang Kami</span>
            <span className="cursor-pointer hover:underline">
              Panduan Penggunaan
            </span>
            <span className="cursor-pointer hover:underline">
              Cara Kerja Review
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <span className="text-xs">Kebijakan Privasi</span> */}
        <span className="text-xs">© 2026 Pasha Rakha</span>
      </div>
    </footer>
  );
}
