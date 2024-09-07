// -- core
import express from "express";

// -- middleware
import { authMiddleware } from "@middleware/auth";

// -- controllers
import { UserController } from "@controllers/user";
import { ContactController } from "@controllers/contact";

// -- endpoint
import { ENDPOINT } from "@api/endpoint";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get(ENDPOINT.USER, UserController.get);
apiRouter.patch(ENDPOINT.USER, UserController.update);
apiRouter.delete(ENDPOINT.USER, UserController.logout);

// Contact API
apiRouter.post(ENDPOINT.CONTACTS, ContactController.create);
apiRouter.get(`${ENDPOINT.CONTACTS}/:contactId(\\d+)`, ContactController.get);
apiRouter.put(
	`${ENDPOINT.CONTACTS}/:contactId(\\d+)`,
	ContactController.update
);
apiRouter.delete(
	`${ENDPOINT.CONTACTS}/:contactId(\\d+)`,
	ContactController.remove
);
apiRouter.get(`${ENDPOINT.CONTACTS}`, ContactController.search);
