// -- core
import express from "express";

// -- middleware
import { errorMiddleware } from "../middleware/error-middleware";

// -- router
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
