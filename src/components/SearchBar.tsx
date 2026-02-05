import { Search } from "lucide-react";

export default function SearchBar({ position }: { position?: string }) {
  return (
    <div className={["w-full max-w-4xl", position].join(" ")}>
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
  );
}
