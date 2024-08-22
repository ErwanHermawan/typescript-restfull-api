// -- core
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

// testing user registration
describe("POST /api/users", () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	it("should reject register new user if request is invalid", async () => {
		const response = await supertest(web).post("/api/users").send({
			username: "",
			password: "",
			name: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should register new user", async () => {
		const response = await supertest(web).post("/api/users").send({
			username: "test",
			password: "test",
			name: "test",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("test");
		expect(response.body.data.name).toBe("test");
	});
});

// testing user login
describe("POST /api/users/login", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to login", async () => {
		const response = await supertest(web).post("/api/users/login").send({
			username: "test",
			password: "test",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("test");
		expect(response.body.data.name).toBe("test");
		expect(response.body.data.token).toBeDefined();
	});

	it("should reject login user if username is wrong", async () => {
		const response = await supertest(web).post("/api/users/login").send({
			username: "salah",
			password: "test",
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should reject login user if username is wrong", async () => {
		const response = await supertest(web).post("/api/users/login").send({
			username: "test",
			password: "salah",
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

// testing user get data
describe("GET /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to get user", async () => {
		const response = await supertest(web)
			.get("/api/users/current")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("test");
		expect(response.body.data.name).toBe("test");
	});

	it("should reject get user if token is invalid", async () => {
		const response = await supertest(web)
			.get("/api/users/current")
			.set("X-API-TOKEN", "wrong");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

// testing user update data
describe("PATCH /api/user/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should reject update user if user request is ivalid", async () => {
		const response = await supertest(web)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				password: "",
				name: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should reject update user if token is wrong", async () => {
		const response = await supertest(web)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "wrong")
			.send({
				password: "true",
				name: "true",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be able to update username", async () => {
		const response = await supertest(web)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				name: "true",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.name).toBe("true");
	});

	it("should be able to update password", async () => {
		const response = await supertest(web)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				password: "true",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		const user = await UserTest.get();
		expect(await bcrypt.compare("true", user.password)).toBe(true);
	});
});

// testing user logout
describe("DELETE /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should to be able logout", async () => {
		const response = await supertest(web)
			.delete("/api/users/current")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("OK");

		const user = await UserTest.get();
		expect(user.token).toBeNull();
	});

	it("should reject logout user if token is wrong", async () => {
		const response = await supertest(web)
			.delete("/api/users/current")
			.set("X-API-TOKEN", "wrong");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});
