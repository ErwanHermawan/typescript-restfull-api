import { Contact } from "@prisma/client";

// contact response
export type ContactResponse = {
	id: number;
	first_name: string;
	last_name?: string | null;
	email?: string | null;
	phone?: string | null;
};

// create contact request
export type CreateContactRequest = {
	first_name: string;
	last_name?: string;
	email?: string;
	phone?: string;
};

// update contact request
export type UpdateContactRequest = {
	id: number;
	first_name: string;
	last_name?: string;
	email?: string;
	phone?: string;
};

// search contact request
export type SearchContactRequest = {
	name?: string;
	phone?: string;
	email?: string;
	page: number;
	size: number;
};

// conversion contact prisma to contact response
export function toConcatResponse(contact: Contact): ContactResponse {
	return {
		id: contact.id,
		first_name: contact.first_name,
		last_name: contact.last_name,
		email: contact.email,
		phone: contact.phone,
	};
}
