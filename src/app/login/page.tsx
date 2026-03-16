import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Ngopiinyk | Masuk untuk Menjelajahi Kafe di Jogja",
};

export default function LoginPage() {
  return (
    <div className="flex w-full bg-[var(--color-background)]">
      <LoginClient />
    </div>
  );
}
