"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        .scroll-to-top::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-color: var(--color-primary);
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 0;
        }
 
        .scroll-to-top:hover::before {
          transform: scale(1);
        }
 
        /* Ikon harus di atas lapisan fill */
        .scroll-to-top svg {
          position: relative;
          z-index: 1;
          transition: color 0.2s ease;
        }
 
        /* Saat hover: warna ikon ganti ke background */
        .scroll-to-top:hover svg {
          color: var(--color-background);
        }
      `}</style>

      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={[
          "scroll-to-top",
          "fixed bottom-6 right-6 z-30",
          "flex items-center justify-center p-4 rounded-full cursor-pointer",
          "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-background)]",
          "shadow-lg",
          "transition-[opacity,transform] duration-300 ease-in-out",
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </>
  );
}
