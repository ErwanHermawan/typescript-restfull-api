import { Contact } from "@prisma/client";

export type ContactResponse = {
	id: number;
	first_name: string;
	last_name?: string | null;
	email?: string | null;
	phone?: string | null;
};

export type CreateContactRequest = {
	id: number;
	first_name: string;
	last_name?: string;
	email?: string;
	phone?: string;
};

export function toConcatResponse(contact: Contact): ContactResponse {
	return {
		id: contact.id,
		first_name: contact.firt_name,
		last_name: contact.last_name,
		email: contact.email,
		phone: contact.phone,
	};
}
