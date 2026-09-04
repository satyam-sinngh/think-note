import {z} from "zod";

export const createNoteSchema = z.object({
    title: z.string().min(1, {error: `Title field is required`}),
    content: z.string().min(1, {error: `Content field is required`}),
    tags: z.array(z.string().min(1, {error: `Tags field is required`}),)
})