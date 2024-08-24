// -- core
import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";
import { logObjectData } from "./logging";

export const prismaClient = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "event",
			level: "error",
		},
		{
			emit: "event",
			level: "info",
		},
		{
			emit: "event",
			level: "warn",
		},
	],
});

// prismaClient.$on("error", (e) => {
// 	logger.error(e);
// });

// prismaClient.$on("warn", (e) => {
// 	logger.warn(e);
// });

// prismaClient.$on("info", (e) => {
// 	logger.info(e);
// });

// prismaClient.$on("query", (e) => {
// 	logger.info(e);
// });

prismaClient.$on("query", (e) => {
	logger.info("QUERY LOG");
	logger.info("========");
	logObjectData(e, "info");
});
prismaClient.$on("error", (e) => {
	logger.error("ERROR LOG");
	logger.error("========");
	logObjectData(e, "error");
});
prismaClient.$on("info", (e) => {
	logger.info("INFO LOG");
	logger.info("========");
	logObjectData(e, "info");
});
prismaClient.$on("warn", (e) => {
	logger.warn("WARN LOG");
	logger.warn("========");
	logObjectData(e, "warn");
});
