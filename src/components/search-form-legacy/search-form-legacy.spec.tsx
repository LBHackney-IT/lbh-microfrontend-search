import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { locale, SearchType } from '@services';
import { SearchFormLegacy } from './search-form-legacy';
import { routeRender } from '../../test-utils';

test('SearchFormLegacy renders correctly', () => {
    routeRender(<SearchFormLegacy />);
    expect(screen.getByRole('search')).toBeInTheDocument();
});

test('SearchFormLegacy displays error on input if under 2 characters', async () => {
    routeRender(<SearchFormLegacy />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'A');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(
            screen.getByText(locale.errors.minSearchTerm)
        ).toBeInTheDocument()
    );
});

test('SearchFormLegacy navigates to search results on success', async () => {
    const [_, history] = routeRender(<SearchFormLegacy />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'Jake');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.location.pathname).toBe('/search'));
    expect(history.location.search).toBe('?s=Jake');
});
