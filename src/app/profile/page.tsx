"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  Heart,
  Star,
  Settings,
  Camera,
  MapPin,
  Calendar,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Bell,
  Trash2,
} from "lucide-react";
import FormField from "@/components/form/FormField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CafeCard from "@/components/cards/CafeCard";
import PrimaryButtonOutline from "@/components/buttons/PrimaryButtonOutline";

import { CafeCardModel } from "@/models/CafeModel";
import { UserModel } from "@/models/UserModel";

type Tab = "saved" | "liked" | "posts" | "settings";

type SavedCafe = {
  id: number;
  name: string;
  area: string;
  rating: number | null;
  image: string | null;
};

type UserPost = {
  id: number;
  cafe_name: string;
  cafe_id: number;
  rating: number;
  comment: string;
  created_at: string;
  image: string | null;
};

// ─── Mock data (ganti dengan fetch asli) ─────────────────────────────────────

const MOCK_USER: UserModel = {
  id: "abc-123",
  name: "Arya Wirawan",
  email: "arya@email.com",
  profile_picture_path: null,
  is_active: true,
  email_verified_at: "2024-01-15T10:00:00Z",
  created_at: "2024-01-10T08:00:00Z",
  role: "customer",
};

const MOCK_SAVED: SavedCafe[] = [
  {
    id: 1,
    name: "Klinik Kopi",
    area: "Prawirotaman",
    rating: 4.8,
    image: null,
  },
  { id: 2, name: "Filosofi Kopi", area: "Kota Lama", rating: 4.6, image: null },
  {
    id: 3,
    name: "Kedai Tjikini",
    area: "Gondokusuman",
    rating: 4.5,
    image: null,
  },
];

const MOCK_LIKED: SavedCafe[] = [
  { id: 4, name: "Satu Jiwa", area: "Bantul", rating: 4.7, image: null },
  {
    id: 5,
    name: "Warung Kopi Joss",
    area: "Malioboro",
    rating: 4.3,
    image: null,
  },
];

const MOCK_POSTS: UserPost[] = [
  {
    id: 1,
    cafe_id: 1,
    cafe_name: "Klinik Kopi",
    rating: 5,
    comment:
      "Tempatnya nyaman banget buat kerja, kopinya mantap dan barista-nya ramah. Bakal balik lagi!",
    created_at: "2024-03-10T14:30:00Z",
    image: null,
  },
  {
    id: 2,
    cafe_id: 4,
    cafe_name: "Satu Jiwa",
    rating: 4,
    comment:
      "Viewnya keren, cocok buat foto-foto. Agak jauh dari kota tapi worth it.",
    created_at: "2024-02-22T09:00:00Z",
    image: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const user = MOCK_USER; // ganti dengan useUser() / session

  const tabs: {
    key: Tab;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    {
      key: "saved",
      label: "Tersimpan",
      icon: <Bookmark size={16} />,
      count: MOCK_SAVED.length,
    },
    {
      key: "liked",
      label: "Disukai",
      icon: <Heart size={16} />,
      count: MOCK_LIKED.length,
    },
    {
      key: "posts",
      label: "Postingan",
      icon: <Star size={16} />,
      count: MOCK_POSTS.length,
    },
    { key: "settings", label: "Pengaturan", icon: <Settings size={16} /> },
  ];

  return (
    <main className="flex flex-col min-h-screen w-full px-6 md:px-12 pt-6 pb-16 gap-8">
      {/* ── Profile header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center">
            {user.profile_picture_path ? (
              <Image
                src={user.profile_picture_path}
                alt={user.name}
                fill
                className="object-cover object-center"
              />
            ) : (
              <span className="text-2xl font-semibold text-[var(--color-primary)]">
                {getInitials(user.name)}
              </span>
            )}
          </div>
          {/* Upload photo button */}
          <button
            className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer shadow"
            aria-label="Ganti foto profil"
          >
            <Camera size={13} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-white">{user.name}</h1>
            {user.email_verified_at && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">
                <ShieldCheck size={11} />
                Terverifikasi
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-sm text-white/70">
              <MapPin size={13} className="shrink-0" />
              {user.email}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/70">
              <Calendar size={13} className="shrink-0" />
              Bergabung {formatDate(user.created_at)}
            </span>
          </div>
        </div>

        {/* Stat chips */}
        <div className="flex items-center gap-3 shrink-0">
          {[
            { label: "Tersimpan", value: MOCK_SAVED.length },
            { label: "Disukai", value: MOCK_LIKED.length },
            { label: "Ulasan", value: MOCK_POSTS.length },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 min-w-[60px]"
            >
              <span className="text-base font-semibold text-white">
                {s.value}
              </span>
              <span className="text-xs text-white/70">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-white/10" />

      {/* ── Tab navigation ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer",
              activeTab === tab.key
                ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                : "text-white/70 hover:text-white hover:bg-white/5",
            ].join(" ")}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={[
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeTab === tab.key
                    ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                    : "bg-white/10 text-white/40",
                ].join(" ")}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ─────────────────────────────────────────────────── */}
      <div>
        {activeTab === "saved" && (
          <CafeGrid
            cafes={MOCK_SAVED}
            emptyText="Belum ada kafe yang disimpan."
          />
        )}
        {activeTab === "liked" && (
          <CafeGrid
            cafes={MOCK_LIKED}
            emptyText="Belum ada kafe yang disukai."
          />
        )}
        {activeTab === "posts" && <PostsList posts={MOCK_POSTS} />}
        {activeTab === "settings" && <SettingsPanel user={user} />}
      </div>
    </main>
  );
}

// ─── Cafe Grid (Tersimpan & Disukai) ─────────────────────────────────────────

function CafeGrid({
  cafes,
  emptyText,
}: {
  cafes: SavedCafe[];
  emptyText: string;
}) {
  if (cafes.length === 0) {
    return <p className="text-sm text-white/70">{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {cafes.map((cafe) => (
        <CafeCard
          imageClassName="aspect-square"
          key={cafe.id}
          cafe={cafe as unknown as CafeCardModel}
        />
      ))}
    </div>
  );
}

// ─── Posts List ───────────────────────────────────────────────────────────────

function PostsList({ posts }: { posts: UserPost[] }) {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <p className="text-sm text-white/40">Belum ada ulasan yang dikirimkan.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
        >
          {/* Cafe image placeholder */}
          <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/10">
            {post.image && (
              <img
                src={post.image}
                alt={post.cafe_name}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <button
                onClick={() => router.push(`/cafes/${post.cafe_id}`)}
                className="text-sm font-semibold text-white hover:text-[var(--color-primary)] transition-colors text-left cursor-pointer"
              >
                {post.cafe_name}
              </button>
              {/* Star rating */}
              <div className="flex items-center gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < post.rating ? "text-yellow-400" : "text-white/20"
                    }
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
              {post.comment}
            </p>
            <span className="text-xs text-white/40">
              {formatDate(post.created_at)}
            </span>
          </div>

          {/* Arrow */}
          <button
            onClick={() => router.push(`/cafes/${post.cafe_id}`)}
            className="shrink-0 self-center text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel({ user }: { user: UserModel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PATCH /api/users/me
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST /api/users/me/password
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ── Dua kolom: Data pribadi | Kata sandi ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Kolom kiri: Data pribadi */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-white">Data Pribadi</h2>
            <p className="text-sm text-white/70">
              Perbarui nama dan alamat email kamu.
            </p>
          </div>
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            <FormField
              id="settings-name"
              label="Nama lengkap"
              type="text"
              value={name}
              onChange={setName}
              required
              autoComplete="name"
            />
            <FormField
              id="settings-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />
            {!user.email_verified_at && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                <Bell size={14} className="text-yellow-400 shrink-0" />
                <p className="text-xs text-yellow-400">
                  Email kamu belum terverifikasi.{" "}
                  <button className="underline cursor-pointer hover:no-underline">
                    Kirim ulang verifikasi
                  </button>
                </p>
              </div>
            )}
            <PrimaryButton>Simpan Perubahan</PrimaryButton>
          </form>
        </section>

        {/* Kolom kanan: Kata sandi */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-white">Kata Sandi</h2>
            <p className="text-sm text-white/70">
              Pastikan kata sandi baru minimal 8 karakter.
            </p>
          </div>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <FormField
              id="current-password"
              label="Kata sandi saat ini"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={setCurrentPassword}
              required
              autoComplete="current-password"
            />
            <FormField
              id="new-password"
              label="Kata sandi baru"
              type="password"
              placeholder="Min. 8 karakter"
              value={newPassword}
              onChange={setNewPassword}
              required
              autoComplete="new-password"
            />
            <FormField
              id="confirm-new-password"
              label="Konfirmasi kata sandi baru"
              type="password"
              placeholder="Ulangi kata sandi baru"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              autoComplete="new-password"
            />
            <PrimaryButtonOutline>Ubah Kata Sandi</PrimaryButtonOutline>
          </form>
        </section>
      </div>

      <div className="border-b border-white/10" />

      {/* ── Aksi berbahaya ────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-white">Lainnya</h2>
        <div className="flex flex-col gap-3 max-w-sm">
          <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 text-white/70 group-hover:text-white transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Keluar dari akun</span>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </button>
          <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-red-400/20 hover:bg-red-400/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 text-red-400/70 group-hover:text-red-400 transition-colors">
              <Trash2 size={18} />
              <span className="text-sm">Hapus akun</span>
            </div>
            <ChevronRight size={16} className="text-red-400/40" />
          </button>
        </div>
      </section>
    </div>
  );
}
