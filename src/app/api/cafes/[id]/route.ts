import { NextRequest } from "next/server";
import db from "@/lib/db";
import { decodeId } from "@/lib/hashid";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cafeId = decodeId(id);
    console.log("cafeId value:", cafeId);
    console.log("cafeId type:", typeof cafeId);
    // const cafeId = isNaN(Number(id)) ? decodeId(id) : Number(id);

    const cafe = await db.query(
      `SELECT
         id,
         name,
         address,
         gmaps_link,
         rating,
         review_count,
         opening_hours,
         description
       FROM cafes
       WHERE id = $1
       LIMIT 1`,
      [cafeId],
    );

    if (!cafe.rows.length) {
      return Response.json({ error: "Cafe not found" }, { status: 404 });
    }

    return Response.json(cafe.rows[0]);
  } catch (error) {
    console.error("[GET /api/cafes/:id]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const id = await params;
//   const cafeId = decodeId(id.id);
//   return Response.json({ ok: true, id: await params, cafeId });
// }
