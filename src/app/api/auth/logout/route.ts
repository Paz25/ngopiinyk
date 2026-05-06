import { NextRequest } from "next/server";
import { authService } from "@/lib/auth/service";
import { ok } from "@/lib/responses";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  const response = ok({ message: "Logged out" });
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
