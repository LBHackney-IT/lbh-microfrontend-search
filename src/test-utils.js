import { server } from './mocks';

global.fetch = require('node-fetch');

Object.defineProperty(window, 'sessionStorage', {
    value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
    },
});

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
