import { NextRequest } from "next/server";
import { signupSchema } from "@/lib/auth/schema";
import { authService } from "@/lib/auth/service";
import { ok, fail } from "@/lib/responses";

export async function POST(request: NextRequest) {
    try {
        const dto = signupSchema.parse(await request.json());
        const result = await authService.signup(
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
        }, 201);
        
        response.cookies.set("refreshToken", result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: result.tokens.refreshExpiresAt,
            path: "/",
        });
        return response;
    } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_EXISTS") return fail("Email sudah terdaftar", 409);
        return fail("Gagal membuat akun", 500);
    }
}