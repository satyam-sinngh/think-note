import {Prisma} from "../generatated/client.js";

export type UserInput = Prisma.UserCreateInput;

export interface verifyUserAccountInput {
    rawToken: string;
}

export interface LoginInput {
    email: string;
    password: string;
}