const dotenv = require("dotenv");

dotenv.config({ path: "test.env" });

module.exports = {
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "../",
    testEnvironment: "node",
    testRegex: ".e2e-spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
};
