"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Star,
  Bookmark,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { FacilityIconMap } from "@/models/IconMap";
import { CafeDetailModel } from "@/models/CafeModel";
import NotFound from "@/app/not-found";
import CafeMap from "./CafeMap";
import CafeImageGrid from "./CafeImageGrid";

const CATEGORY_COLORS = ["#84aa04", "#7F77DD", "#D85A30", "#378ADD"];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-white/70">{children}</p>;
}

export default function CafeDetailClient({ id }: { id: string }) {
  const [cafe, setCafe] = useState<CafeDetailModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCafe = async () => {
      try {
        const res = await fetch(`/api/cafes/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCafe(data);
        window.scrollTo({ top: 0, behavior: "instant" });
      } catch (error) {
        console.error("[CafeDetailPage] Failed to fetch cafe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafe();
  }, [id]);

  if (loading) return <CafeDetailSkeleton />;
  if (!cafe) return <NotFound />;

  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-4 pb-16 gap-10">
      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <div id="detail-banner" className="flex flex-col gap-6 py-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-3">
          <h1 className="text-xl font-semibold text-white">{cafe.name}</h1>
          <div className="flex justify-between items-end gap-6 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-sm text-white">
              <Star
                size={16}
                className="text-yellow-400 shrink-0"
                fill="currentColor"
              />
              <span>{cafe.rating}</span>
              <span className="text-white/70">
                ({cafe.review_count} ulasan)
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Heart
                size={22}
                className="hover:text-white transition-colors cursor-pointer"
              />
              <Bookmark
                size={22}
                className="hover:text-white transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Image grid */}
        <CafeImageGrid images={cafe.images} cafeName={cafe.name} />

        {/* Category bars + address */}
        <div className="flex flex-col-reverse md:flex-row w-full md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {cafe.categories.map((cat, i) => (
              <div key={cat.id} className="flex flex-col gap-2 min-w-[150px]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">
                    {cat.name}
                  </span>
                  <span className="text-xs text-white/70">
                    {cat.percentage}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      background: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/70">
            <MapPin size={14} className="shrink-0" />
            <p className="text-sm truncate max-w-xs md:max-w-sm">
              {cafe.address}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-justify leading-relaxed text-white/70">
          {cafe.description}
        </p>
      </div>

      <div className="border-b border-white/10" />

      {/* ── Info grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-4">
        {/* Left col: hours + facilities */}
        <div className="md:col-span-6 flex flex-col gap-8">
          {cafe.opening_hours ? (
            <OperationalHours opening_hours={cafe.opening_hours} />
          ) : (
            <div className="flex flex-col gap-3">
              <SectionHeading>Jam Operasional</SectionHeading>
              <EmptyState>Belum ada data jam operasional.</EmptyState>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <SectionHeading>Fasilitas yang Tersedia</SectionHeading>
            {cafe.facilities.length > 0 ? (
              (() => {
                const capped = cafe.facilities.slice(0, 8);
                const left = capped.slice(0, 4);
                const right = capped.slice(4);
                const FacilityItem = ({
                  facility,
                }: {
                  facility: (typeof capped)[0];
                }) => {
                  const Icon = FacilityIconMap[facility.icon];
                  return (
                    <div className="flex gap-3 items-center text-white/70">
                      <Icon size={22} className="shrink-0" />
                      <p className="text-sm md:text-base">{facility.name}</p>
                    </div>
                  );
                };
                return (
                  <div
                    className={`md:pl-2 flex flex-col md:flex-row gap-4 md:gap-x-8`}
                  >
                    {/* Kolom kiri: selalu ada */}
                    <div className="flex flex-col gap-4 flex-1">
                      {left.map((f) => (
                        <FacilityItem key={f.id} facility={f} />
                      ))}
                    </div>
                    {/* Kolom kanan: hanya render jika ada item ke-5 */}
                    {right.length > 0 && (
                      <div className="flex flex-col gap-4 flex-1">
                        {right.map((f) => (
                          <FacilityItem key={f.id} facility={f} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <EmptyState>Belum ada data fasilitas.</EmptyState>
            )}
          </div>
        </div>

        {/* Right col: menu */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <SectionHeading>Rekomendasi Menu</SectionHeading>
          {cafe.menus.length > 0 ? (
            <div className="grid grid-cols-12 gap-3">
              {cafe.menus.map((item) => (
                <MenuItemCard
                  key={item.id}
                  name={item.name}
                  price={`IDR ${item.price.toLocaleString("id-ID")}`}
                  image={item.image_path}
                  className="col-span-6 md:col-span-4"
                />
              ))}
            </div>
          ) : (
            <EmptyState>Belum ada data menu.</EmptyState>
          )}
        </div>
      </div>

      <div className="border-b border-white/10" />

      {/* ── Map ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 py-4">
        <SectionHeading>Petunjuk Lokasi</SectionHeading>
        <div className="w-full h-[500px] rounded-2xl overflow-hidden">
          <CafeMap
            name={cafe.name}
            latitude={cafe.latitude}
            longitude={cafe.longitude}
            gmaps_link={cafe.gmaps_link}
          />
        </div>
      </div>
    </main>
  );
}

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function OperationalHours({
  opening_hours,
}: {
  opening_hours: Record<
    string,
    { open: string; close: string; is_24h: boolean; is_closed: boolean }
  >;
}) {
  const [open, setOpen] = useState(false);

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const isCurrentlyOpen = (() => {
    const todayHours = opening_hours[currentDay];
    if (!todayHours || todayHours.is_closed) {
      const prevDay = (currentDay + 6) % 7;
      const prevHours = opening_hours[prevDay];
      if (!prevHours || prevHours.is_closed) return false;
      if (prevHours.is_24h) return true;
      const prevClose = toMinutes(prevHours.close);
      const prevOpen = toMinutes(prevHours.open);
      return prevClose < prevOpen && currentTime < prevClose;
    }
    if (todayHours.is_24h) return true;
    const openMin = toMinutes(todayHours.open);
    const closeMin = toMinutes(todayHours.close);
    return closeMin > openMin
      ? currentTime >= openMin && currentTime < closeMin
      : currentTime >= openMin;
  })();

  const statusInfo = (() => {
    const todayHours = opening_hours[currentDay];
    if (todayHours?.is_24h) return "Buka 24 jam";

    if (!isCurrentlyOpen) {
      for (let i = 1; i <= 7; i++) {
        const nextDay = (currentDay + i) % 7;
        const nextHours = opening_hours[nextDay];
        if (nextHours && !nextHours.is_closed) {
          const timeLabel = nextHours.is_24h ? "00:00" : nextHours.open;
          return i === 1
            ? `Buka besok pukul ${timeLabel}`
            : `Buka ${DAY_NAMES[nextDay]} pukul ${timeLabel}`;
        }
      }
      return null;
    }

    const todayOpen = toMinutes(todayHours?.open ?? "00:00");
    const todayClose = toMinutes(todayHours?.close ?? "00:00");
    if (todayClose < todayOpen)
      return `Tutup pukul ${todayHours.close} (dini hari)`;

    const prevDay = (currentDay + 6) % 7;
    const prevHours = opening_hours[prevDay];
    if (prevHours && !prevHours.is_closed) {
      const prevOpen = toMinutes(prevHours.open);
      const prevClose = toMinutes(prevHours.close);
      if (prevClose < prevOpen && currentTime < prevClose) {
        return `Tutup pukul ${prevHours.close} (dini hari)`;
      }
    }
    return `Tutup pukul ${todayHours?.close}`;
  })();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Jam Operasional</SectionHeading>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 items-center text-white/70 hover:text-white transition-colors cursor-pointer w-fit"
      >
        <Clock size={20} className="shrink-0" />
        <p className="text-sm md:text-base">
          <span
            className={`font-semibold ${isCurrentlyOpen ? "text-primary" : "text-red-400"}`}
          >
            {isCurrentlyOpen ? "Buka" : "Tutup"}
          </span>
          {statusInfo && <span className="text-white/70"> · {statusInfo}</span>}
        </p>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={[
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1">
          {Object.entries(opening_hours).map(([dayIndex, hours]) => {
            const dayNum = Number(dayIndex);
            const isToday = dayNum === currentDay;
            return (
              <div
                key={dayIndex}
                className={[
                  "flex justify-between items-center px-3 py-2 rounded-lg text-sm",
                  isToday
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70",
                ].join(" ")}
              >
                <span>{DAY_NAMES[dayNum]}</span>
                <span>
                  {hours.is_closed
                    ? "Tutup"
                    : hours.is_24h
                      ? "24 Jam"
                      : `${hours.open} – ${hours.close}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MenuItemCard({
  name,
  price,
  image,
  specialty,
  className,
}: {
  name: string;
  price: string;
  image?: string;
  specialty?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <div className="relative w-full overflow-hidden rounded-xl bg-white/5 aspect-square">
        {specialty && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-bold px-2 py-0.5 rounded-full shadow">
              Specialty
            </div>
          </>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-white/10" />
        )}
      </div>
      <div className="flex flex-col  px-2 gap-1.5">
        <h3 className="text-sm md:text-base font-semibold text-white leading-snug line-clamp-2">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-white/70">{price}</p>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CafeDetailSkeleton() {
  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-4 pb-16 gap-10">
      <div className="flex flex-col gap-6 py-4">
        {/* Title row */}
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-3">
          <div className="h-7 w-48 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-36 rounded-lg bg-white/10 animate-pulse" />
        </div>

        {/* Image grid — matches CafeImageGrid breakpoints */}
        <div className="hidden lg:grid grid-cols-12 gap-4 h-[440px]">
          <div className="col-span-4 row-span-2 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-4 row-span-2 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-4 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-2 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-2 rounded-2xl bg-white/10 animate-pulse" />
        </div>
        <div className="hidden sm:grid lg:hidden grid-cols-12 gap-3 h-[260px]">
          <div className="col-span-6 row-span-2 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-6 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-3 rounded-2xl bg-white/10 animate-pulse" />
          <div className="col-span-3 rounded-2xl bg-white/10 animate-pulse" />
        </div>
        <div className="block sm:hidden rounded-2xl bg-white/10 animate-pulse h-[280px]" />

        {/* Category bars */}
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2 min-w-[150px]">
              <div className="flex justify-between">
                <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-8 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="h-1.5 rounded-full bg-white/10 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
