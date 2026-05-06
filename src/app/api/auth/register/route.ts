import { NextRequest } from "next/server";
import { signupSchema } from "@/lib/auth/schema";
import { authService } from "@/lib/auth/service";
import { setAuthCookies } from "@/lib/auth/cookies";
import { ok, fail } from "@/lib/responses";

export async function POST(request: NextRequest) {
  try {
    const dto = signupSchema.parse(await request.json());
    const result = await authService.signup(
      dto,
      request.headers.get("user-agent") ?? undefined,
      request.headers.get("x-forwarded-for") ?? undefined,
    );

    const response = ok({ user: result.user }, 201);
    setAuthCookies(response, result.tokens);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS")
      return fail("Email sudah terdaftar", 409);
    return fail("Gagal membuat akun", 500);
  }
}
