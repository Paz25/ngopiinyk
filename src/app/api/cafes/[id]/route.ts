import { NextRequest } from "next/server";
import db from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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
          (
            SELECT JSON_AGG(row)
            FROM (
              SELECT DISTINCT ON (f.id)
                JSON_BUILD_OBJECT('id', f.id, 'name', f.name, 'icon', f.icon) AS row
              FROM bridge_facility_cafe bfc2
              JOIN facilities f ON f.id = bfc2.facility_id
              WHERE bfc2.cafe_id = c.id
            ) sub
          ),
          '[]'
        ) AS facilities,
        COALESCE(
          (
            SELECT JSON_AGG(img)
            FROM (
              SELECT id, image_path, caption
              FROM cafe_images
              WHERE cafe_id = c.id
              ORDER BY id ASC
              LIMIT 5
            ) img
          ),
          '[]'
        ) AS images,
        COALESCE(
          (
            SELECT JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', cat.id,
                'name', cat.name,
                'percentage', bcc.percentage
              )
              ORDER BY bcc.percentage DESC
            )
            FROM bridge_category_cafe bcc
            JOIN categories cat ON cat.id = bcc.category_id
            WHERE bcc.cafe_id = c.id
          ),
          '[]'
        ) AS categories,
         COALESCE(
          (
            SELECT JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', m.id,
                'name', m.name,
                'price', m.price,
                'image_path', m.image_path
              )
            )
            FROM cafe_menus m
            WHERE m.cafe_id = c.id
          ),
          '[]'
        ) AS menus
      FROM cafes c
      WHERE c.id = $1
      GROUP BY c.id`,
      [id],
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
