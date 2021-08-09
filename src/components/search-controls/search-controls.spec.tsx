import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { locale, SearchSortOptions, SearchLimitOptions } from '@services';
import { SearchControls } from './search-controls';
import { routeRender } from '../../test-utils';

test('SearchControls renders correctly', () => {
    routeRender(<SearchControls page={1} pageSize={5} total={500} />);
    expect(screen.getByText(/1—5/)).toBeInTheDocument();
});

test('SearchControls changes sort query param', () => {
    const [_, history] = routeRender(
        <SearchControls page={1} pageSize={5} total={500} />,
        {
            url: '/search/persons',
            path: '/search/:type',
        }
    );
    const sort = screen.getByLabelText(`${locale.controls.sortLabel}:`);
    userEvent.selectOptions(sort, SearchSortOptions.SURNAME_ASC);

    let params = new URLSearchParams(history.location.search);
    expect(params.get('sort')).toBe('surname');
    expect(params.get('o')).toBe('asc');

    userEvent.selectOptions(sort, SearchSortOptions.BEST);

    params = new URLSearchParams(history.location.search);
    expect(params.get('sort')).toBe(null);
    expect(params.get('o')).toBe(null);

    userEvent.selectOptions(sort, SearchSortOptions.SURNAME_DESC);

    params = new URLSearchParams(history.location.search);
    expect(params.get('sort')).toBe('surname');
    expect(params.get('o')).toBe('desc');
});

test('SearchControls changes limit query param', () => {
    const [_, history] = routeRender(
        <SearchControls page={1} pageSize={5} total={500} />,
        {
            url: '/search/persons',
            path: '/search/:type',
        }
    );
    const limit = screen.getByLabelText(`${locale.controls.limitLabel}:`);
    userEvent.selectOptions(limit, String(SearchLimitOptions.MEDIUM));

    let params = new URLSearchParams(history.location.search);
    expect(params.get('l')).toBe(String(SearchLimitOptions.MEDIUM));

    userEvent.selectOptions(limit, String(SearchLimitOptions.SMALL));

    params = new URLSearchParams(history.location.search);
    expect(params.get('l')).toBe(null);
});

test('SearchControls shows loading state if total is udnefined', () => {
    routeRender(<SearchControls page={1} pageSize={5} total={undefined} />);
    expect(
        screen.getByText(locale.controls.loadingResults)
    ).toBeInTheDocument();
});

test('SearchControls shows no results if total is 0', () => {
    routeRender(<SearchControls page={1} pageSize={5} total={0} />);
    expect(
        screen.getByText(locale.controls.noMatchingResults)
    ).toBeInTheDocument();
});
