import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret");
const accessTtl = Number(process.env.AUTH_ACCESS_TTL_SECONDS ?? 3600);
const refreshTtl = Number(process.env.AUTH_REFRESH_TTL_SECONDS ?? 2592000);

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    accessExpiresAt: Date;
    refreshExpiresAt: Date;
}

export async function issueTokenPair(sessionId: string, userId: string): Promise<TokenPair> {
    const now = Math.floor(Date.now() / 1000);
    const accessExpiresAt = new Date((now + accessTtl) * 1000);
    const refreshExpiresAt = new Date((now + refreshTtl) * 1000);

    const accessToken = await new SignJWT({ sub: userId, type: "access", sid: sessionId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(accessExpiresAt)
        .sign(secret);

    const refreshToken = await new SignJWT({ sub: userId, type: "refresh", sid: sessionId, jti: crypto.randomUUID() })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(refreshExpiresAt)
        .sign(secret);

    return { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt };
}

export async function verifyAccessToken(token: string) {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    if (payload.type !== "access") throw new Error("INVALID_TOKEN_TYPE");
    return { userId: payload.sub as string, sessionId: payload.sid as string };
}

export const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest();