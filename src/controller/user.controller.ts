import { Request, Response, NextFunction } from "express";
import {
	CreateUserRequest,
	LoginUserRequest,
	UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
	// register user
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

	// login user
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

	// get user
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

	// update user
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

	//  logout user
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
