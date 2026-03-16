"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Coffee } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement auth
  };

  return (
    <div className="flex min-h-screen w-full bg-[var(--color-background)]">
      {/* ── Kolom kiri: ilustrasi editorial ──────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <IllustrationPanel />
      </div>

      {/* ── Kolom kanan: form login ───────────────────────────────────────── */}
      <div className="flex flex-col w-full lg:w-1/2 min-h-screen items-center justify-center px-8 sm:px-16 py-12">
        {/* Logo mobile — hanya muncul di bawah lg */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <Coffee size={22} className="text-[var(--color-primary)]" />
          <span className="text-white font-semibold text-lg tracking-wide">
            Ngopiinyk
          </span>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-8">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-white">
              Selamat datang kembali
            </h1>
            <p className="text-sm text-white/70">
              Masuk untuk menemukan kafe terbaikmu hari ini.
            </p>
          </div>

          {/* Google login */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <GoogleIcon />
            Masuk dengan Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs text-white/40 shrink-0">
              atau dengan email
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-white/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="kamu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm text-white/70">
                  Kata sandi
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[var(--color-primary)] hover:brightness-110 transition-all"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              Masuk
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-white/70">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[var(--color-primary)] font-medium hover:brightness-110 transition-all"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Google Icon ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Illustration Panel ───────────────────────────────────────────────────────

function IllustrationPanel() {
  return (
    <div className="relative w-full h-full bg-[#0e1a0a] overflow-hidden">
      {/* Noise texture overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Deep radial glow — primary color bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "20%",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(132,170,4,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse, rgba(55,138,221,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines — subtle perspective */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        viewBox="0 0 500 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 46}
            y1="0"
            x2={i * 46}
            y2="700"
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 46}
            x2="500"
            y2={i * 46}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Main SVG composition */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Steam path animation */}
          <style>{`
            @keyframes steam1 {
              0%   { transform: translateY(0) scaleX(1); opacity: 0.5; }
              50%  { transform: translateY(-28px) scaleX(1.3); opacity: 0.25; }
              100% { transform: translateY(-52px) scaleX(0.9); opacity: 0; }
            }
            @keyframes steam2 {
              0%   { transform: translateY(0) scaleX(1); opacity: 0.4; }
              50%  { transform: translateY(-22px) scaleX(0.8); opacity: 0.2; }
              100% { transform: translateY(-44px) scaleX(1.2); opacity: 0; }
            }
            @keyframes steam3 {
              0%   { transform: translateY(0) scaleX(1); opacity: 0.45; }
              60%  { transform: translateY(-32px) scaleX(1.1); opacity: 0.2; }
              100% { transform: translateY(-58px) scaleX(0.85); opacity: 0; }
            }
            .s1 { animation: steam1 2.8s ease-in-out infinite; transform-origin: center bottom; }
            .s2 { animation: steam2 3.2s ease-in-out infinite 0.6s; transform-origin: center bottom; }
            .s3 { animation: steam3 2.5s ease-in-out infinite 1.2s; transform-origin: center bottom; }
          `}</style>

          <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3d10" />
            <stop offset="100%" stopColor="#1a2a08" />
          </linearGradient>
          <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e2e2e" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="coffeeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2b1f" />
            <stop offset="100%" stopColor="#2a1a10" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1a0a" />
            <stop offset="60%" stopColor="#121f0d" />
            <stop offset="100%" stopColor="#0a1508" />
          </linearGradient>
          <radialGradient id="lensFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#84aa04" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#84aa04" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky background */}
        <rect width="500" height="700" fill="url(#skyGrad)" />

        {/* Stars */}
        {[
          [60, 40],
          [120, 70],
          [200, 30],
          [290, 55],
          [380, 25],
          [440, 80],
          [480, 45],
          [30, 120],
          [160, 100],
          [320, 90],
          [460, 130],
          [90, 160],
          [250, 145],
          [400, 110],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 3 === 0 ? 1.5 : 1}
            fill="white"
            opacity={0.3 + (i % 4) * 0.12}
          />
        ))}

        {/* Crescent moon */}
        <circle cx="420" cy="80" r="22" fill="#1e2e12" />
        <circle cx="430" cy="74" r="18" fill="#0e1a0a" />

        {/* City skyline silhouette — Jogja inspired */}
        {/* Prambanan-ish spire far right */}
        <g opacity="0.35" fill="#1a2a0e">
          <polygon points="390,320 396,260 402,320" />
          <polygon points="394,290 396,270 398,290" />
          <rect x="388" y="320" width="16" height="60" />
        </g>
        {/* General buildings */}
        <g opacity="0.45" fill="#182610">
          <rect x="0" y="400" width="60" height="300" />
          <rect x="55" y="430" width="40" height="270" />
          <rect x="90" y="380" width="50" height="320" />
          <rect x="135" y="410" width="35" height="290" />
          <rect x="165" y="360" width="55" height="340" />
          <rect x="215" y="390" width="45" height="310" />
          <rect x="255" y="350" width="60" height="350" />
          <rect x="310" y="410" width="40" height="290" />
          <rect x="345" y="380" width="50" height="320" />
          <rect x="390" y="420" width="35" height="280" />
          <rect x="420" y="395" width="45" height="305" />
          <rect x="460" y="440" width="40" height="260" />
        </g>
        {/* Building windows */}
        <g fill="#84aa04" opacity="0.25">
          {[
            [10, 420],
            [10, 440],
            [10, 460],
            [10, 480],
            [10, 500],
            [30, 420],
            [30, 440],
            [30, 460],
            [100, 400],
            [100, 420],
            [100, 440],
            [100, 460],
            [100, 480],
            [120, 400],
            [120, 420],
            [120, 440],
            [175, 375],
            [175, 395],
            [175, 415],
            [175, 435],
            [175, 455],
            [175, 475],
            [195, 375],
            [195, 395],
            [195, 415],
            [195, 435],
            [265, 360],
            [265, 380],
            [265, 400],
            [265, 420],
            [265, 440],
            [265, 460],
            [285, 360],
            [285, 380],
            [285, 400],
            [285, 420],
            [355, 385],
            [355, 405],
            [355, 425],
            [355, 445],
            [375, 385],
            [375, 405],
            [375, 425],
            [430, 400],
            [430, 420],
            [430, 440],
            [430, 460],
            [450, 400],
            [450, 420],
            [450, 440],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="6"
              height="4"
              rx="1"
              opacity={0.4 + (i % 3) * 0.2}
            />
          ))}
        </g>

        {/* Foreground table surface */}
        <ellipse
          cx="250"
          cy="620"
          rx="200"
          ry="30"
          fill="#141f0a"
          opacity="0.9"
        />
        <rect
          x="50"
          y="610"
          width="400"
          height="90"
          fill="#0e1508"
          opacity="0.95"
        />

        {/* Saucer / plate */}
        <ellipse cx="250" cy="598" rx="80" ry="14" fill="url(#plateGrad)" />
        <ellipse cx="250" cy="596" rx="74" ry="11" fill="#252525" />

        {/* Coffee cup body */}
        <path
          d="M196,520 Q194,598 210,598 L290,598 Q306,598 304,520 Z"
          fill="url(#cupGrad)"
        />
        {/* Cup inner — coffee surface */}
        <ellipse cx="250" cy="522" rx="52" ry="10" fill="url(#coffeeGrad)" />
        {/* Latte art swirl */}
        <ellipse
          cx="250"
          cy="522"
          rx="30"
          ry="6"
          fill="#5c3d28"
          opacity="0.6"
        />
        <path
          d="M232,520 Q250,516 268,520"
          stroke="#c8a87a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M238,524 Q250,520 262,524"
          stroke="#c8a87a"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        {/* Cup rim */}
        <ellipse cx="250" cy="520" rx="54" ry="10" fill="#2e4015" />
        {/* Cup handle */}
        <path
          d="M304,540 Q330,540 330,558 Q330,576 304,576"
          stroke="#2a3d10"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M304,540 Q326,540 326,558 Q326,574 304,574"
          stroke="#3a5520"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Steam wisps */}
        <g className="s1">
          <path
            d="M232,510 Q228,498 232,488 Q236,478 232,468"
            stroke="#84aa04"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
        <g className="s2">
          <path
            d="M250,508 Q246,494 250,482 Q254,470 250,458"
            stroke="#84aa04"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
        <g className="s3">
          <path
            d="M268,510 Q272,496 268,484 Q264,472 268,460"
            stroke="#84aa04"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>

        {/* Small accent dots around cup */}
        <circle cx="165" cy="590" r="3" fill="#84aa04" opacity="0.3" />
        <circle cx="340" cy="585" r="2" fill="#84aa04" opacity="0.2" />
        <circle cx="155" cy="575" r="1.5" fill="white" opacity="0.15" />
        <circle cx="350" cy="570" r="1.5" fill="white" opacity="0.15" />
      </svg>

      {/* Text overlay — brand + quote */}
      <div className="absolute inset-0 flex flex-col justify-between p-10 pointer-events-none">
        {/* Brand mark top-left */}
        <div className="flex items-center gap-2">
          <Coffee size={20} className="text-[var(--color-primary)]" />
          <span className="text-white font-semibold text-base tracking-wide">
            Ngopiinyk
          </span>
        </div>

        {/* Quote bottom */}
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold text-white leading-snug max-w-xs">
            Setiap tegukan punya{" "}
            <span className="text-[var(--color-primary)]">ceritanya</span>{" "}
            sendiri.
          </p>
          <p className="text-sm text-white/70 max-w-[260px] leading-relaxed">
            Ribuan kafe di Jogja menunggumu — temukan yang paling pas untuk
            harimu.
          </p>
        </div>
      </div>
    </div>
  );
}
