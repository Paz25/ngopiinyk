import db from "@/lib/db";
import { hashToken } from "./token";

export async function findUserByEmail(email: string) {
    const { rows } = await db.query(
        `SELECT id, name, email, password FROM users WHERE email = $1 LIMIT 1`,
        [email]
    );
    return rows[0] ?? null;
}

export async function createUser(name: string, email: string, passwordHash: string) {
    const { rows } = await db.query(
        `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
        [name, email, passwordHash]
    );
    return rows[0];
}

export async function createSession(userId: string, ua?: string | null, ip?: string | null, expiresAt?: Date) {
    const { rows } = await db.query(
        `INSERT INTO auth_sessions (user_id, ua, ip, expires_at, last_seen_at, last_ua, last_ip)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $2, $3)
     RETURNING session_id`,
        [userId, ua ?? null, ip ?? null, expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)]
    );
    return rows[0].session_id as string;
}

export async function revokeSession(sessionId: string, reason: string) {
    await db.query(
        `UPDATE auth_sessions
     SET revoked_at = CURRENT_TIMESTAMP,
         reason = $2
     WHERE session_id = $1`,
        [sessionId, reason]
    );
}

export async function insertToken(options: {
    sessionId: string;
    userId: string;
    type: "access" | "refresh";
    token: string;
    expiresAt: Date;
}) {
    const tokenHash = hashToken(options.token);
    await db.query(
        `INSERT INTO auth_tokens (session_id, user_id, type, token_hash, expires_at)
     VALUES ($1, $2, $3, $4, $5)`,
        [options.sessionId, options.userId, options.type, tokenHash, options.expiresAt]
    );
}

export async function verifyRefreshToken(token: string) {
    const tokenHash = hashToken(token);
    const { rows } = await db.query(
        `SELECT token_id, session_id, user_id, expires_at, revoked_at, rotated_from
     FROM auth_tokens
     WHERE token_hash = $1 AND type = 'refresh'
     LIMIT 1`,
        [tokenHash]
    );
    return rows[0] ?? null;
}

export async function markTokenRevoked(tokenId: string) {
    await db.query(
        `UPDATE auth_tokens
     SET revoked_at = CURRENT_TIMESTAMP
     WHERE token_id = $1`,
        [tokenId]
    );
}

export async function rotateRefreshToken(oldTokenId: string, sessionId: string, userId: string, newToken: string, expiresAt: Date) {
    const tokenHash = hashToken(newToken);
    await db.query(
        `INSERT INTO auth_tokens (session_id, user_id, type, token_hash, expires_at, rotated_from)
     VALUES ($1, $2, 'refresh', $3, $4, $5)`,
        [sessionId, userId, tokenHash, expiresAt, oldTokenId]
    );
    await markTokenRevoked(oldTokenId);
}

export async function touchSession(sessionId: string, ua?: string | null, ip?: string | null) {
    await db.query(
        `UPDATE auth_sessions
     SET last_seen_at = CURRENT_TIMESTAMP,
         last_ua = COALESCE($2, last_ua),
         last_ip = COALESCE($3, last_ip)
     WHERE session_id = $1`,
        [sessionId, ua ?? null, ip ?? null]
    );
}