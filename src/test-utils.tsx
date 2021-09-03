import { SWRConfig } from 'swr';
import { Route, Router } from 'react-router-dom';
import React from 'react';
import { rest } from 'msw';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MemoryHistory, createMemoryHistory } from 'history';
import { RenderResult, render, cleanup } from '@testing-library/react';
import { queries } from '@mtfh/common';

import { server } from './mocks';

let session: Record<string, string> = {};

Object.defineProperty(window, 'sessionStorage', {
    value: {
        setItem: jest.fn((key, value) => {
            session[key] = value;
        }),
        getItem: jest.fn(key => session[key] || null),
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
    session = {};
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
): { result: RenderResult; history: MemoryHistory } => {
    const config = {
        url: '/search',
        path: '/search',
        ...options,
    };

    const history = createMemoryHistory();
    history.push(config.url);

    const result = render(
        <SWRConfig
            value={{
                provider: () => new Map(),
                dedupingInterval: 0,
                shouldRetryOnError: false,
                errorRetryCount: 0,
            }}
        >
            <Router history={history}>
                <Route path={config.path}>{component}</Route>
            </Router>
        </SWRConfig>
    );

    return {
        result,
        history,
    };
};

export const get = (
    path: string,
    data: Record<string, any>,
    code = 200
): void => {
    server.use(
        rest.get(path, (req, res, ctx) => {
            return res(ctx.status(code), ctx.json(data));
        })
    );
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
