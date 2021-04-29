module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!lbh-frontend)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@search/components': '<rootDir>/components',
        '@search/services': '<rootDir>/services',
        '@search/utils': '<rootDir>/utils',
    },
    setupFilesAfterEnv: [
        '../node_modules/@testing-library/jest-dom/dist/index.js',
    ],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: [],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
};
