// -- core
import supertest from "supertest";
import { logObjectData } from "@application/logging";

// -- application
import { app } from "@application/index";
import { logger } from "@application/logging";

// -- utils
import { UserTest, ContactTest } from "./test-util";

// -- endpoint
import { ENDPOINT } from "@routes/api/endpoint";

// testing create contact
describe(`POST ${ENDPOINT.CONTACTS}`, () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should create new contact", async () => {
		const response = await supertest(app)
			.post(ENDPOINT.CONTACTS)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "john",
				last_name: "doe",
				email: "john@gmail.com",
				phone: "08900000",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe("john");
		expect(response.body.data.last_name).toBe("doe");
		expect(response.body.data.email).toBe("john@gmail.com");
		expect(response.body.data.phone).toBe("08900000");
	});

	it("should reject create new contact if data is invalid", async () => {
		const response = await supertest(app)
			.post(ENDPOINT.CONTACTS)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "",
				last_name: "",
				email: "john",
				phone: "08900000",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

// testing get contact
describe(`GET ${ENDPOINT.CONTACTS}/:contactId`, () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("shoult be able get contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.get(`${ENDPOINT.CONTACTS}/${contact.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe(contact.first_name);
		expect(response.body.data.last_name).toBe(contact.last_name);
		expect(response.body.data.email).toBe(contact.email);
		expect(response.body.data.phone).toBe(contact.phone);
	});

	it("shoult be reject get contact if contact is not found", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.get(`${ENDPOINT.CONTACTS}/${contact.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

// testing update contact
describe(`PUT ${ENDPOINT.CONTACTS}/:contactId`, () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able update contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.put(`${ENDPOINT.CONTACTS}/${contact.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "John",
				last_name: "Doe",
				email: "john@gmail.com",
				phone: "08999",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBe(contact.id);
		expect(response.body.data.first_name).toBe("John");
		expect(response.body.data.last_name).toBe("Doe");
		expect(response.body.data.email).toBe("john@gmail.com");
		expect(response.body.data.phone).toBe("08999");
	});

	it("should reject update contact if request in invalid", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.put(`${ENDPOINT.CONTACTS}/${contact.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

// testing delete contact
describe(`DELETE ${ENDPOINT.CONTACTS}/:contactId`, () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able remove contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.delete(`${ENDPOINT.CONTACTS}/${contact.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("OK");
	});

	it("should reject remove contcat if contact is not found", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(app)
			.delete(`${ENDPOINT.CONTACTS}/${contact.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

// testing delete contact
describe(`GET ${ENDPOINT.CONTACTS}`, () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to search contact", async () => {
		const response = await supertest(app)
			.get(ENDPOINT.CONTACTS)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	it("should be able to search contact using name", async () => {
		const response = await supertest(app)
			.get(ENDPOINT.CONTACTS)
			.query({
				name: "es",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	it("should be able to search contact using email", async () => {
		const response = await supertest(app)
			.get(ENDPOINT.CONTACTS)
			.query({
				email: ".com",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	it("should be able to search contact using phone", async () => {
		const response = await supertest(app)
			.get(ENDPOINT.CONTACTS)
			.query({
				phone: "99",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	it("should be able to search contact with paging", async () => {
		const response = await supertest(app)
			.get(ENDPOINT.CONTACTS)
			.query({
				page: 2,
				size: 1,
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.paging.current_page).toBe(2);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(1);
	});
});
