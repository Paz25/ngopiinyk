import db from "@/lib/db";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cafeId = parseInt(id);
  if (isNaN(cafeId)) return Response.json({ status: "ERROR" }, { status: 400 });

  try {
    await db.query(
      `
      INSERT INTO cafe_page_views (cafe_id, view_count, last_viewed_at)
      VALUES ($1, 1, NOW())
      ON CONFLICT (cafe_id) 
      DO UPDATE SET 
        view_count = cafe_page_views.view_count + 1,
        last_viewed_at = NOW()
    `,
      [cafeId],
    );
    return Response.json({ status: "OK" });
  } catch (err: any) {
    console.error(`POST /api/cafes/${cafeId}/view error:`, err);
    return Response.json(
      {
        status: "ERROR",
        message: err?.message ?? "Gagal mencatat page view",
      },
      { status: 500 },
    );
  }
}
