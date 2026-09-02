import {config} from "dotenv";

config({
    path: `${process.cwd()}/.env.local`,
})
import app from "./app.js";
import express from "express";
import cors from "cors";

const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(cors({
    credentials: true,
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})