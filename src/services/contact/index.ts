import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest } from "../../models/contact";
import { ContactValidation } from "../../validations/contact";
import { Validation } from "../../validations";
import { prismaClient } from "../../application/database";

export class ContactServive {
	static async create(
		user: User,
		request: CreateContactRequest
	): Promise<ContactResponse> {
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
	}
}
