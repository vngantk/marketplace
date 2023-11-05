/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "."
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  maxConcurrency: 1,
  maxWorkers: 1,
  collectCoverage: true,
  coverageReporters: [
    "json",
    "html",
    "text-summary",
    "lcov",
    "clover"
  ],
  coverageDirectory: "tests/coverage",
}
