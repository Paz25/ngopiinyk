import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryButtonOutline from "./buttons/PrimaryButtonOutline";
import { koulen } from "@/utils/fonts";

export type Menu = {
  name?: string;
  url?: string;
};

export default function Navbar() {
  const menu: Menu[] = [
    { name: "Eksplor", url: "/explore" },
    { name: "Peta", url: "/maps" },
    { name: "FAQs", url: "/faqs" },
  ];
  return (
    <nav className="w-full flex justify-between px-12 py-5 sticky top-0 z-50 bg-[var(--color-background)] shadow-sm">
      <div className="flex gap-10 items-center">
        <a href="/">
          <span className={`${koulen.className} text-2xl`}>Ngopiin.yk</span>
        </a>
        <div className="flex gap-8">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-sm cursor-pointer hover:underline"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <PrimaryButtonOutline title="Masuk" />
        <PrimaryButton title="Daftar" />
      </div>
    </nav>
  );
}
