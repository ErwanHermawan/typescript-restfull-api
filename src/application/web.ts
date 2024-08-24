// -- core
import express from "express";

// -- middleware
import { errorMiddleware } from "@middleware/error";

// -- router
import { publicRouter } from "@routes/api/public";
import { apiRouter } from "@routes/api/private";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
