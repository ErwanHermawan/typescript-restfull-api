// -- core
import { z, ZodType } from "zod";

export class UserValidation {
	// validation user register
	static readonly REGISTER: ZodType = z.object({
		username: z.string().min(1).max(100),
		password: z.string().min(1).max(100),
		name: z.string().min(1).max(100),
	});

	// validation user login
	static readonly LOGIN: ZodType = z.object({
		username: z.string().min(1).max(100),
		password: z.string().min(1).max(100),
	});

	// validation user update
	static readonly UPDATE: ZodType = z.object({
		password: z.string().min(1).max(100).optional(),
		name: z.string().min(1).max(100).optional(),
	});
}
