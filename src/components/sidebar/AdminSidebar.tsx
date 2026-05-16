import { koulen } from "@/utils/fonts";

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-lvh bg-gray-800 text-white p-8 flex flex-col items-stretch gap-6">
      <a href="/">
        <span className={`${koulen.className} text-2xl`}>Ngopiin.yk</span>
      </a>
    </aside>
  );
}
