import crypto from "node:crypto";
import {Buffer} from "node:buffer";

export const generateToken = () => {
    return crypto
        .randomBytes(32)
        .toString("base64url")
}

export const hashToken = (token: string) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")
}

const verifyToken = (token: string, hashedToken: string) => {
    const tokenHash = hashToken(token);

    const tokenBuffer = Buffer.from(tokenHash, "hex");
    const hashBuffer = Buffer.from(hashedToken, "hex");

    if (tokenBuffer.length !== hashBuffer.length) return false;

    return crypto
        .timingSafeEqual(hashBuffer, hashBuffer);

}
