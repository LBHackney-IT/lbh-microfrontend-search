module.exports = {
  testURL: "http://localhost",
  rootDir: "src",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!lbh-frontend|@mtfh)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "@hackney/mtfh-test-utils",
    "./test-utils.ts",
  ],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: ["mocks"],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
