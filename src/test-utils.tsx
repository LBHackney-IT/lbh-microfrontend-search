import { SWRConfig } from 'swr';
import { Route, Router } from 'react-router-dom';
import React from 'react';
import { rest } from 'msw';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MemoryHistory, createMemoryHistory } from 'history';
import { RenderResult, render, cleanup } from '@testing-library/react';
import { queries } from '@mtfh/common';

import { server } from './mocks';

jest.mock('single-spa', () => ({
    navigateToUrl: jest.fn(),
}));

global.fetch = require('node-fetch');

Object.defineProperty(window, 'sessionStorage', {
    value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
    },
});

let matchMedia: MatchMediaMock;

beforeAll(() => {
    matchMedia = new MatchMediaMock();
    server.listen();
});

afterEach(async () => {
    cleanup();
    server.resetHandlers();
    matchMedia.clear();
});

afterAll(() => {
    server.close();
});

interface RouteRenderConfig {
    url: string;
    path: string;
    query: keyof typeof queries;
}

export const routeRender = (
    component: JSX.Element,
    options?: Partial<RouteRenderConfig>
): [RenderResult, MemoryHistory] => {
    const config = {
        url: '/search',
        path: '/search',
        ...options,
    };

    const history = createMemoryHistory();
    history.push(config.url);

    return [
        render(
            <Router history={history}>
                <Route path={config.path}>{component}</Route>
            </Router>
        ),
        history,
    ];
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
