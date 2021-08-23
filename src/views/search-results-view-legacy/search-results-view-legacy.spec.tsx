import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { locale } from '@services';
import { SearchResultsViewLegacy } from './search-results-view-legacy';
import { routeRender, get } from '../../test-utils';

test('SearchResultsViewLegacy shows error if request fails', async () => {
    get('/api/search/persons', { error: 500 }, 500);
    routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
});

test('SearchResultsViewLegacy redirects to homepage when no search term', async () => {
    const [_, history] = routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons',
    });

    await waitFor(() => expect(history.location.pathname).toBe('/'));
});

test('SearchResultsViewLegacy redirects to first page if out of bounds', async () => {
    const [_, history] = routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake&p=-1',
    });

    await waitFor(() => expect(history.location.search).toBe('?s=Jake'));
});

test('SearchResultsViewLegacy redirects to last page if out of bounds after request', async () => {
    const [_, history] = routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake&p=100&o=desc',
    });

    await waitFor(() =>
        expect(history.location.search).toBe('?s=Jake&p=4&o=desc')
    );
});

test('SearchResultsViewLegacy redirects to first page if out of bounds', async () => {
    routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    userEvent.click(screen.getByText(locale.results.searchAgain));

    await waitFor(() => expect(screen.getByRole('search')).toBeInTheDocument());
});

test('SearchResultsViewLegacy handles query param updates', async () => {
    const [{ container }, history] = routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    await waitFor(() => {
        const results = container.querySelectorAll(
            '.mtfh-search__results > div'
        );
        expect(results).toHaveLength(12);
    });

    history.push('/search/persons?s=Jake&p=4');

    await waitFor(() => {
        const results = container.querySelectorAll(
            '.mtfh-search__results > div'
        );
        expect(results).toHaveLength(4);
    });
});

test('SearchResultsViewLegacy handles requests for tenures', async () => {
    const [{ container }] = routeRender(<SearchResultsViewLegacy />, {
        path: '/search/:type',
        url: '/search/tenures?s=Jake',
    });

    await waitFor(() => {
        const results = container.querySelectorAll(
            '.mtfh-search__results > div'
        );
        expect(results).toHaveLength(12);
    });
});
