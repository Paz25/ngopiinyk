import { Metadata } from "next";
import CafeDetailClient from "@/components/cafe/CafeDetailClient";
import db from "@/lib/db";

async function getCafe(id: string) {
  const cafeId = id;
  if (!cafeId) return null;
  const result = await db.query(
    `SELECT id, name, description FROM cafes WHERE id = $1 LIMIT 1`,
    [cafeId],
  );

  return result.rows[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cafe = await getCafe(id);

  if (!cafe) return { title: "Kafe tidak ditemukan" };

  return {
    title: `Ngopiinyk | ${cafe.name}`,
    description: `${cafe.description}`,
    openGraph: {
      title: cafe.name,
      images: cafe.primary_image ? [cafe.primary_image] : [],
    },
  };
}

export default async function CafeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CafeDetailClient id={id} />;
}
