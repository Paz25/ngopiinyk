"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryButtonOutline from "./buttons/PrimaryButtonOutline";
import { koulen } from "@/utils/fonts";
import { Menu } from "lucide-react";

export type Menu = {
  name?: string;
  url?: string;
};

export default function Navbar() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <div className="hidden md:flex gap-2">
          <PrimaryButtonOutline onclick={() => router.push("/login")}>
            Masuk
          </PrimaryButtonOutline>
          <PrimaryButton onclick={() => router.push("/register")}>
            Daftar
          </PrimaryButton>
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

        <div className="flex flex-col gap-3 mt-auto">
          <PrimaryButtonOutline onclick={() => router.push("/login")}>
            Masuk
          </PrimaryButtonOutline>
          <PrimaryButton onclick={() => router.push("/register")}>
            Daftar
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
