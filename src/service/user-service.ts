// -- cores
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// -- database
import { prismaClient } from "../application/database";

// -- error response
import { ResponseError } from "../error/response-error";

// -- models
import {
	CreateUserRequest,
	LoginUserRequest,
	toUserResponse,
	UpdateUserRequest,
	UserResponse,
} from "../model/user-model";

// -- validation
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
	// service user register
	static async register(request: CreateUserRequest): Promise<UserResponse> {
		// register validation
		const registerRequest = Validation.validate(
			UserValidation.REGISTER,
			request
		);

		// get user with same username
		const totalUserWithSameUsername = await prismaClient.user.count({
			where: {
				username: registerRequest.username,
			},
		});

		// check user with same username
		if (totalUserWithSameUsername !== 0) {
			throw new ResponseError(400, "username already exsist");
		}

		// bcrypt password
		registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

		// create user resgistration
		const user = await prismaClient.user.create({
			data: registerRequest,
		});

		return toUserResponse(user);
	}

	// service user login
	static async login(request: LoginUserRequest): Promise<UserResponse> {
		// login validation
		const LoginRequest = Validation.validate(UserValidation.LOGIN, request);

		// check data user by username
		let user = await prismaClient.user.findUnique({
			where: {
				username: LoginRequest.username,
			},
		});

		// user is wrong
		if (!user) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		// check data user by password
		const isPasswordValid = await bcrypt.compare(
			LoginRequest.password,
			user.password
		);

		// password is wrong
		if (!isPasswordValid) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		// succesfully login with update token
		user = await prismaClient.user.update({
			where: {
				username: LoginRequest.username,
			},
			data: {
				token: uuid(),
			},
		});

		const response = toUserResponse(user);
		response.token = user.token!;
		return response;
	}

	// service user get
	static async get(user: User): Promise<UserResponse> {
		return toUserResponse(user);
	}

	// service user update
	static async update(
		user: User,
		request: UpdateUserRequest
	): Promise<UserResponse> {
		// check update validation
		const updateRequest = Validation.validate(UserValidation.UPDATE, request);

		// request update name
		if (updateRequest.name) {
			user.name = updateRequest.name;
		}

		// request update password
		if (updateRequest.password) {
			user.password = await bcrypt.hash(updateRequest.password, 10);
		}

		// update user by request
		const result = await prismaClient.user.update({
			where: {
				username: user.username,
			},
			data: user,
		});

		return toUserResponse(result);
	}

	// service logout user
	static async logout(user: User): Promise<UserResponse> {
		// upadate token to null when user logout
		const result = await prismaClient.user.update({
			where: {
				username: user.username,
			},
			data: {
				token: null,
			},
		});

		return toUserResponse(result);
	}
}
