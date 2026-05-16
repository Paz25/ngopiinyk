"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "@/lib/context/AuthContext";
import PrimaryButtonOutline from "@/components/buttons/PrimaryButtonOutline";
import FormField from "@/components/form/FormField";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function LoginClient() {
  const router = useRouter();
  const { refetch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Email atau kata sandi salah");
        return;
      }

      await refetch();
      router.push("/");
    } catch {
      setError("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[90lvh] w-full bg-[var(--color-background)]">
      <div className="hidden lg:flex flex-col w-full lg:w-1/2 items-center justify-center px-8 sm:px-16 py-12">
        <IllustrationPanel />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 sm:px-16 py-12">
        <div className="w-full max-w-lg flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-white text-center">
              Temukan Kafe Favoritmu di Jogja
            </h1>
            <p className="text-sm text-white/70 text-center">
              Masuk untuk mulai menjelajahi tempat ngopi terbaik di Yogyakarta.
            </p>
          </div>

          <PrimaryButtonOutline onclick={() => {}}>
            <div className="flex items-center justify-center gap-4">
              <FcGoogle size={20} />
              Masuk dengan Google
            </div>
          </PrimaryButtonOutline>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs text-white/40 shrink-0">
              atau dengan email
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="kamu@email.com"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />

            <FormField
              id="password"
              label="Kata sandi"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              required
              autoComplete="current-password"
              labelLink={{ text: "Lupa kata sandi?", href: "/forgot-password" }}
            />

            <PrimaryButton className="mt-2">
              {loading ? "Memproses..." : "Masuk"}
            </PrimaryButton>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-white/70">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[var(--color-primary)] font-medium hover:brightness-110 transition-all md:ml-1"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function IllustrationPanel() {
  return (
    <div
      className="grid grid-cols-4 gap-4 w-full max-w-lg"
      style={{ gridTemplateColumns: "40px 1fr 1fr 40px" }}
    >
      <div className="relative col-span-3 min-h-60 rounded-lg overflow-hidden max-h-50">
        <img
          src="https://i.pinimg.com/736x/fa/66/9f/fa669f4488429107e3f075a46186ea89.jpg"
          alt="Vibes Jogja"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative col-span-1 rounded-lg overflow-hidden bg-[var(--color-primary)]" />
      <div className="relative col-span-1 rounded-lg overflow-hidden bg-[var(--color-primary)]" />
      <div className="relative col-span-3 min-h-60 rounded-lg overflow-hidden max-h-50">
        <img
          src="/images/login-panel-4.png"
          alt="Quotes Kafe Jogja"
          className="w-full h-full object-[50%_70%] object-cover"
        />
      </div>
    </div>
  );
}
