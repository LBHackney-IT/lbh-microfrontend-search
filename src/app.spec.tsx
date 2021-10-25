import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { routeRender } from './test-utils';
import App from './app';

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
