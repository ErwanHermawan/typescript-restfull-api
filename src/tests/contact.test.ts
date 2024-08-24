// -- core
import supertest from "supertest";
import { logObjectData } from "@application/logging";

// -- application
import { web } from "@application/web";
import { logger } from "@application/logging";

// -- utils
import { UserTest, ContactTest } from "./test-util";

// -- endpoint
import { ENDPOINT } from "@routes/api/endpoint";

// testing user registration
describe(`POST ${ENDPOINT.CONTACTS}`, () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should create new contact", async () => {
		const response = await supertest(web)
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
		const response = await supertest(web)
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
