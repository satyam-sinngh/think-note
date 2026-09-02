import express from "express";
import type {Express, Request, Response} from "express";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
    return res.send("API is running");
})

app.get("/health", (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "OK",
    });
})

export default app;