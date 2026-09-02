import "dotenv/config";

import app from "./app.js";
import express from "express";
import cors from "cors";
import {errorMiddleware} from "./middlewares/error.middleware.js";

const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    credentials: true,
}));

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})