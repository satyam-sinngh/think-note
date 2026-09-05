import prisma from "../lib/prisma.js";
import {UserInput} from "../types/user.type.js";

export class UserRepository {
    async findUserById(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async userExists(email: string) {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        return Boolean(user)
    }

    async createUser(data: UserInput) {
        return await prisma.user.create({
            data: data
        })
    }


    async verifyUser(userId: string) {
        return await prisma.user.update({
            where: {id: userId},
            data: {isVerified: true}
        })
    }
}

export const userRepository = new UserRepository();