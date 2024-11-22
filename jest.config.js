/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "lcov", "clover"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx",
    "!**/node_modules/**",
  ],
};
