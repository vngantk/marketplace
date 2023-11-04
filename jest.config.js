/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxConcurrency: 1,
  maxWorkers: 1,
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  coverageDirectory: "backend-dist/coverage",
};
