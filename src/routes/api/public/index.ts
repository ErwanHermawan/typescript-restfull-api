// -- core
import express from "express";

// -- controllers
import { UserController } from "@controllers/user";

// -- endpoint
import { ENDPOINT } from "@api/endpoint";

export const publicRouter = express.Router();

const { PUBLIC } = ENDPOINT;

// public user API
publicRouter.post(PUBLIC.USER, UserController.resgister);
publicRouter.post(PUBLIC.LOGIN, UserController.login);
