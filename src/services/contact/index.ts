// -- core
import { prismaClient } from "@application/database";
import { User } from "@prisma/client";

// -- models
import {
	ContactResponse,
	CreateContactRequest,
	toConcatResponse,
} from "@models/contact";

// -- validations
import { ContactValidation } from "@validations/contact";
import { Validation } from "@validations/index";
import { ResponseError } from "@errors/response";

export class ContactServive {
	// service create contact
	static async create(
		user: User,
		request: CreateContactRequest
	): Promise<ContactResponse> {
		// create request
		const createRequest = Validation.validate(
			ContactValidation.CREATE,
			request
		);

		const record = {
			...createRequest,
			...{ username: user.username },
		};

		const contact = await prismaClient.contact.create({
			data: record,
		});

		return toConcatResponse(contact);
	}

	// servise get contact
	static async get(user: User, id: number): Promise<ContactResponse> {
		const contact = await prismaClient.contact.findUnique({
			where: {
				id: id,
				username: user.username,
			},
		});

		if (!contact) {
			throw new ResponseError(404, "Contact not found");
		}

		return toConcatResponse(contact);
	}
}
