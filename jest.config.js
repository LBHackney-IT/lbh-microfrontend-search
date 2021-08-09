module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!lbh-frontend|@mtfh)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@components': '<rootDir>/components',
        '@services': '<rootDir>/services',
        '@types': '<rootDir>/types',
        '@utilities': '<rootDir>/utils',
    },
    setupFilesAfterEnv: [
        '../node_modules/@testing-library/jest-dom/dist/index.js',
        './test-utils.tsx',
    ],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['mocks'],
    coverageThreshold: {
        global: {
            statements: 99.39,
            branches: 98.02,
            functions: 100,
            lines: 99.39,
        },
    },
};
