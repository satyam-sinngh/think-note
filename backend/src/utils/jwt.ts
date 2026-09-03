import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT secret");
    }
    return secret;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export function signJwtToken(payload: JwtPayload): string {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: JWT_EXPIRES_IN
    } as jwt.SignOptions);
}

export function verifyJwtToken(token: string): JwtPayload {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
}