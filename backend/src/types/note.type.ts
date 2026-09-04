import {Prisma} from "../generatated/client.js";

export type NoteInput = Prisma.NoteCreateInput;

type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

export type NoteUpdateInput = {
    id: string,
    userId: string,
    data: RequireAtLeastOne<Pick<Prisma.NoteUpdateInput, "title" | "content" | "tags">>,
};