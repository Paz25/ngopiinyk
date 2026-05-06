import { NextResponse } from "next/server";
import type { TokenPair } from "./token";

export function setAuthCookies(response: NextResponse, tokens: TokenPair) {
  const baseOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  response.cookies.set("accessToken", tokens.accessToken, {
    ...baseOptions,
    expires: tokens.accessExpiresAt,
  });

  response.cookies.set("refreshToken", tokens.refreshToken, {
    ...baseOptions,
    expires: tokens.refreshExpiresAt,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
}
