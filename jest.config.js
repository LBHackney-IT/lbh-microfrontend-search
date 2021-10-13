module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!lbh-frontend|@mtfh)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '@hackney/mtfh-test-utils',
        './test-utils.tsx',
    ],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['mocks'],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 98.7,
            functions: 100,
            lines: 100,
        },
    },
};
