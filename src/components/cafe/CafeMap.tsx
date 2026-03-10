"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

const markerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
        <div style="width: 50%; aspect-ratio: 1/1; border-radius: 50%; background: white;"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

interface CafeMapProps {
  name: string;
  latitude: number;
  longitude: number;
  gmaps_link: string;
}

// export default function CafeMap({
//   name,
//   latitude,
//   longitude,
//   gmaps_link,
// }: CafeMapProps) {
//   return (
//     <MapContainer
//       center={[latitude, longitude]}
//       zoom={17}
//       scrollWheelZoom={false}
//       className="w-full h-full rounded-2xl z-0"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
//         url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//       />
//       <Marker
//         position={[latitude, longitude]}
//         icon={markerIcon}
//         eventHandlers={{
//           click: () => window.open(gmaps_link, "_blank"),
//         }}
//       >
//         <Popup>{name}</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

export default function CafeMap({
  name,
  latitude,
  longitude,
  gmaps_link,
}: CafeMapProps) {
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
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
