"use client";

import { useState } from "react";
import {
  Heart,
  Star,
  Bookmark,
  MapPin,
  Clock,
  ChevronDown,
  HouseWifi,
  PlugZap,
  Laptop,
} from "lucide-react";

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

const operationalHours = [
  { day: "Senin", open: "08.00", close: "23.59", isToday: false },
  { day: "Selasa", open: "08.00", close: "23.59", isToday: false },
  { day: "Rabu", open: "08.00", close: "23.59", isToday: false },
  { day: "Kamis", open: "08.00", close: "23.59", isToday: true },
  { day: "Jumat", open: "08.00", close: "23.59", isToday: false },
  { day: "Sabtu", open: "09.00", close: "23.59", isToday: false },
  { day: "Minggu", open: "09.00", close: "22.00", isToday: false },
];

export default function CafeDetailPage() {
  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-4 pb-24 gap-6">
      {/* Banner */}
      <div id="detail-banner" className="flex flex-col gap-5 py-4">
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-2">
          <h1 className="text-balance text-white text-xl font-semibold">
            Homi Coffee And Space
          </h1>
          <div className="flex justify-between items-center gap-4 md:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-sm text-white">
              <Star size={18} className="text-yellow-400" fill="currentColor" />
              4.8 (6.891 rating)
            </div>
            <div className="flex items-center gap-3">
              <Heart size={24} />
              <Bookmark size={24} />
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-12 grid-rows-2 gap-3 md:gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-4 row-span-2 bg-white rounded-2xl min-h-[300px]" />
          <div className="col-span-6 md:col-span-4 row-span-1 md:row-span-2 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block" />
          <div className="col-span-3 md:col-span-4 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block" />
          <div className="col-span-3 md:col-span-2 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block" />
          <div className="col-span-2 bg-white rounded-2xl min-h-[200px] hidden md:block" />
        </div>

        {/* Tags & Lokasi */}
        <div className="flex flex-wrap-reverse md:flex-row w-full md:justify-between md:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-primary text-xs font-semibold px-3 py-1.5 rounded-full text-[var(--color-background)]">
              WFC (70%)
            </div>
            <div className="border-2 border-primary text-xs font-semibold px-3 py-1.5 rounded-full text-primary">
              Hangout (30%)
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={15} className="shrink-0" />
            <p className="text-sm">
              Jl. Kenari No.7, Demangan Baru, Caturtunggal
            </p>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-sm md:text-base text-justify leading-relaxed text-white/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          feugiat ipsum, in dapibus turpis. Maecenas et ornare massa. Morbi
          dapibus sapien at leo facilisis condimentum. Suspendisse sollicitudin
          libero et dolor volutpat, et tincidunt est consequat.
        </p>
      </div>

      <div className="border-b border-white/40" />

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-4">
        <div className="md:col-span-6 flex flex-col gap-8">
          <OperationalHours />

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-white">
              Fasilitas yang Tersedia
            </h2>
            <div className="flex flex-col gap-4 text-white">
              <div className="flex gap-2.5 items-center">
                <HouseWifi size={18} />
                <p className="text-sm md:text-base ">Wi-Fi</p>
              </div>
              <div className="flex gap-2.5 items-center">
                <PlugZap size={18} />
                <p className="text-sm md:text-base ">Power outlet</p>
              </div>
              <div className="flex gap-2.5 items-center">
                <Laptop size={18} />
                <p className="text-sm md:text-base ">Working space</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col gap-3">
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

      <div className="flex py-4">
        <h2 className="text-lg font-semibold text-white">Petunjuk Lokasi</h2>
      </div>
    </main>
  );
}

function OperationalHours() {
  const [open, setOpen] = useState(false);

  const today = operationalHours.find((h) => h.isToday);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Jam Operasional</h2>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 items-center text-white cursor-pointer w-fit group"
      >
        <Clock size={18} />
        <p className="text-sm md:text-base">
          <span className="text-primary font-semibold">Buka</span>
          {today && ` · Tutup pukul ${today.close}`}
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
          {operationalHours.map((h) => (
            <div
              key={h.day}
              className={[
                "flex justify-between items-center px-3 py-2 rounded-lg text-sm",
                h.isToday
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/60",
              ].join(" ")}
            >
              <span>{h.day}</span>
              <span>
                {h.open} – {h.close}
              </span>
            </div>
          ))}
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
