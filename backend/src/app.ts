import express from "express";
import type {Express, Request, Response} from "express";
import cors from "cors";
import {errorMiddleware} from "./middlewares/error.middleware.js";
import authRouter from "./routes/user.route.js"

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    credentials: true,
}));


app.get("/", (_req: Request, res: Response) => {
    return res.send("API is running");
})

app.get("/health", (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "OK",
    });
})

app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;