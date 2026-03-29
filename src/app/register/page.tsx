import { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Ngopiinyk | Daftar dan Mulai Perjalanan Kopimu di Jogja",
};

export default function RegisterPage() {
  return (
    <div className="flex w-full bg-[var(--color-background)]">
      <RegisterClient />
    </div>
  );
}
