import prisma from "../lib/prisma.js";
import {VerificationInput} from "../types/verification.type.js";
import {VERIFICATION_TYPE} from "../generatated/enums.js";

export class VerificationRepository {

    async createVerificationToken(data: VerificationInput) {
        return await prisma.verificationToken.create({
            data
        })
    }

    async findVerificationTokenByHash(tokenHash: string, type: VERIFICATION_TYPE) {
        return await prisma.verificationToken.findFirst({
            where: {
                tokenHash,
                type,
                usedAt: null,
                expiresAt: {
                    gt: new Date()
                }
            }
        })
    }

    async markVerificationTokenAsUsed(id: string) {
        return await prisma.verificationToken.update({
            where: {
                id
            },
            data: {
                usedAt: new Date()
            }
        })
    }

}

export const verificationRepository = new VerificationRepository();