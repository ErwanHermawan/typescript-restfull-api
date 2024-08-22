// -- core
import express from "express";

// -- controllers
import { UserController } from "../controller/user.controller";

export const publicRouter = express.Router();

// public user API
publicRouter.post("/api/users", UserController.resgister);
publicRouter.post("/api/users/login", UserController.login);
