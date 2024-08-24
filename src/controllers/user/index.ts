// -- cores
import { Request, Response, NextFunction } from "express";

// -- models
import {
	CreateUserRequest,
	LoginUserRequest,
	UpdateUserRequest,
} from "@models/user";

// -- services
import { UserService } from "@services/user";

// -- request
import { UserRequest } from "@type/user";

export class UserController {
	// register user controller
	static async resgister(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.register(request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	// login user controller
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: LoginUserRequest = req.body as LoginUserRequest;
			const response = await UserService.login(request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	// get user controller
	static async get(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const response = await UserService.get(req.user!);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	// update user controller
	static async update(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: UpdateUserRequest = req.body as UpdateUserRequest;
			const response = await UserService.update(req.user!, request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	//  logout user controller
	static async logout(req: UserRequest, res: Response, next: NextFunction) {
		try {
			await UserService.logout(req.user!);

			res.status(200).json({
				data: "OK",
			});
		} catch (error) {
			next(error);
		}
	}
}
