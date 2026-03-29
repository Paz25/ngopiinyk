import { NextRequest } from "next/server";
import { authService } from "@/lib/auth/service";
import { ok, fail } from "@/lib/responses";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;
        if (!refreshToken) return fail("Refresh token missing", 401);

        const { userId, tokens } = await authService.refresh(
            refreshToken,
            request.headers.get("user-agent") ?? undefined,
            // request.ip ?? request.headers.get("x-forwarded-for") ?? undefined
            request.headers.get("x-forwarded-for") ?? undefined  
        );

        const response = ok({ userId, tokens: { accessToken: tokens.accessToken, accessExpiresAt: tokens.accessExpiresAt } });
        response.cookies.set("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: tokens.refreshExpiresAt,
            path: "/",
        });
        return response;
    } catch (error) {
        return fail("Refresh token invalid", 401);
    }
}