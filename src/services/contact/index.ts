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

export class ContactServive {
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
}
