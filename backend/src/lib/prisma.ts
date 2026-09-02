import "dotenv/config";
import {PrismaClient} from "../generatated/client.js";
import {PrismaPg} from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Missing database connection string");
}

const adapter = new PrismaPg({
    connectionString
})

const prisma = new PrismaClient({
    adapter
})

export default prisma;