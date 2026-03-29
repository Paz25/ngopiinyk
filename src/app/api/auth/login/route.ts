import { NextRequest } from "next/server";
import { loginSchema } from "@/lib/auth/schema";
import { authService } from "@/lib/auth/service";
import { ok, fail } from "@/lib/responses";

export async function POST(request: NextRequest) {
    try {
        const dto = loginSchema.parse(await request.json());
        const result = await authService.login(
            dto,
            request.headers.get("user-agent") ?? undefined,
            // request.ip ?? request.headers.get("x-forwarded-for") ?? undefined
            request.headers.get("x-forwarded-for") ?? undefined
        );

        const response = ok({
            user: result.user,
            tokens: {
                accessToken: result.tokens.accessToken,
                accessExpiresAt: result.tokens.accessExpiresAt,
            },
        });
        
        response.cookies.set("refreshToken", result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: result.tokens.refreshExpiresAt,
            path: "/",
        });
        return response;
    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") return fail("Email atau password salah", 401);
        return fail("Gagal login", 500);
    }
}