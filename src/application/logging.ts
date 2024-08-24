// -- core
import winston from "winston";

export const logger = winston.createLogger({
	level: "debug",
	format: winston.format.cli(),
	transports: [new winston.transports.Console({})],
});

type logLevel = "debug" | "info" | "warn" | "error";

export const logObjectData = (data: any, level: logLevel) => {
	for (const key in data) {
		const content = `${key} : ${JSON.stringify(data[key])}`;
		switch (level) {
			case "debug":
				logger.debug(content);
				break;
			case "info":
				logger.info(content);
				break;
			case "warn":
				logger.warn(content);
				break;
			case "error":
				logger.error(content);
				break;
		}
	}
};
