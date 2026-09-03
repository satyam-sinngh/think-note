import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, {error: "Name is required"}),
    email: z.email({
        error: (issue) => {
            if (issue.input === undefined) return "Email is required";
            return "Invalid email address";
        }
    }),
    password: z.string().min(8, {error: "Password must be at least 8 characters"}),
})

export const verifyAccountSchema = z.object({
    rawToken: z.string().min(1, {error: "token is required"}),
})

export const loginSchema = z.object({
    email: z.email({
        error: (issue) => {
            if (issue.input === undefined) return "Email is required";
            return "Invalid email address";
        }
    }),
    password: z.string().min(8, {error: "Password must be at least 8 characters"}),

})