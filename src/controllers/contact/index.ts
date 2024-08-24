// -- core
import { Response, NextFunction } from "express";

// -- request
import { UserRequest } from "@type/user";

// -- models
import { CreateContactRequest } from "@models/contact";

// -- services
import { ContactServive } from "@services/contact";

export class ContactController {
	static async create(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: CreateContactRequest = req.body;
			const response = await ContactServive.create(req.user!, request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}
}
