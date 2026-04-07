import { koulen } from "@/utils/fonts";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-[90lvh] w-full items-center justify-center px-6 py-16 gap-10 bg-[var(--color-background)]">
      <h1 className={`${koulen.className} text-7xl`}>404</h1>
      {/* ── Ilustrasi kopi tumpah ─────────────────────────────────────────── */}
      {/* <div className="w-full max-w-sm">
        <SpilledCoffeeIllustration />
      </div> */}

      {/* ── Teks ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 text-center max-w-md">
        {/* <h1 className="text-2xl font-semibold text-white">
          Aduh, kopinya tumpah!
        </h1> */}
        <p className="text-md text-white/70 leading-relaxed">
          Halaman yang kamu cari tidak ditemukan atau sedang dalam perbaikan.
        </p>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold hover:brightness-110 transition-all duration-200"
        >
          Kembali ke beranda
        </Link>
        <Link
          href="/explore"
          className="px-5 py-2.5 rounded-full border border-white/10 text-white/70 text-sm hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          Jelajahi kafe
        </Link>
      </div>
    </main>
  );
}

// ─── Spilled Coffee Illustration ─────────────────────────────────────────────

function SpilledCoffeeIllustration() {
  return (
    <>
      <style>{`
        @keyframes tilt {
          0%, 100% { transform: rotate(-28deg) translateX(0px); }
          40%       { transform: rotate(-32deg) translateX(-3px); }
          70%       { transform: rotate(-25deg) translateX(2px); }
        }
        @keyframes spread {
          from { rx: 60; ry: 18; opacity: 0.55; }
          to   { rx: 82; ry: 26; opacity: 0.35; }
        }
        @keyframes spread2 {
          from { rx: 38; ry: 11; opacity: 0.4; }
          to   { rx: 54; ry: 17; opacity: 0.2; }
        }
        @keyframes drip {
          0%   { transform: translateY(0);   opacity: 0.9; }
          80%  { transform: translateY(28px); opacity: 0.6; }
          100% { transform: translateY(32px); opacity: 0; }
        }
        @keyframes drip2 {
          0%   { transform: translateY(0);   opacity: 0.8; }
          80%  { transform: translateY(22px); opacity: 0.5; }
          100% { transform: translateY(26px); opacity: 0; }
        }
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .cup-group {
          animation: tilt 3.6s ease-in-out infinite;
          transform-origin: 160px 210px;
        }
        .puddle-outer {
          animation: spread 3s ease-out infinite alternate;
        }
        .puddle-inner {
          animation: spread2 3s ease-out 0.3s infinite alternate;
        }
        .drip-a {
          animation: drip 2.2s ease-in infinite;
          transform-origin: center top;
        }
        .drip-b {
          animation: drip2 2.2s ease-in 0.7s infinite;
          transform-origin: center top;
        }
        .text-404 {
          animation: fadeUp 0.8s ease-out 0.2s both;
        }
        .text-label {
          animation: fadeUp 0.8s ease-out 0.5s both;
        }
      `}</style>

      <svg
        viewBox="0 0 320 340"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Ilustrasi cangkir kopi tumpah"
      >
        {/* ── Puddle / genangan ── */}
        <ellipse
          className="puddle-outer"
          cx="148"
          cy="268"
          rx="72"
          ry="22"
          fill="#c87941"
          opacity="0.55"
        />
        <ellipse
          className="puddle-inner"
          cx="148"
          cy="268"
          rx="44"
          ry="13"
          fill="#a85e2a"
          opacity="0.5"
        />
        {/* highlight genangan */}
        <ellipse
          cx="134"
          cy="262"
          rx="16"
          ry="5"
          fill="#e09050"
          opacity="0.35"
        />

        {/* ── Aliran kopi jatuh dari cangkir ── */}
        <g className="drip-a">
          <path
            d="M172 218 Q168 232 164 248 Q162 255 158 260"
            stroke="#c87941"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </g>
        <g className="drip-b">
          <path
            d="M178 222 Q175 234 172 244 Q170 250 167 256"
            stroke="#a85e2a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
        </g>

        {/* ── Cangkir miring ── */}
        <g className="cup-group">
          {/* Piring / saucer */}
          <ellipse cx="160" cy="224" rx="52" ry="10" fill="#2a3a10" />
          <ellipse cx="160" cy="222" rx="46" ry="8" fill="#334d14" />

          {/* Badan cangkir */}
          <path
            d="M122 190 Q118 224 130 226 L190 226 Q202 224 198 190 Z"
            fill="#1e3a0a"
          />
          <path
            d="M122 190 Q118 224 130 226 L190 226 Q202 224 198 190 Z"
            fill="none"
            stroke="#84aa04"
            strokeWidth="1.5"
          />

          {/* Rim / bibir cangkir */}
          <ellipse cx="160" cy="190" rx="38" ry="9" fill="#2a4a10" />
          <ellipse cx="160" cy="188" rx="36" ry="8" fill="#335510" />

          {/* Kopi di dalam (hampir kosong karena tumpah) */}
          <ellipse
            cx="160"
            cy="194"
            rx="28"
            ry="6"
            fill="#8b4a1a"
            opacity="0.9"
          />
          {/* highlight kopi dalam cangkir */}
          <ellipse
            cx="154"
            cy="192"
            rx="10"
            ry="3"
            fill="#c87941"
            opacity="0.5"
          />

          {/* Handle */}
          <path
            d="M198 198 Q222 198 222 210 Q222 222 198 220"
            stroke="#1a3508"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M198 198 Q218 198 218 210 Q218 222 198 220"
            stroke="#84aa04"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ── Percikan kecil di genangan ── */}
        {[
          [108, 272, 3.5, 0.5],
          [192, 275, 2.5, 0.4],
          [118, 280, 2, 0.35],
          [178, 264, 3, 0.45],
          [100, 265, 2, 0.3],
          [200, 268, 2.5, 0.35],
        ].map(([cx, cy, r, op], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#c87941" opacity={op} />
        ))}

        {/* ── 404 teks ── */}
        <text
          className="text-404"
          x="160"
          y="72"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="68"
          fontWeight="700"
          letterSpacing="-2"
          fill="#84aa04"
          opacity="0.9"
        >
          404
        </text>

        {/* garis bawah tipis di bawah 404 */}
        <line
          x1="110"
          y1="82"
          x2="210"
          y2="82"
          stroke="#84aa04"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    </>
  );
}
