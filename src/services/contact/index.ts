// -- core
import { prismaClient } from "@application/database";
import { Contact, User } from "@prisma/client";

// -- models
import {
	ContactResponse,
	CreateContactRequest,
	toConcatResponse,
	UpdateContactRequest,
} from "@models/contact";

// -- validations
import { ContactValidation } from "@validations/contact";
import { Validation } from "@validations/index";
import { ResponseError } from "@errors/response";
import { UserValidation } from "@validations/user";

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

	static async checkContactMustExsit(
		username: string,
		contactId: number
	): Promise<Contact> {
		const contact = await prismaClient.contact.findUnique({
			where: {
				id: contactId,
				username: username,
			},
		});

		if (!contact) {
			throw new ResponseError(404, "Contact not found");
		}

		return contact;
	}

	// servise get contact
	static async get(user: User, id: number): Promise<ContactResponse> {
		const contact = await this.checkContactMustExsit(user.username, id);

		return toConcatResponse(contact);
	}

	// service update contact
	static async update(
		user: User,
		request: UpdateContactRequest
	): Promise<ContactResponse> {
		const updateRequest = Validation.validate(
			ContactValidation.UPDATE,
			request
		);

		await this.checkContactMustExsit(user.username, request.id);

		const contact = await prismaClient.contact.update({
			where: {
				id: updateRequest.id,
				username: user.username,
			},
			data: updateRequest,
		});

		return toConcatResponse(contact);
	}
}
