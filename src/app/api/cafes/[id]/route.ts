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

    const cafe = await db.query(
      `SELECT
        c.id,
        c.name,
        c.address,
        c.gmaps_link,
        c.rating,
        c.review_count,
        c.opening_hours,
        c.description,
        c.latitude,
        c.longitude,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', f.id, 'name', f.name, 'icon', f.icon)
          ) FILTER (WHERE f.id IS NOT NULL),
          '[]'
        ) AS facilities
        FROM cafes c
        LEFT JOIN bridge_facility_cafe bfc ON bfc.cafe_id = c.id
        LEFT JOIN facilities f ON f.id = bfc.facility_id
        WHERE c.id = $1
        GROUP BY c.id`,
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
