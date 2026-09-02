import prisma from "../lib/prisma.js";
import {VerificationInput} from "../types/verification.type.js";
import {VERIFICATION_TYPE} from "../generatated/enums.js";

export const createVerificationToken = async (data: VerificationInput) => {
    return await prisma.verificationToken.create({
        data
    })
}

export const findVerificationTokenByHash = async (tokenHash: string, type: VERIFICATION_TYPE) => {
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

export const markVerificationTokenAsUsed = async (id: string) => {
    return await prisma.verificationToken.update({
        where: {
            id
        },
        data: {
            usedAt: new Date()
        }
    })
}