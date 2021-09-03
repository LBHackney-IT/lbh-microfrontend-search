import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { SearchForm } from './search-form';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';

test('SearchForm renders correctly', () => {
    routeRender(<SearchForm onSubmit={jest.fn()} />);
    expect(screen.getByRole('search')).toBeInTheDocument();
});

test('SearchForm displays error on input if under 2 characters', async () => {
    routeRender(<SearchForm onSubmit={jest.fn()} />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'A');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(
            screen.getByText(locale.errors.minSearchTerm)
        ).toBeInTheDocument()
    );
});

test('SearchForm fires onSubmit on success', async () => {
    const onSubmit = jest.fn();
    routeRender(<SearchForm onSubmit={onSubmit} />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'Jake');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
});
