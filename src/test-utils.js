import { server } from './mocks';

global.fetch = require('node-fetch');

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
