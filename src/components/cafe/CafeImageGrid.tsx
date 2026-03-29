// src/components/cafe/CafeImageGrid.tsx
import { CafeImageModel } from "@/models/CafeModel";

interface CafeImageGridProps {
  images: CafeImageModel[];
  cafeName: string;
}

function ImgCell({
  image,
  cafeName,
  priority = false,
}: {
  image: CafeImageModel | undefined;
  cafeName: string;
  priority?: boolean;
}) {
  return image ? (
    <img
      src={image.image_path}
      alt={image.caption ?? cafeName}
      className="w-full h-full object-cover object-center"
      fetchPriority={priority ? "high" : "auto"}
    />
  ) : (
    <div className="w-full h-full bg-white/10" />
  );
}

// Overlay "Lihat semua" — teks mengikuti caption style (text-xs, text-white)
function ViewAllOverlay() {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <p className="text-white text-xs font-semibold text-center leading-snug">
        Lihat
        <br />
        semua
      </p>
    </div>
  );
}

export default function CafeImageGrid({
  images,
  cafeName,
}: CafeImageGridProps) {
  return (
    <>
      {/* ── MOBILE (< sm): hanya gambar 1 ── */}
      <div className="block sm:hidden rounded-2xl overflow-hidden bg-white/10 h-[280px]">
        <ImgCell image={images[0]} cafeName={cafeName} priority />
      </div>

      {/* ── TABLET (sm–lg): gambar 1–4, overlay di gambar 4 ── */}
      <div
        className="hidden sm:grid lg:hidden grid-cols-12 gap-3"
        style={{ gridTemplateRows: "200px 200px" }}
      >
        <div className="col-span-6 row-span-2 rounded-2xl overflow-hidden bg-white/10">
          <ImgCell image={images[0]} cafeName={cafeName} priority />
        </div>
        <div className="col-span-6 rounded-2xl overflow-hidden bg-white/10">
          <ImgCell image={images[1]} cafeName={cafeName} />
        </div>
        <div className="col-span-3 rounded-2xl overflow-hidden bg-white/10">
          <ImgCell image={images[2]} cafeName={cafeName} />
        </div>
        <div className="col-span-3 rounded-2xl overflow-hidden bg-white/10 relative">
          <ImgCell image={images[3]} cafeName={cafeName} />
          <ViewAllOverlay />
        </div>
      </div>

      {/* ── DESKTOP (≥ lg): gambar 1–5, overlay di gambar 5 ── */}
      <div
        className="hidden lg:grid grid-cols-12 gap-4"
        style={{ gridTemplateRows: "220px 220px" }}
      >
        <div className="col-span-4 row-span-2 rounded-2xl overflow-hidden bg-white/10 h-full">
          <ImgCell image={images[0]} cafeName={cafeName} priority />
        </div>
        <div className="col-span-4 row-span-2 rounded-2xl overflow-hidden bg-white/10 h-full">
          <ImgCell image={images[1]} cafeName={cafeName} />
        </div>
        <div className="col-span-4 rounded-2xl overflow-hidden bg-white/10 h-full">
          <ImgCell image={images[2]} cafeName={cafeName} />
        </div>
        <div className="col-span-2 rounded-2xl overflow-hidden bg-white/10">
          <ImgCell image={images[3]} cafeName={cafeName} />
        </div>
        <div className="col-span-2 rounded-2xl overflow-hidden bg-white/10 relative">
          <ImgCell image={images[4]} cafeName={cafeName} />
          <ViewAllOverlay />
        </div>
      </div>
    </>
  );
}
