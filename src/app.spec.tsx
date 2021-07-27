import React from 'react';
import { screen } from '@testing-library/react';

import { routeRender } from './test-utils';
import App from './app';

test('App renders correctly', () => {
    routeRender(<App />, { path: '/', url: '/' });
    expect(screen.getByRole('search')).toBeInTheDocument();
});

test('App redirects to last search', () => {
    sessionStorage.setItem('search:last', '/search/persons?s=Jake');
    const [_, history] = routeRender(<App />, { path: '/', url: '/search' });
    expect(history.location.pathname).toBe('/search/persons');
    expect(history.location.search).toBe('?s=Jake');
});

test('App redirects to homepage if no last search', () => {
    const [_, history] = routeRender(<App />, { path: '/', url: '/search' });
    expect(history.location.pathname).toBe('/');
});
