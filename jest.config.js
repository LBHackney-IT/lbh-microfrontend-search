module.exports = {
    rootDir: "src",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!lbh-frontend)"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: [
        "../node_modules/@testing-library/jest-dom/dist/index.js",
    ],
};
