"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryButtonOutline from "./buttons/PrimaryButtonOutline";
import { koulen } from "@/utils/fonts";
import { Menu, User, LogOut, UserCircle } from "lucide-react";

export type Menu = {
  name?: string;
  url?: string;
};

type UserInfo = {
  name: string;
  profilePicture?: string;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const menu: Menu[] = [
    { name: "Eksplor", url: "/explore" },
    { name: "Peta", url: "/maps" },
    { name: "FAQs", url: "/faqs" },
  ];

  useEffect(() => {
    const loadUser = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            return;
          } catch {
            setUser(null);
            return;
          }
        }
      }
      setUser(null);
    };
    loadUser();

    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

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
    const id = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  const userBadge = (
    <div ref={dropdownRef} onMouseDown={(e) => e.stopPropagation()}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center text-sm font-medium">
            {getInitials(user?.name ?? "")}
          </div>
        )}
        <span className="text-sm font-medium">{user?.name}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-10 mt-2 w-48 rounded-lg bg-[var(--color-background)] border border-white/10 shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setDropdownOpen(false);
              router.push("/profile");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            <UserCircle size={16} />
            Profil
          </button>
          <div className="border-t border-white/10" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      )}
    </div>
  );

  const AuthButtons = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex ${vertical ? "flex-col" : ""} gap-2`}>
      <PrimaryButtonOutline onclick={() => router.push("/login")}>
        Masuk
      </PrimaryButtonOutline>
      <PrimaryButton onclick={() => router.push("/register")}>
        Daftar
      </PrimaryButton>
    </div>
  );

  return (
    <>
      <nav className="w-full flex justify-between px-6 md:px-12 py-3 sm:py-5 sticky top-0 z-50 bg-[var(--color-background)] shadow-sm">
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

        {/* Desktop: Auth buttons or user badge */}
        <div className="hidden md:flex items-center">
          {user ? userBadge : <AuthButtons />}
        </div>

        {/* Hamburger Button Mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          "fixed top-0 right-0 z-50 h-full w-60 bg-[var(--color-background)] shadow-xl",
          "flex flex-col px-8 py-6 gap-8 md:hidden",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-end items-center">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl leading-none cursor-pointer"
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

        {/* Sidebar: Auth buttons or user badge */}
        <div className="flex flex-col gap-3 mt-auto">
          {user ? userBadge : <AuthButtons vertical />}
        </div>
      </div>
    </>
  );
}
