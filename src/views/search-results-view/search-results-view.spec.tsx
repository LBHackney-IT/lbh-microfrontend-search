import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { locale } from '@services';
import { SearchResultsView } from './search-results-view';
import { routeRender, get } from '../../test-utils';

test('SearchResultsView shows error if request fails', async () => {
    get('/api/search/persons', { error: 500 }, 500);
    routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
});

test('SearchResultsView redirects to homepage when no search term', async () => {
    const [_, history] = routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons',
    });

    await waitFor(() => expect(history.location.pathname).toBe('/'));
});

test('SearchResultsView redirects to first page if out of bounds', async () => {
    const [_, history] = routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake&p=-1',
    });

    await waitFor(() => expect(history.location.search).toBe('?s=Jake'));
});

test('SearchResultsView redirects to last page if out of bounds after request', async () => {
    const [_, history] = routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake&p=100&o=desc',
    });

    await waitFor(() =>
        expect(history.location.search).toBe('?s=Jake&p=4&o=desc')
    );
});

test('SearchResultsView redirects to first page if out of bounds', async () => {
    routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    userEvent.click(screen.getByText(locale.results.searchAgain));

    await waitFor(() => expect(screen.getByRole('search')).toBeInTheDocument());
});

test('SearchResultsView handles query param updates', async () => {
    const [{ container }, history] = routeRender(<SearchResultsView />, {
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
