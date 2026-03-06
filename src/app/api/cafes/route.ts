import db from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT DISTINCT ON (c.id) 
        c.id, 
        c.name, 
        c.area, 
        c.rating,
        i.image_path as image,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', cat.id, 'name', cat.name)
          ) FILTER (WHERE cat.id IS NOT NULL),
          '[]'
        ) AS categories
      FROM cafes c
      LEFT JOIN cafe_images i ON c.id = i.cafe_id
      LEFT JOIN bridge_category_cafe bcc ON c.id = bcc.cafe_id
      LEFT JOIN categories cat ON bcc.category_id = cat.id
      GROUP BY c.id, c.name, c.area, i.image_path, i.id
      ORDER BY c.id ASC, i.id ASC
    `;
    const { rows } = await db.query(query);
    return Response.json({ status: "OK", data: rows });
  } catch (err: any) {
    console.error("GET /api/cafes error:", err);
    return Response.json(
      {
        status: "ERROR",
        message: err?.message ?? "Gagal mengambil data cafes",
      },
      { status: 500 },
    );
  }
}
