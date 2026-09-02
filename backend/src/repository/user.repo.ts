import prisma from "../lib/prisma.js";
import {UserInput} from "../types/user.type.js";

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const userExists = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    return Boolean(user)
}

export const createUser = async (data: UserInput) => {
    return await prisma.user.create({
        data: data
    })
}


export const verifyUser = async (userId: string) => {
    return await prisma.user.update({
        where: {id: userId},
        data: {isVerified: true}
    })
}