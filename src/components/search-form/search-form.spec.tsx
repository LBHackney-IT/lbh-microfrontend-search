import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { SearchForm } from './search-form';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';

test('SearchForm renders correctly', () => {
    routeRender(<SearchForm />);
    expect(screen.getByRole('search')).toBeInTheDocument();
});

test('SearchForm displays error on input if under 2 characters', async () => {
    routeRender(<SearchForm />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'A');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(
            screen.getByText(locale.errors.minSearchTerm)
        ).toBeInTheDocument()
    );
});

test('SearchForm navigates to search results on success', async () => {
    const [_, history] = routeRender(<SearchForm />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'Jake');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.location.pathname).toBe('/search'));
    expect(history.location.search).toBe('?s=Jake');
});
