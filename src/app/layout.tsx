import type { Metadata } from "next";
import { poppins, koulen } from "@/utils/fonts";
import { AuthProvider } from "@/lib/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${koulen.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
