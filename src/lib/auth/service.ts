import { hashPassword, verifyPassword } from "./password";
import {
    findUserByEmail,
    createUser,
    createSession,
    insertToken,
    verifyRefreshToken,
    rotateRefreshToken,
    touchSession,
    revokeSession,
    markTokenRevoked,
} from "./queries";
import { issueTokenPair, TokenPair } from "./token";
import type { SignupInput, LoginInput } from "./schema";

export class AuthService {
    async signup(input: SignupInput, ua?: string, ip?: string) {
        const existing = await findUserByEmail(input.email);
        if (existing) throw new Error("EMAIL_EXISTS");

        const passwordHash = await hashPassword(input.password);
        const user = await createUser(input.name, input.email, passwordHash);
        const sessionId = await createSession(user.id, ua, ip);
        const tokens = await issueTokenPair(sessionId, user.id);
        await insertToken({ 
            sessionId, 
            userId: user.id, 
            type: "refresh", 
            token: tokens.refreshToken, 
            expiresAt: tokens.refreshExpiresAt 
        });

        return { user, tokens };
    }

    async login(input: LoginInput, ua?: string, ip?: string) {
        const user = await findUserByEmail(input.email);
        if (!user) throw new Error("INVALID_CREDENTIALS");

        const valid = await verifyPassword(input.password, user.password);
        if (!valid) throw new Error("INVALID_CREDENTIALS");

        const sessionId = await createSession(user.id, ua, ip);
        const tokens = await issueTokenPair(sessionId, user.id);
        await insertToken({ 
            sessionId, 
            userId: user.id, 
            type: "refresh", 
            token: tokens.refreshToken,
            expiresAt: tokens.refreshExpiresAt 
        });

        return { user: { 
            id: user.id, 
            name: user.name, 
            email: user.email 
        }, tokens };
    }

    async refresh(refreshToken: string, ua?: string, ip?: string) {
        const record = await verifyRefreshToken(refreshToken);
        if (!record) throw new Error("INVALID_REFRESH");
        if (record.revoked_at) throw new Error("REFRESH_REVOKED");
        if (new Date(record.expires_at) < new Date()) throw new Error("REFRESH_EXPIRED");

        await touchSession(record.session_id, ua, ip);
        const tokens = await issueTokenPair(record.session_id, record.user_id);
        await rotateRefreshToken(
            record.token_id, 
            record.session_id, 
            record.user_id, 
            tokens.refreshToken, 
            tokens.refreshExpiresAt
        );

        return { userId: record.user_id, tokens };
    }

    async logout(refreshToken: string) {
        const record = await verifyRefreshToken(refreshToken);
        if (record) {
            await markTokenRevoked(record.token_id);
            await revokeSession(record.session_id, "user_logout");
        }
    }
}

export const authService = new AuthService();