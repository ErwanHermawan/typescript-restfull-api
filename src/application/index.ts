// -- core
import express from "express";

// -- middleware
import { errorMiddleware } from "@middleware/error";

// -- router
import { publicRouter } from "@routes/api/public";
import { apiRouter } from "@routes/api/private";

export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
