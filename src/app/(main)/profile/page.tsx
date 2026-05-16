import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Ngopiinyk | Profil",
};

export default function ProfilePage() {
  return (
    <div className="flex w-full bg-[var(--color-background)]">
      <ProfileClient />
    </div>
  );
}
