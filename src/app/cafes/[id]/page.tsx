import {
  Heart,
  Star,
  Bookmark,
  MapPin,
  Clock,
  ChevronDown,
  HouseWifi,
  PlugZap,
  PlugZap2,
  Laptop,
} from "lucide-react";

export default function CafeDetailPage() {
  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-2 pb-30 gap-[12px]">
      <div
        id="detail-banner"
        className="relative w-full flex flex-col py-[20px] gap-[20px]"
      >
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-1">
          <h1 className="text-balance text-white text-xl font-semibold">
            Homi Coffee And Space
          </h1>
          <div className="flex justify-between items-center gap-3 md:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-1 text-sm text-white">
              <Star size={20} className="text-yellow-400" fill="currentColor" />
              4.8 (6.891 rating)
            </div>
            <div className="flex items-center gap-2">
              <Heart size={28} className="md:size-8" />
              <Bookmark size={28} className="md:size-8" />
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-12 grid-rows-2 gap-[16px] md:gap-[20px]">
          <div className="col-span-12 sm:col-span-6 md:col-span-4 row-span-2 bg-white rounded-2xl min-h-[300px]"></div>
          <div className="col-span-6 md:col-span-4 row-span-1 md:row-span-2 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block"></div>
          <div className="col-span-3 md:col-span-4 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block"></div>
          <div className="col-span-3 md:col-span-2 bg-white rounded-2xl min-h-[120px] md:min-h-[200px] hidden sm:block"></div>
          <div className="col-span-2 bg-white rounded-2xl min-h-[200px] hidden md:block"></div>
        </div>

        <div className="mt-2 flex flex-wrap-reverse md:flex-row w-full md:justify-between md:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-primary text-xs font-semibold px-3 py-2 rounded-full text-[var(--color-background)] w-fit">
              WFC (70%)
            </div>
            <div className="border-2 border-primary text-xs font-semibold px-3 py-2 rounded-full text-primary w-fit">
              Hangout (30%)
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0" />
            <p className="text-sm md:text-end">
              Jl. Kenari No.7, Demangan Baru, Caturtunggal
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base text-justify leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          feugiat ipsum, in dapibus turpis. Maecenas et ornare massa. Morbi
          dapibus sapien at leo facilisis condimentum. Suspendisse sollicitudin
          libero et dolor volutpat, et tincidunt est consequat.
        </p>
      </div>

      <div className="border-b border-gray-300/70"></div>

      {/* Jam Operasional */}
      <div className="grid grid-cols-1 md:grid-cols-12 py-[20px]">
        <div className="md:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-white">
              Jam Operasional
            </h2>
            <div className="flex gap-2 items-center">
              <Clock size={24} />
              <p className="text-sm">
                <span className="text-primary">Buka</span> · Tutup pukul 23.59
              </p>
              <ChevronDown size={24} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">
              Fasilitas yang Tersedia
            </h2>
            <div className="flex gap-2 items-center">
              <HouseWifi size={24} />
              <p className="text-sm">Wi-Fi</p>
            </div>
            <div className="flex gap-2 items-center">
              <PlugZap size={24} />
              <p className="text-sm">Power outlet</p>
            </div>
            <div className="flex gap-2 items-center">
              <Laptop size={24} />
              <p className="text-sm">Working space</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 flex flex-col gap-4"></div>
      </div>
    </main>
  );
}
