import db from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        cat.id, 
        cat.name,
        img.image_path AS top_cafe_image
      FROM categories cat
      LEFT JOIN LATERAL (
        SELECT c.id
        FROM bridge_category_cafe bcc
        JOIN cafes c ON bcc.cafe_id = c.id
        WHERE bcc.category_id = cat.id
        ORDER BY c.rating DESC NULLS LAST
        LIMIT 1
      ) top_cafe ON true
      LEFT JOIN LATERAL (
        SELECT image_path
        FROM cafe_images
        WHERE cafe_id = top_cafe.id
        ORDER BY id ASC
        LIMIT 1
      ) img ON true
      ORDER BY cat.id ASC
    `;
    const { rows } = await db.query(query);
    return Response.json({
      status: "OK",
      data: rows,
    });
  } catch (err: any) {
    console.error("GET /api/categories error:", err);
    return Response.json(
      {
        status: "ERROR",
        message: err?.message ?? "Gagal mengambil data kategori",
      },
      { status: 500 },
    );
  }
}
