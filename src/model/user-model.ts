// -- core
import { User } from "@prisma/client";

// model user response
export type UserResponse = {
	username: string;
	name: string;
	token?: string;
};

// model create user request
export type CreateUserRequest = {
	username: string;
	name: string;
	password: string;
};

// model login user request
export type LoginUserRequest = {
	username: string;
	password: string;
};

// model update user request
export type UpdateUserRequest = {
	name?: string;
	password?: string;
};

// return user response
export function toUserResponse(user: User): UserResponse {
	return {
		name: user.name,
		username: user.username,
	};
}
