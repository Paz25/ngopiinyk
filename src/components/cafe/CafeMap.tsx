"use client";

import { MapPin } from "lucide-react";

interface CafeMapProps {
  name: string;
  latitude: number;
  longitude: number;
  gmaps_link: string;
}

export default function CafeMap({
  name,
  latitude,
  longitude,
  gmaps_link,
}: CafeMapProps) {
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Lokasi ${name}`}
      />
      <a
        href={gmaps_link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 flex items-center gap-1.5 bg-white text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-gray-50 transition"
      >
        <MapPin size={13} />
        Buka di Google Maps
      </a>
    </div>
  );
}
