import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { $configuration } from '@mtfh/common/lib/configuration';
import { routeRender } from './test-utils';
import App from './app';

describe('SearchView - legacy', () => {
    test('App renders correctly', async () => {
        routeRender(<App />, { path: '/', url: '/' });
        await waitFor(() => {
            expect(screen.getByRole('search')).toBeInTheDocument();
        });
    });

    test('App redirects to last search', async () => {
        sessionStorage.setItem('search:last', 'persons?s=Jake');
        const { history } = routeRender(<App />, { path: '/', url: '/search' });
        await waitFor(() => {
            expect(history.location.pathname).toBe('/search/persons');
            expect(history.location.search).toBe('?s=Jake');
        });
    });

    test('App redirects to homepage if no last search', async () => {
        const { history } = routeRender(<App />, { path: '/', url: '/search' });
        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
    });
});

const features = $configuration.getValue();

describe('SearchView', () => {
    beforeEach(() => {
        $configuration.next({
            ...features,
            MMH: {
                ...features.MMH,
                featureToggles: {
                    WarningComponents: true,
                },
            },
        });
    });
    afterAll(() => {
        $configuration.next(features);
    });
    test('App renders correctly', async () => {
        routeRender(<App />, { path: '/', url: '/' });
        await waitFor(() => {
            expect(screen.getByRole('search')).toBeInTheDocument();
        });
    });
    test('App redirects to last search', async () => {
        sessionStorage.setItem('search:last', 'persons?s=Jake');
        const { history } = routeRender(<App />, { path: '/', url: '/search' });
        await waitFor(() => {
            expect(history.location.pathname).toBe('/search/persons');
            expect(history.location.search).toBe('?s=Jake');
        });
    });

    test('App redirects to homepage if no last search', async () => {
        const { history } = routeRender(<App />, { path: '/', url: '/search' });
        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
    });
});
