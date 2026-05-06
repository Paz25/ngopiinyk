"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryButtonOutline from "./buttons/PrimaryButtonOutline";
import { koulen } from "@/utils/fonts";
import { Menu, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export type Menu = {
  name?: string;
  url?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthPage = ["/forgot-password"].includes(pathname);

  const menu: Menu[] = [
    { name: "Eksplor", url: "/explore" },
    { name: "Peta", url: "/maps" },
    { name: "FAQs", url: "/faqs" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const id = setTimeout(
      () => document.addEventListener("click", handleClickOutside),
      0,
    );
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (isAuthPage) return null;

  const UserBadge = ({ inSidebar = false }: { inSidebar?: boolean }) => (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
      >
        {user?.profile_picture_path ? (
          <img
            src={user.profile_picture_path}
            alt={user.name}
            className="w-[45px] aspect-square rounded-full object-cover border-2 border-[var(--color-primary)]"
          />
        ) : (
          <div className="w-[45px] aspect-square rounded-full bg-white/10 border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center text-sm font-medium shrink-0">
            {getInitials(user?.name ?? "")}
          </div>
        )}
        <span title={user?.name} className="text-sm font-medium truncate">
          {user?.name}
        </span>
      </button>

      {dropdownOpen && (
        <div
          className={[
            "absolute w-48 rounded-xl bg-[var(--color-background)] border border-white/10 shadow-xl py-1 z-50",
            inSidebar ? "right-0 bottom-full mb-2" : "right-0 mt-2",
          ].join(" ")}
        >
          <button
            onClick={() => {
              setDropdownOpen(false);
              router.push("/profile");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            <UserCircle size={16} />
            Profil saya
          </button>
          <div className="border-t border-white/10" />
          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      )}
    </div>
  );

  const AuthSkeleton = () => (
    <div className="flex items-center gap-2 w-[200px] cursor-pointer hover:opacity-80 transition-opacity">
      <div className="w-[45px] aspect-square rounded-full bg-white/10 shrink-0" />
      <div className="h-6 w-full rounded-md bg-white/10 animate-pulse" />
    </div>
  );

  const AuthButtons = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex ${vertical ? "flex-col" : ""} gap-2`}>
      <PrimaryButtonOutline
        className="h-11"
        onclick={() => router.push("/login")}
      >
        Masuk
      </PrimaryButtonOutline>
      <PrimaryButton className="h-11" onclick={() => router.push("/register")}>
        Daftar
      </PrimaryButton>
    </div>
  );

  const NavRight = ({ vertical = false }: { vertical?: boolean }) => {
    if (loading) return <AuthSkeleton />;
    if (user) return <UserBadge inSidebar={vertical} />;
    return <AuthButtons vertical={vertical} />;
  };

  return (
    <>
      <nav className="w-full flex justify-between px-6 md:px-12 py-3 sm:py-4 sticky top-0 z-50 bg-[var(--color-background)] shadow-sm">
        <div className="flex gap-10 items-center">
          <a href="/">
            <span className={`${koulen.className} text-2xl`}>Ngopiin.yk</span>
          </a>
          <div className="hidden md:flex gap-8">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="text-sm md:text-base cursor-pointer hover:underline"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <NavRight />
        </div>

        <button
          className="md:hidden flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={[
          "fixed top-0 right-0 z-50 h-full w-60 bg-[var(--color-background)] shadow-xl",
          "flex flex-col px-8 py-6 gap-8 md:hidden",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl cursor-pointer"
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-base font-medium hover:underline"
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <NavRight vertical />
        </div>
      </div>
    </>
  );
}
