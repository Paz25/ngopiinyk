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

const menu = [
  {
    name: "Latte",
    price: "IDR 30.000",
    image:
      "https://i.pinimg.com/736x/4a/1c/4a/4a1c4a9755e4d3bdfcb45a1c3a58712f.jpg",
  },
  {
    name: "Cappuccino",
    price: "IDR 28.000",
    image:
      "https://i.pinimg.com/736x/45/38/10/453810958154922d419b4afb3ffda0c5.jpg",
  },
  {
    name: "Tahu Cabe Garam",
    price: "IDR 15.000",
    image:
      "https://i.pinimg.com/736x/67/15/ec/6715ecd7877ab4581240839cd1ba3b2f.jpg",
  },
];

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
      } catch (error) {
        console.error("[CafeDetailPage] Failed to fetch cafe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafe();
  }, [id]);

  if (!cafe) return <NotFound />;

  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-4 pb-16 gap-6">
      <div id="detail-banner" className="flex flex-col gap-5 py-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-2">
          <h1 className="text-balance text-white text-xl font-semibold">
            {cafe.name}
          </h1>
          <div className="flex justify-between items-end gap-4 md:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-sm text-white">
              <Star size={18} className="text-yellow-400" fill="currentColor" />
              {cafe.rating} ({cafe.review_count} ulasan)
            </div>
            <div className="flex items-center gap-3">
              <Heart size={24} />
              <Bookmark size={24} />
            </div>
          </div>
        </div>

        <CafeImageGrid images={cafe.images} cafeName={cafe.name} />

        <div className="flex flex-wrap-reverse md:flex-row w-full md:justify-between md:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-primary text-sm font-semibold px-3 py-1.5 rounded-full text-[var(--color-background)]">
              WFC (70%)
            </div>
            <div className="border-2 border-primary text-sm font-semibold px-3 py-1.5 rounded-full text-primary">
              Hangout (30%)
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={15} className="shrink-0" />
            <p className="text-sm textellipsis">{cafe.address}</p>
          </div>
        </div>

        <p className="text-sm md:text-base text-justify leading-relaxed text-white/90">
          {cafe.description}
        </p>
      </div>

      <div className="border-b border-white/40" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-4">
        <div className="md:col-span-6 flex flex-col gap-8">
          <OperationalHours opening_hours={cafe.opening_hours} />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">
              Fasilitas yang Tersedia
            </h2>
            {cafe.facilities.length > 0 ? (
              <div className="flex flex-col md:pl-2 gap-6 text-white">
                {cafe.facilities.map((facility) => {
                  const Icon = FacilityIconMap[facility.icon];
                  return (
                    <div
                      key={facility.id}
                      className="flex gap-2.5 items-center"
                    >
                      <Icon size={24} />
                      <p className="text-sm md:text-base">{facility.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-white/50">Belum ada data fasilitas.</p>
            )}
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Rekomendasi Menu</h2>
          <div className="grid grid-cols-12 gap-3">
            {menu.map((item) => (
              <MenuItemCard
                key={item.name}
                name={item.name}
                price={item.price}
                image={item.image}
                className="col-span-6 md:col-span-4"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-white/40" />

      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-lg font-semibold text-white">Petunjuk Lokasi</h2>
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

function OperationalHours({
  opening_hours,
}: {
  opening_hours: Record<
    string,
    { open: string; close: string; is_24h: boolean; is_closed: boolean }
  >;
}) {
  const [open, setOpen] = useState(false);

  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const isCurrentlyOpen = (() => {
    const todayHours = opening_hours[currentDay];
    if (!todayHours || todayHours.is_closed) {
      const prevDay = (currentDay + 6) % 7;
      const prevHours = opening_hours[prevDay];
      if (!prevHours || prevHours.is_closed) return false;
      if (prevHours.is_24h) return true;
      const prevOpen = toMinutes(prevHours.open);
      const prevClose = toMinutes(prevHours.close);
      return prevClose < prevOpen && currentTime < prevClose;
    }
    if (todayHours.is_24h) return true;
    const openMin = toMinutes(todayHours.open);
    const closeMin = toMinutes(todayHours.close);
    if (closeMin > openMin) {
      return currentTime >= openMin && currentTime < closeMin;
    } else {
      return currentTime >= openMin;
    }
  })();

  const statusInfo = (() => {
    const todayHours = opening_hours[currentDay];

    if (todayHours?.is_24h) return "Buka 24 jam";

    if (!isCurrentlyOpen) {
      for (let i = 1; i <= 7; i++) {
        const nextDay = (currentDay + i) % 7;
        const nextHours = opening_hours[nextDay];
        if (nextHours && !nextHours.is_closed) {
          const dayNames = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ];
          if (i === 1) {
            return `Buka besok pukul ${nextHours.is_24h ? "00:00" : nextHours.open}`;
          }
          return `Buka ${dayNames[nextDay]} pukul ${nextHours.is_24h ? "00:00" : nextHours.open}`;
        }
      }
      return null;
    }

    const todayOpen = toMinutes(todayHours?.open ?? "00:00");
    const todayClose = toMinutes(todayHours?.close ?? "00:00");

    if (todayClose < todayOpen) {
      return `Tutup pukul ${todayHours.close} (dini hari)`;
    }

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
      <h2 className="text-lg font-semibold text-white">Jam Operasional</h2>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 items-center text-white cursor-pointer w-fit group"
      >
        <Clock size={24} />
        <p className="text-sm md:text-base">
          <span
            className={`font-semibold ${isCurrentlyOpen ? "text-primary" : "text-red-400"}`}
          >
            {isCurrentlyOpen ? "Buka" : "Tutup"}
          </span>
          {statusInfo && ` · ${statusInfo}`}
        </p>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={[
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1 pt-1">
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
                    : "text-white/60",
                ].join(" ")}
              >
                <span>{dayNames[dayNum]}</span>
                <span>
                  {hours.is_closed
                    ? "Tutup"
                    : hours.is_24h
                      ? "24 Jam"
                      : `${hours.open} - ${hours.close}`}
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
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <div className="relative w-full overflow-hidden rounded-xl bg-white/5 aspect-square">
        {specialty && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-bold px-2 py-1 rounded-full shadow-lg">
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
      <div className="flex flex-col px-1 gap-0.5">
        <h3 className="text-sm md:text-base  font-semibold leading-snug">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-white/60">{price}</p>
      </div>
    </div>
  );
}
