import db from "@/lib/db";

export async function GET() {
  try {
    const query = `
        SELECT 
            c.id, c.name, c.area, c.rating,
            COALESCE(pv.view_count, 0) AS view_count,
            img.image_path AS image
        FROM cafes c
        LEFT JOIN cafe_page_views pv ON pv.cafe_id = c.id
        LEFT JOIN LATERAL (
            SELECT image_path FROM cafe_images
            WHERE cafe_id = c.id
            ORDER BY id ASC LIMIT 1
        ) img ON true
        ORDER BY view_count DESC NULLS LAST
        LIMIT 6
    `;
    const { rows } = await db.query(query);
    return Response.json({ status: "OK", data: rows });
  } catch (err: any) {
    console.error("GET /api/cafes error:", err);
    return Response.json(
      {
        status: "ERROR",
        message: err?.message ?? "Gagal mengambil data kafe",
      },
      { status: 500 },
    );
  }
}
