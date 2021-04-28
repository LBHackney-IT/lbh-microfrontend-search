module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!lbh-frontend)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@mtfh/components': '<rootDir>/components',
        '@mtfh/services': '<rootDir>/services',
        '@mtfh/utils': '<rootDir>/utils',
    },
    setupFilesAfterEnv: [
        '../node_modules/@testing-library/jest-dom/dist/index.js',
    ],
};
