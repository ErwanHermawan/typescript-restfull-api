module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./src"],
	testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^@application/(.*)$": "<rootDir>/src/application/$1",
		"^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
		"^@errors/(.*)$": "<rootDir>/src/errors/$1",
		"^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
		"^@models/(.*)$": "<rootDir>/src/models/$1",
		"^@routes/(.*)$": "<rootDir>/src/routes/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
		"^@type/(.*)$": "<rootDir>/src/type/$1",
		"^@validations/(.*)$": "<rootDir>/src/validations/$1",

		"^@api/(.*)$": "<rootDir>/src/routes/api/$1",
	},
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
};
