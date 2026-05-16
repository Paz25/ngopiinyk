import { Metadata } from "next";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

export const metadata: Metadata = {
  title: "Ngopiinyk | Admin Dashboard",
  description: "Dashboard untuk mengelola kafe dan konten di Ngopiinyk.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      {children}
    </div>
  );
}
