"use client"

import { MapPin, Navigation, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchBarProps = {
  position?: string;
}

type LocationSuggestion = {
  id: string;
  name: string;
  district: string;
  regency?: string;
  province: string;
  fullAddress: string;
  type: "popular" | "api";
}

export default function SearchBar({ position }: SearchBarProps) {
  const [location, setLocation] = useState("")
  const [operationalHours, setOperationalHours] = useState("");
  const [category, setCategory] = useState("");

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [items, setItems] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        setLoading(true);

        const url = `/api/location-suggestion?q=${encodeURIComponent(location)}`;
        const res = await fetch(url, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data lokasi");
        }

        const data = await res.json();
        setItems(data.data ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      if (isLocationOpen) {
        fetchSuggestions();
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [location, isLocationOpen]);

  const handleSelectLocation = (item: LocationSuggestion) => {
    setLocation(item.name);
    setSelectedLocation(item)
    setIsLocationOpen(false);
  };

  return (
    <div className={["w-full max-w-4xl", position ?? ""].join(" ")}>
      <div ref={wrapperRef} className="relative z-[100]">
        <div className="flex items-stretch rounded-full bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur">
          <div className="flex md:hidden flex-1 items-center px-5 py-3">
            <span className="text-sm text-white/45">
              {selectedLocation?.name || "Cari kafe yang kamu mau..."}
            </span>
          </div>

          <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3 transition-colors duration-200 hover:bg-white/10 rounded-full cursor-pointer">
            <span className="text-[11px] font-semibold text-white/70">
              Lokasi
            </span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setIsLocationOpen(true)}
              className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
              placeholder="Cari nama atau daerah..."
            />
          </div>

          <div className="hidden md:block my-3 w-px bg-white/12" />

          <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3 transition-colors duration-200 hover:bg-white/10 rounded-full cursor-pointer">
            <span className="text-[11px] font-semibold text-white/70">
              Jam Operasional
            </span>
            <input
              value={operationalHours}
              onChange={(e) => setOperationalHours(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
              placeholder="Tambah jam operasional..."
            />
          </div>

          <div className="hidden md:block my-3 w-px bg-white/12" />

          <div className="hidden md:flex flex-1 flex-col justify-center px-5 py-3 transition-colors duration-200 hover:bg-white/10 rounded-full cursor-pointer">
            <span className="text-[11px] font-semibold text-white/70">
              Kategori
            </span>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

        {isLocationOpen && (
          <div className="absolute left-0 top-[calc(100%+12px)] z-[200] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <div className="max-h-[420px] overflow-y-auto p-3">
              <div className="px-3 pb-2 pt-1 text-sm font-semibold text-neutral-700">
                Saran lokasi di Yogyakarta
              </div>

              {loading ? (
                <div className="px-3 py-6 text-sm text-neutral-500">
                  Mencari lokasi...
                </div>
              ) : items.length > 0 ? (
                items.map((item, index) => {
                  const isNearby = index === 0 && location.trim() === "";
                  const Icon = isNearby ? Navigation : MapPin;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectLocation(item)}
                      className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-neutral-100"
                    >
                      <div
                        className={[
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                          isNearby
                            ? "bg-sky-50 text-sky-600"
                            : "bg-neutral-100 text-neutral-700",
                        ].join(" ")}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-[15px] font-semibold text-neutral-900">
                          {item.name}
                        </div>
                        <div className="truncate text-sm text-neutral-500">
                          {item.fullAddress}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-sm text-neutral-500">
                  Tidak ada lokasi yang cocok di area Yogyakarta.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
