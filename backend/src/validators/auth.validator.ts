import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, {error: "Name is required"}),
    email: z.email({error: "Email is required"}),
    password: z.string().min(8, {error: "Password is required"}),
})