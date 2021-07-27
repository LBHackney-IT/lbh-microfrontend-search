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
            statements: 99.3,
            branches: 97.53,
            functions: 97.5,
            lines: 99.29,
        },
    },
};
