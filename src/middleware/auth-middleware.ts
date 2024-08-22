// -- core
import { Request, Response, NextFunction } from "express";

// -- database
import { prismaClient } from "../application/database";

// -- request
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (
	req: UserRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.get("X-API-TOKEN");

	// token is exsist
	if (token) {
		const user = await prismaClient.user.findFirst({
			where: {
				token: token,
			},
		});

		// user is exsist
		if (user) {
			req.user = user;
			next();
			return;
		}
	}

	// token is not exsist
	res
		.status(401)
		.json({
			errors: "Unauthorized",
		})
		.end();
};
