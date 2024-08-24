// -- core
import express from "express";

// -- middleware
import { authMiddleware } from "@middleware/auth";

// -- controllers
import { UserController } from "@controllers/user";

// -- endpoint
import { ENDPOINT } from "@api/endpoint";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get(ENDPOINT.USER, UserController.get);
apiRouter.patch(ENDPOINT.USER, UserController.update);
apiRouter.delete(ENDPOINT.USER, UserController.logout);
