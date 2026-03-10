import { Search } from "lucide-react";

export default function SearchBar({ position }: { position?: string }) {
  return (
    <div className={["w-full max-w-4xl", position].join(" ")}>
      <div className="flex items-stretch overflow-hidden rounded-full bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur">
        <div className="flex md:hidden flex-1 items-center px-5 py-3">
          <span className="text-sm text-white/45">
            Cari kafe yang kamu mau...
          </span>
        </div>

        <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3">
          <span className="text-[11px] font-semibold text-white/70">
            Lokasi
          </span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
            placeholder="Cari nama atau daerah..."
          />
        </div>
        <div className="hidden md:block my-3 w-px bg-white/12" />
        <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3">
          <span className="text-[11px] font-semibold text-white/70">
            Jam Operasional
          </span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
            placeholder="Tambah jam operasional..."
          />
        </div>
        <div className="hidden md:block my-3 w-px bg-white/12" />
        <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3">
          <span className="text-[11px] font-semibold text-white/70">
            Kategori
          </span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
            placeholder="Hangout, kerja, lainnya..."
          />
        </div>

        <button
          className="self-center m-2 cursor-pointer rounded-full flex w-[48px] aspect-square items-center justify-center bg-[var(--color-primary)]"
          aria-label="Cari"
          type="button"
        >
          <Search className="opacity-95 transition duration-150 ease-in group-hover:scale-130" />
        </button>
      </div>
    </div>
  );
}
