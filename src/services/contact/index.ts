// -- core
import { prismaClient } from "@application/database";
import { Contact, User } from "@prisma/client";

// -- models
import {
	ContactResponse,
	CreateContactRequest,
	SearchContactRequest,
	toConcatResponse,
	UpdateContactRequest,
} from "@models/contact";
import { Pageable } from "@models/page";

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

	// check exsist contact
	static async checkContactMustExsit(
		username: string,
		contactId: number
	): Promise<Contact> {
		const contact = await prismaClient.contact.findFirst({
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

		// check exsist contact
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

	// service delete contact
	static async remove(user: User, id: number): Promise<ContactResponse> {
		await this.checkContactMustExsit(user.username, id);

		const contact = await prismaClient.contact.delete({
			where: {
				id: id,
				username: user.username,
			},
		});

		return toConcatResponse(contact);
	}

	// service delete contact
	static async search(
		user: User,
		request: SearchContactRequest
	): Promise<Pageable<ContactResponse>> {
		const searchRequest = Validation.validate(
			ContactValidation.SEARCH,
			request
		);
		const skip = (searchRequest.page - 1) * searchRequest.size;

		const filters = [];
		// check if name exists
		if (searchRequest.name) {
			filters.push({
				OR: [
					{
						first_name: {
							contains: searchRequest.name,
						},
					},
					{
						last_name: {
							contains: searchRequest.name,
						},
					},
				],
			});
		}

		// check if email exists
		if (searchRequest.email) {
			filters.push({
				email: {
					contains: searchRequest.email,
				},
			});
		}

		// check if phone exists
		if (searchRequest.phone) {
			filters.push({
				phone: {
					contains: searchRequest.phone,
				},
			});
		}

		const contact = await prismaClient.contact.findMany({
			where: {
				username: user.username,
				AND: filters,
			},
			take: searchRequest.size,
			skip: skip,
		});

		const total = await prismaClient.contact.count({
			where: {
				username: user.username,
				AND: filters,
			},
		});

		return {
			data: contact.map((contact) => toConcatResponse(contact)),
			paging: {
				current_page: searchRequest.page,
				total_page: Math.ceil(total / searchRequest.size),
				size: searchRequest.size,
			},
		};
	}
}
