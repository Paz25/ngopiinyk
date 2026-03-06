import db from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT DISTINCT ON (bcc.category_id)
        cat.id   AS category_id,
        cat.name AS category_name,
        c.id     AS cafe_id,
        c.name   AS cafe_name,
        c.area,
        c.rating,
        img.image_path AS primary_image
      FROM bridge_category_cafe bcc
      JOIN categories cat ON bcc.category_id = cat.id
      JOIN cafes c ON bcc.cafe_id = c.id
      LEFT JOIN LATERAL (
        SELECT image_path FROM cafe_images
        WHERE cafe_id = c.id
        ORDER BY id ASC
        LIMIT 1
      ) img ON true
      ORDER BY bcc.category_id ASC, c.rating DESC NULLS LAST
    `;
    const { rows } = await db.query(query);
    return Response.json({ status: "OK", data: rows });
  } catch (err: any) {
    console.error("GET /api/cafes/best error:", err);
    return Response.json(
      {
        status: "ERROR",
        message: err?.message ?? "Gagal mengambil data best cafes",
      },
      { status: 500 },
    );
  }
}
