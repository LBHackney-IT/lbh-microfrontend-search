import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { SearchResults } from './search-results';
import { SearchResult } from '../search-result';
import { get, routeRender } from '../../test-utils';
import { mockAsset, mockTenures } from '../../mocks';
import { SearchProvider } from '../../context/search-context';

test('SearchResults renders correctly for persons', async () => {
    const {
        result: { container },
    } = routeRender(
        <SearchProvider initial={{ type: 'persons', searchText: 'Hello' }}>
            <SearchResults component={SearchResult} />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(12);
});

test('SearchResults renders correctly for tenures', async () => {
    get('/api/search/:type', {
        results: { tenures: mockTenures.slice(0, 12) },
        total: 12,
    });
    const {
        result: { container },
    } = routeRender(
        <SearchProvider initial={{ type: 'tenures', searchText: 'Hello' }}>
            <SearchResults component={SearchResult} />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(12);
});

test('SearchResults renders correctly for assets', async () => {
    get('/api/search/:type', {
        results: { assets: [mockAsset] },
        total: 1,
    });
    const {
        result: { container },
    } = routeRender(
        <SearchProvider initial={{ type: 'assets', searchText: 'Hello' }}>
            <SearchResults component={SearchResult} />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(1);
});

test('SearchResults wont render if the result cannot be inferred', async () => {
    get('/api/search/:type', {
        results: { assets: [{ id: '12423' }] },
        total: 1,
    });
    const {
        result: { container },
    } = routeRender(
        <SearchProvider initial={{ type: 'assets', searchText: 'Hello' }}>
            <SearchResults component={SearchResult} />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(0);
});
