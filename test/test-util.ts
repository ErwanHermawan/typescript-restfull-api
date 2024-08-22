// -- core
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

// -- database
import { prismaClient } from "../src/application/database";

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				username: "test",
			},
		});
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				username: "test",
				name: "test",
				password: await bcrypt.hash("test", 10),
				token: "test",
			},
		});
	}

	static async get(): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				username: "test",
			},
		});

		if (!user) {
			throw new Error("User is not found");
		}

		return user;
	}
}
