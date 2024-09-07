// -- core
import { Response, NextFunction } from "express";

// -- request
import { UserRequest } from "@type/user";

// -- models
import {
	CreateContactRequest,
	SearchContactRequest,
	UpdateContactRequest,
} from "@models/contact";

// -- services
import { ContactServive } from "@services/contact";

export class ContactController {
	// controller create contact
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

	// controller get contact
	static async get(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const contactId = Number(req.params.contactId);
			const response = await ContactServive.get(req.user!, contactId);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	// controller update contact
	static async update(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: UpdateContactRequest = req.body as UpdateContactRequest;
			request.id = Number(req.params.contactId);

			const response = await ContactServive.update(req.user!, request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	// controller remove contact
	static async remove(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const contactId = Number(req.params.contactId);
			const response = await ContactServive.remove(req.user!, contactId);

			res.status(200).json({
				data: "OK",
			});
		} catch (error) {
			next(error);
		}
	}

	// controller search contact
	static async search(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: SearchContactRequest = {
				name: req.query.name as string,
				email: req.query.email as string,
				phone: req.query.phone as string,
				page: req.query.page ? Number(req.query.page) : 1,
				size: req.query.size ? Number(req.query.size) : 10,
			};
			const response = await ContactServive.search(req.user!, request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}
}
