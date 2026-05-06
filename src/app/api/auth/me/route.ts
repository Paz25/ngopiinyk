import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/token";
import { ok, fail } from "@/lib/responses";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return fail("Unauthorized", 401);

  try {
    const payload = await verifyAccessToken(token);
    const { rows } = await db.query(
      `SELECT id, name, email, profile_picture_path, 
      email_verified_at, created_at
      FROM users WHERE id = $1`,
      [payload.userId],
    );

    if (!rows[0]) return fail("User not found", 404);
    return ok({ user: rows[0] });
  } catch {
    return fail("Token tidak valid atau expired", 401);
  }
}
