import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { SearchResultsView } from './search-results-view';
import { routeRender, get } from '../../test-utils';
import { locale } from '../../services';

test('SearchResultsView renders correctly', async () => {
    routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
});

test('SearchResultsView shows error if request fails', async () => {
    get('/api/search/persons', { error: 500 }, 500);
    routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
});

test('SearchResultsView shows the SearchForm', async () => {
    const { history } = routeRender(<SearchResultsView />, {
        path: '/search/:type',
        url: '/search/persons?s=Jake',
    });

    userEvent.click(screen.getByText(locale.results.searchAgain));

    await waitFor(() => screen.getByRole('search'));

    const input = screen.getByLabelText(`${locale.search}*`);
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'Derek');
    userEvent.click(screen.getByRole('button', { name: locale.search }));

    await waitFor(() => expect(history.location.search).toBe('?s=Derek'));
});
