import "dotenv/config";
import {defineConfig} from "prisma/config";

const url = process.env.DATABASE_URL;

if (!url) {
    throw new Error("Missing DATABASE_URL");
}


export default defineConfig({
    migrations: {
        path: "./prisma/migrations"
    },
    schema: "./prisma/schema.prisma",
    datasource: {
        url
    }
});