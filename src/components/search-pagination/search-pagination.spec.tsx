import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { SearchPagination } from './search-pagination';
import { get, routeRender } from '../../test-utils';
import { locale } from '../../services';
import { mockPersons } from '../../mocks';
import { SearchProvider } from '../../context/search-context';

test('Pagination displays range from start if range exceeds start', async () => {
    routeRender(
        <SearchProvider initial={{ type: 'persons', searchText: 'Hello' }}>
            <SearchPagination />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.getByText(locale.pagination.next)).toBeInTheDocument()
    );

    expect(
        screen.queryByText(locale.pagination.previous)
    ).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
});

test('Pagination displays range', async () => {
    get('/api/search/:type', {
        results: mockPersons.slice(0, 12),
        total: 1000,
    });
    routeRender(
        <SearchProvider
            initial={{ type: 'persons', searchText: 'Hello', page: 5 }}
        >
            <SearchPagination />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.getByText(locale.pagination.next)).toBeInTheDocument()
    );
    expect(screen.getByText(locale.pagination.previous)).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('8')).not.toBeInTheDocument();
});

test('Pagination displays range from end if range exceeds end', async () => {
    get('/api/search/:type', {
        results: mockPersons.slice(0, 12),
        total: 240,
    });
    routeRender(
        <SearchProvider
            initial={{ type: 'persons', searchText: 'Hello', page: 20 }}
        >
            <SearchPagination />
        </SearchProvider>
    );
    await waitFor(() =>
        expect(screen.getByText(locale.pagination.previous)).toBeInTheDocument()
    );
    expect(screen.queryByText(locale.pagination.next)).not.toBeInTheDocument();
    expect(screen.queryByText('15')).not.toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('21')).not.toBeInTheDocument();
});

test('Pagination wont display if the range is empty', async () => {
    get('/api/search/:type', {
        results: mockPersons.slice(0, 12),
        total: 12,
    });
    const {
        result: { container },
    } = routeRender(
        <SearchProvider
            initial={{ type: 'persons', searchText: 'Hello', page: 1 }}
        >
            <SearchPagination />
        </SearchProvider>
    );

    await waitFor(() => expect(container).toBeEmptyDOMElement());
});

test('Pagination navigation triggers state changes', async () => {
    routeRender(
        <SearchProvider
            initial={{ type: 'persons', searchText: 'Hello', page: 1 }}
        >
            <SearchPagination />
        </SearchProvider>
    );

    await waitFor(() =>
        expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page')
    );

    userEvent.click(screen.getByText(locale.pagination.next));
    await waitFor(() =>
        expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page')
    );

    userEvent.click(screen.getByText(locale.pagination.previous));
    await waitFor(() =>
        expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page')
    );

    userEvent.click(screen.getByText('3'));
    await waitFor(() =>
        expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page')
    );
});
