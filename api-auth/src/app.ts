import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "../src/routes/auth.routes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

export default app;